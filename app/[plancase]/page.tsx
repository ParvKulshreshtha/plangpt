"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { planData, PlanInfo } from "../data/planData";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoChevronBackSharp } from "react-icons/io5";

// API key and model initialization
const geminiApi = process.env.NEXT_PUBLIC_GEMINI_APIKEY || "";
const genAI = new GoogleGenerativeAI(geminiApi);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface InputField {
  field: string;
  type: string;
  label: string;
  required: boolean;
}

interface OutputField {
  field: string;
  label: string;
  type: string;
}

const Index = () => {
  const [planObject, setPlanObject] = useState<PlanInfo | undefined>();
  const [inputs, setInputs] = useState<any>({});
  const [outputs, setOutputs] = useState<string[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params?.plancase) {
      const plan = planData.find((item) => item.uri === params.plancase);
      setPlanObject(plan);
    }
  }, [params]);

  const formatMessageContent = (content: string) => {
    content = content.replace(/^##\s(.*)$/gm, '<h2 class="font-bold text-xl">$1</h2>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    content = content.replace(/```(.*?)```/g, '<pre class="bg-darkAccent text-white p-2 rounded">$1</pre>');
    content = content.replace(/\n/g, '<br/>');
    return content;
  };

  const generatePlan = async () => {
    if (!prompt.trim()) return;

    try {
      const result = await model.generateContent(prompt);
      setGeneratedPlan(formatMessageContent(result.response.text()));
    } catch (error) {
      console.error("Error generating plan:", error);
    }
  };

  const prompt: string = `${planObject?.initialPrompt} with inputs as ${JSON.stringify(inputs)}. we need detailed info about: ${JSON.stringify(outputs)}`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
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
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={planObject.image}
            alt={planObject.useCase}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{planObject.useCase}</h2>
            <p className="text-lg text-gray-600 mb-4">{planObject.description}</p>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Tell us about your plan:</h3>
            <div className="pl-5 text-gray-600">
              {planObject.inputs.map((input, index) => (
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
                      setInputs((prev: any) => ({ ...prev, [input.field]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">Select What you want to know:</h3>
            <div className="pl-5 text-gray-600">
              {planObject.outputs.map((output, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id={output.field}
                    className="w-5 h-5 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setOutputs((prev) => [...prev, output.field])}
                  />
                  <label htmlFor={output.field} className="ml-3 text-md text-gray-700">
                    {output.label}
                  </label>
                </div>
              ))}
            </div>

            <p>{prompt}</p>

            <button
              onClick={() => generatePlan()}
              className="mt-6 w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              AI Generate
            </button>

            <div dangerouslySetInnerHTML={{ __html: generatedPlan }} />
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Plan not found.</p>
      )}
    </div>
  );
};

export default Index;
