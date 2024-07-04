// app/api/gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Gemini API key not configured." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Or "gemini-pro" if you prefer

    // Refined prompt to instruct the model to provide specific output
    const fullPrompt = `Break down the following task into 3 to 5 smaller, actionable subtasks. Each subtask should be concise. Provide ONLY the comma-separated subtasks, with no additional text, numbering, or explanations.
    For example:
    Task: "Plan birthday party"
    Output: Book venue, Send invitations, Order cake, Plan decorations, Prepare playlist

    Task: "${prompt}"
    Output:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Process the text to get an array of subtasks
    const subtasks = text
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0); // Remove any empty strings

    return NextResponse.json({ subtasks });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: "Failed to generate subtasks from AI." },
      { status: 500 }
    );
  }
}
