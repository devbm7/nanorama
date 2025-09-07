"use client";
import { useState } from "react";
import { usePosterState } from "@/hooks/usePosterState";

export function GenerateButton() {
  const { components, updateComponent } = usePosterState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState(false);
  const ALLOW_DEBUG = process.env.NODE_ENV !== "production";
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  interface DebugPart {
    text?: string;
    inlineData?: {
      mimeType: string;
      data: string;
    };
  }

  function buildPrompt(): string {
    const sections: string[] = [];
    sections.push("Generate a marketing poster for the given content.");
    sections.push("Use the selected layout and place the content accordingly.");
    // Optionally include layout id
    sections.push(`Layout: ${usePosterState.getState().layout}`);
    // InfoCards by slot
    const infoCards = components.filter((c) => c.type === "infoCard");
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
    
    return sections.join("\n");
  }

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);
    try {
      const imageComponents = components.filter((c) => c.type === "image");
      if (imageComponents.length === 0) {
        setError("Add an Image component and upload an image.");
        return;
      }
      const target = imageComponents.find((c) => c.assetUrl) || imageComponents[0];
      if (!target.assetUrl) {
        setError("Please upload an image asset in the Image component.");
        return;
      }
      
      const promptText = buildPrompt();
      // capture blueprint
      const blueprintEl = document.getElementById("layout-blueprint") as HTMLElement | null;
      let layoutImage: string | undefined;
      if (blueprintEl) {
        const { default: html2canvas } = await import("html2canvas");
        const canvas = await html2canvas(blueprintEl, { backgroundColor: "#ffffff", scale: 2, useCORS: true });
        layoutImage = canvas.toDataURL("image/png");
      }

      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptText, assetImage: target.assetUrl, layoutImage, debug: ALLOW_DEBUG && debug }),
      });
      const data = await res.json();
      if (data.debug) {
        setDebugInfo(JSON.stringify(data.debug, null, 2));
        return;
      }
      if (data.base64) {
        const url = `data:${data.mimeType || "image/png"};base64,${data.base64}`;
        updateComponent(target.id, { generatedUrl: url });
      } else if (data.url) {
        updateComponent(target.id, { generatedUrl: data.url });
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to generate images");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button className="border px-4 py-2 rounded" onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Images"}
      </button>
      {ALLOW_DEBUG && (
        <div className="flex items-center gap-2">
          <input type="checkbox" id="debug-mode" checked={debug} onChange={(e) => setDebug(e.target.checked)} />
          <label htmlFor="debug-mode" className="text-sm">Debug mode</label>
        </div>
      )}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {debugInfo && (
        <div className="mt-4 p-4 border rounded bg-gray-100 text-gray-800 text-sm overflow-auto max-h-60">
          <h3 className="font-semibold mb-2">Debug Information (Prompt Parts):</h3>
          <pre className="whitespace-pre-wrap break-words">
            {(() => {
              try {
                const parsedDebugInfo = JSON.parse(debugInfo);
                return parsedDebugInfo.parts.map((part: DebugPart, index: number) => (
                  <div key={index} className="mb-2">
                    {part.text && <p><strong>Text:</strong> {part.text}</p>}
                    {part.inlineData && (
                      <div>
                        <strong>Image ({part.inlineData.mimeType}):</strong>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`} alt="Debug Image" className="max-w-full h-auto border" />
                      </div>
                    )}
                  </div>
                ));
              } catch (_e) {
                return debugInfo; // Fallback to raw string if parsing fails
              }
            })()}
          </pre>
        </div>
      )}
    </div>
  );
}


