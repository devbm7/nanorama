import { NextRequest, NextResponse } from "next/server";
import { getGenAIClient } from "@/lib/genai/client";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const model = process.env.GENAI_IMAGE_MODEL || "gemini-2.5-flash-image-preview";
    const ai = getGenAIClient();

    // If no API key, return placeholder to keep UI functional in dev
    if (!process.env.GOOGLE_API_KEY && !process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        url: `/next.svg`,
        placeholder: true,
      });
    }

    const response = await ai.models.generateContent({
      model,
      contents: [prompt],
    });

    const part = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
    if (!part?.inlineData?.data) {
      return NextResponse.json({ error: "No image returned" }, { status: 500 });
    }
    const imageBase64 = part.inlineData.data as string;
    return NextResponse.json({ base64: imageBase64, mimeType: part.inlineData.mimeType || "image/png" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Generation failed" }, { status: 500 });
  }
}


