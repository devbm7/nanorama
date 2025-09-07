"use client";
import { useState } from "react";
import { usePosterState } from "@/hooks/usePosterState";

export function GenerateButton() {
  const { components, updateComponent } = usePosterState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function buildPrompt(): string {
    const sections: string[] = [];
    sections.push("Generate a marketing poster for the given content.");
    sections.push("Use the selected layout and place the content accordingly.");
    // Optionally include layout id
    sections.push(`Layout: ${usePosterState.getState().layout}`);
    // InfoCards by slot
    const infoCards = components.filter((c: any) => c.type === "infoCard") as any[];
    infoCards.sort((a, b) => (a.slotIndex ?? 0) - (b.slotIndex ?? 0));
    infoCards.forEach((card, idx) => {
      const slotLabel = `Section ${card.slotIndex ?? idx}`;
      if (card.title) sections.push(`${slotLabel} Title: ${card.title}`);
      if (card.bullets && card.bullets.length) {
        sections.push(`${slotLabel} Bullets:`);
        card.bullets.filter(Boolean).forEach((b: string) => sections.push(`- ${b}`));
      }
    });
    // Include plain text components
    const textBlocks = components.filter((c: any) => c.type === "text") as any[];
    textBlocks.forEach((t, i) => {
      if (t.content) sections.push(`Additional Text ${i + 1}: ${t.content}`);
    });
    return sections.join("\n");
  }

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);
    try {
      const imageComponents = components.filter((c) => c.type === "image") as any[];
      if (imageComponents.length === 0) {
        setError("Add an Image component and upload an image.");
        return;
      }
      const target = imageComponents.find((c) => c.assetUrl) || imageComponents[0];
      if (!target.assetUrl) {
        setError("Please upload an image asset in the Image component.");
        return;
      }
      const [, assetBase64] = (target.assetUrl as string).split(",");
      const promptText = buildPrompt();

      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptText, assetImage: target.assetUrl }),
      });
      const data = await res.json();
      if (data.base64) {
        const url = `data:${data.mimeType || "image/png"};base64,${data.base64}`;
        updateComponent(target.id, { generatedUrl: url });
      } else if (data.url) {
        updateComponent(target.id, { generatedUrl: data.url });
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to generate images");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button className="border px-4 py-2 rounded" onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Images"}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}


