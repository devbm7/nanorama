"use client";
import { usePosterState } from "@/hooks/usePosterState";
import { LayoutTemplates } from "./LayoutTemplates";

export function PosterCanvas() {
  const { layout, components, title } = usePosterState();
  return (
    <div className="w-full border rounded-lg overflow-hidden bg-background">
      <div className="px-4 py-3 border-b text-lg font-semibold">{title}</div>
      <div id="layout-blueprint" className="aspect-[3/4] bg-[rgba(0,0,0,0.02)]">
        <LayoutTemplates id={layout} components={components} />
      </div>
    </div>
  );
}


