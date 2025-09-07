import { NextRequest, NextResponse } from "next/server";
import { getGenAIClient } from "@/lib/genai/client";
import { Part } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, promptText, layoutImage, assetImage, debug } = await req.json();
    let systemPrompt = "You are an expert infographic poster designer. You are given a layout image, an asset image and content information. Generate a poster based on the given layout and asset. Do not add any more information that is not given in the layout or asset. There is a layout blueprint image attached as well. Use that to guide the design. You do not have to follow the color choices of the layout, they are just there to distinguish the sections. There would also not be any space between the sections as depicted in the layout, it would be continuos. Ensure that the design is visually appealing and the colors are consistent. Ensure that the transitions between the sections are smooth and the design is cohesive. Do not mention metadata such as section number, slot number, etc. in the design. If no information about the background is given, ensure that the background is a solid color. If there is atleast one image, you can try to use it as the background.";
    const effectivePrompt = promptText || prompt;
    if (!effectivePrompt && !assetImage) {
      return NextResponse.json({ error: "Provide a prompt or an asset image" }, { status: 400 });
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

    const parts: ({ text: string } | { inlineData: { mimeType: string; data: string } })[] = [];
    // parts.push({ text: systemPrompt });
    if (effectivePrompt) systemPrompt += "\n\n" + effectivePrompt;
    parts.push({ text: systemPrompt });
    if (layoutImage && typeof layoutImage === "string") {
      const [, data] = layoutImage.split(",");
      parts.push({ inlineData: { mimeType: "image/png", data: data || layoutImage } });
    }
    if (assetImage && typeof assetImage === "string") {
      const [, data] = assetImage.split(",");
      parts.push({ inlineData: { mimeType: "image/png", data: data || assetImage } });
    }

    const allowDebug = process.env.NODE_ENV !== "production";
    if (debug && allowDebug) {
      return NextResponse.json({ debug: { parts } });
    }
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts,
        },
      ],
      // config: {
      //   temperature: 0.5,
      // },
    });

    const part = response.candidates?.[0]?.content?.parts?.find((p: Part) => p.inlineData);
    if (!part?.inlineData?.data) {
      // Graceful fallback: if user provided an asset image, return it so UI shows something
      if (assetImage && typeof assetImage === "string") {
        const [, data] = assetImage.split(",");
        return NextResponse.json({ base64: data || assetImage, mimeType: "image/png", fallback: true });
      }
      return NextResponse.json({ error: "No image returned" }, { status: 500 });
    }
    const imageBase64 = part.inlineData.data as string;
    return NextResponse.json({ base64: imageBase64, mimeType: part.inlineData.mimeType || "image/png" });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Generation failed" }, { status: 500 });
  }
}


