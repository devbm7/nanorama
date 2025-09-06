"use client";
import { useState } from "react";
import { usePosterState } from "@/hooks/usePosterState";

export function GenerateButton() {
  const { components, updateComponent } = usePosterState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);
    try {
      for (const c of components) {
        if (c.type === "image" && c.prompt && !c.url) {
          const res = await fetch("/api/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: c.prompt }),
          });
          const data = await res.json();
          if (data.base64) {
            const url = `data:${data.mimeType || "image/png"};base64,${data.base64}`;
            updateComponent(c.id, { url });
          } else if (data.url) {
            updateComponent(c.id, { url: data.url });
          } else if (data.error) {
            throw new Error(data.error);
          }
        }
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


