"use client";
import { usePosterState } from "@/hooks/usePosterState";
import type { LayoutTemplateId } from "@/types/poster";
import { getLayoutSlots } from "@/lib/poster/slots";

const layouts: { id: LayoutTemplateId; label: string }[] = [
  { id: "single", label: "Single" },
  { id: "split-vertical", label: "Split Vertical" },
  { id: "split-horizontal", label: "Split Horizontal" },
  { id: "triple-column", label: "Triple Column" },
  { id: "header-dual", label: "Header + Dual" },
  { id: "grid-2x2", label: "Grid 2x2" },
  { id: "hero-sidebar", label: "Hero + Sidebar" },
];

export function LayoutSelector() {
  const { layout, setLayout, components, updateComponent } = usePosterState();
  return (
    <div className="flex gap-2 flex-wrap">
      {layouts.map((l) => (
        <button
          key={l.id}
          className={`border px-3 py-2 rounded ${layout === l.id ? "bg-foreground text-background" : ""}`}
          onClick={() => setLayout(l.id)}
        >
          {l.label}
        </button>
      ))}
      <div className="w-full pt-2 text-sm opacity-70">
        Slots: {getLayoutSlots(layout).labels.join(", ")}
      </div>
    </div>
  );
}


