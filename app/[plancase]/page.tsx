"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { planData, PlanInfo } from "../data/planData";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoChevronBackSharp } from "react-icons/io5";
import { GiCrossMark } from "react-icons/gi";

// API key and model initialization
const geminiApi = process.env.NEXT_PUBLIC_GEMINI_APIKEY || "";
const genAI = new GoogleGenerativeAI(geminiApi);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const PlanCase = () => {
  const [planObject, setPlanObject] = useState<PlanInfo | undefined>();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [outputs, setOutputs] = useState<string[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false); 
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.plancase) {
      const plan = planData.find((item) => item.uri === params.plancase);
      setPlanObject(plan);
    }
  }, [params]);

  // Scroll to the top when generating plan
  useEffect(() => {
    if (isGenerating) {
      window.scrollTo(0, 0); // Scrolls the window to the top
    }
  }, [isGenerating]);

  const formatMessageContent = (content: string) => {
    content = content.replace(/^##\s(.*)$/gm, '<h2 class="font-bold text-xl">$1</h2>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    content = content.replace(/```(.*?)```/g, '<pre class="bg-darkAccent text-white p-2 rounded">$1</pre>');
    content = content.replace(/\n/g, '<br/>');
    return content;
  };

  const generatePlan = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const result = await model.generateContent(prompt);
      setGeneratedPlan(formatMessageContent(result.response.text()));
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const prompt: string = `${planObject?.initialPrompt} with inputs as ${JSON.stringify(inputs)}. we need detailed info about: ${JSON.stringify(outputs)}`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Loading Progress Bar */}
      {isGenerating && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>
      )}

      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:underline"
        >
          <IoChevronBackSharp className="h-6 w-6 mr-2" />
          Back
        </button>
      </div>

      {params?.plancase ? (
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{planObject?.useCase}</h1>
      ) : (
        <p className="text-xl text-red-500">No plan case provided</p>
      )}

      {planObject ? (
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <img
            src={planObject.image}
            alt={planObject.useCase}
            className="w-full h-60 object-cover mb-4"
          />
          {!generatedPlan ? (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{planObject.useCase}</h2>
              <p className="text-lg text-gray-600 mb-4">{planObject.description}</p>
              
              {/* Input Fields */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Tell us about your plan:</h3>
                {planObject.inputs.map((input) => (
                  <div key={input.field} className="mb-4">
                    <label
                      htmlFor={input.field}
                      className="block text-md text-gray-700 font-semibold mb-1"
                    >
                      {input.label} {input.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      id={input.field}
                      name={input.field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Select What you want to know:</h3>
                {planObject.outputs.map((output) => (
                  <div key={output.field} className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id={output.field}
                      className="w-5 h-5 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      onChange={() =>
                        setOutputs((prev) =>
                          prev.includes(output.field)
                            ? prev.filter((item) => item !== output.field)
                            : [...prev, output.field]
                        )
                      }
                    />
                    <label htmlFor={output.field} className="ml-3 text-md text-gray-700">
                      {output.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Prompt Preview */}
              <div className="text-gray-600 text-sm italic mb-4">{prompt}</div>

              {/* Generate Button */}
              <button
                onClick={() => generatePlan()}
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                AI Generate
              </button>
            </div>
          ) : (
            <div className="p-6 cursor-pointer">
              <div  onClick={() => {
              setGeneratedPlan("")
              setInputs({})
              setOutputs([])
            }}  className="text-red-500 flex gap-4">
                <GiCrossMark
                  className="text-2xl text-red-500 mb-4"
                />
                Back
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: generatedPlan }}
                className="text-gray-800"
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-lg text-gray-600">Plan not found.</p>
      )}
    </div>
  );
};

export default PlanCase;
