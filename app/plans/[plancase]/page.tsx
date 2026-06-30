"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { planData, PlanInfo } from "../../data/planData";
import { GiCrossMark } from "react-icons/gi";

const PlanCase = () => {
  const [planObject, setPlanObject] = useState<PlanInfo | undefined>();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isPlanSearching, setIsPlanSearching] = useState<boolean>(true);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    if (params?.plancase) {
      const plan = planData.find((item) => item.uri === params.plancase);
      setPlanObject(plan);
    }
    setIsPlanSearching(false);
  }, [params]);

  // Scroll to the top when generating plan
  useEffect(() => {
    if (isGenerating) {
      window.scrollTo(0, 0); // Scrolls the window to the top
    }
  }, [isGenerating]);

  const formatMessageContent = (content: string) => {
    content = content.replace(/^##\s(.*)$/gm, '<h2 class="font-bold text-xl text-teal-600">$1</h2>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600">$1</strong>');
    content = content.replace(/```(.*?)```/g, '<pre class="bg-gray-800 text-white p-2 rounded">$1</pre>');
    content = content.replace(/\n/g, '<br/>');
    return content
  } 

  const generatePlan = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationError("");
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGenerationError(data.error || "Failed to generate plan. Please try again in a moment.");
        return;
      }

      setGeneratedPlan(formatMessageContent(data.text));
    } catch (error) {
      console.error("Error generating plan:", error);
      setGenerationError("Failed to generate plan. Please try again in a moment.");
    } finally {
      setIsGenerating(false);
    }
  };

  const prompt: string = `${planObject?.initialPrompt} with inputs as ${JSON.stringify(inputs)}. we need detailed info about: ${JSON.stringify(outputs)}`;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
      {isGenerating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-neon-blue animate-pulse z-50" />
      )}

      {!params?.plancase && 
        <p className="text-xl text-red-500">No plan case provided</p>
      }

      {/* Plan Image */}
      {planObject?.image && (
        <img
          src={planObject.image !== "" ? planObject.image : "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg"}
          alt={planObject.useCase}
          className="w-full h-[350px] object-cover rounded-xl mb-6 ring-2 ring-neon-pink/10 shadow-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://media.wired.com/photos/5a0a38c1d07f6824ff44221b/master/w_2560%2Cc_limit/twitterlists-TA.jpg";
          }}
        />
      )}

      {/* Plan Description */}
      {planObject && !generatedPlan && !isGenerating ? (
        <div className="space-y-6 md:space-y-8">
          <p className="text-base md:text-lg text-gray-800 mb-4">{planObject.description}</p>

          {/* Input Fields */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-neon-blue mb-4">Tell us about your plan:</h3>
            {planObject.inputs.map((input) => (
              <div key={input.field} className="mb-6">
                <label
                  htmlFor={input.field}
                  className="block text-sm md:text-md text-gray-700 font-semibold mb-2"
                >
                  {input.label} {input.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  id={input.field}
                  name={input.field}
                  className="w-full px-6 py-3 border border-gray-200 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-neon-blue/30 focus:border-neon-blue/40"
                  required={input.required}
                  placeholder={`Enter ${input.label}`}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [input.field]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>

          {/* Outputs Selection */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-neon-pink mb-4">Select What you want to know:</h3>
            {planObject.outputs.map((output) => (
              <div key={output.field} className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id={output.field}
                  className="w-5 h-5 border-gray-300 rounded-md text-neon-pink focus:ring-neon-pink/30"
                  onChange={() =>
                    setOutputs((prev) =>
                      prev.includes(output.field)
                        ? prev.filter((item) => item !== output.field)
                        : [...prev, output.field]
                    )
                  }
                />
                <label htmlFor={output.field} className="ml-4 text-sm md:text-lg text-gray-700">
                  {output.label}
                </label>
              </div>
            ))}
          </div>

          {/* Prompt Preview */}
          <div className="text-gray-600 text-sm italic mb-6">{prompt}</div>

          {/* Generate Button */}
          <button
            onClick={() => generatePlan()}
            className="w-full py-3 bg-gradient-to-r from-neon-green to-neon-blue text-white font-semibold rounded-xl hover:from-neon-pink hover:to-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-pink/30 transition"
          >
            AI Generate
          </button>
        </div>
      ) : (
        isPlanSearching && <p>Your Plan Is Being Searched...</p> 
        
      )}
      {!planObject && !isPlanSearching && <p className="text-lg text-gray-600">Plan not found.</p>}

      {/* Generated Plan Output */}
      {generationError && !isGenerating && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {generationError}
        </div>
      )}
      {generatedPlan && !isGenerating && (
        <div className="mt-12 text-gray-800">
          <div onClick={() => { setGeneratedPlan(""); setInputs({}); setOutputs([]); }} className="text-red-500 flex gap-4 cursor-pointer mb-6">
            <GiCrossMark className="text-2xl text-red-500" />
            Back
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: generatedPlan }}
            className="text-sm md:text-lg leading-relaxed"
          />
        </div>
      )}
    </div>
  );
};

export default PlanCase;
