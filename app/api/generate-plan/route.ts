import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Gemini API key is not configured. Add GEMINI_API_KEY to your .env file and restart the dev server.",
      },
      { status: 500 }
    );
  }

  let body: { prompt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { prompt } = body;

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json({ error: "A valid prompt is required." }, { status: 400 });
  }

  if (prompt.length > 8000) {
    return NextResponse.json({ error: "Prompt is too long." }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error while generating plan.";

    if (errorMessage.includes("[429 ]") || errorMessage.toLowerCase().includes("quota exceeded")) {
      return NextResponse.json(
        {
          error:
            "Quota exceeded for this Gemini API key/project. Check billing and quota in Google AI Studio.",
        },
        { status: 429 }
      );
    }

    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate plan. Please try again in a moment." },
      { status: 500 }
    );
  }
}
