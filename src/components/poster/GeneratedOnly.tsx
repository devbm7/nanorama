"use client";
import { usePosterState } from "@/hooks/usePosterState";

export function GeneratedOnly() {
  const { components } = usePosterState();
  const imageComponents = components.filter((c: any) => c.type === "image") as any[];
  const target = imageComponents.find((c) => c.generatedUrl);

  if (!target) {
    return (
      <div className="border rounded p-8 text-sm opacity-70">
        No generated image yet. Click "Generate Images" after uploading an image.
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={target.generatedUrl} alt="Generated" className="max-w-full max-h-[70vh] object-contain" />
    </div>
  );
}


