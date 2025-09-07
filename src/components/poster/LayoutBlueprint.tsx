"use client";
import React from "react";
import { usePosterState } from "@/hooks/usePosterState";

export function LayoutBlueprint() {
  const { layout } = usePosterState();

  const common = "rounded border-2 flex items-center justify-center text-xs font-semibold";
  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  function SlotBox({ index }: { index: number }) {
    const color = colors[index % colors.length];
    return (
      <div className={common} style={{ borderColor: color, backgroundColor: "transparent" }}>
        <span className="opacity-80" style={{ color: "var(--foreground)" }}>Slot {index}</span>
      </div>
    );
  }

  switch (layout) {
    case "split-vertical":
      return (
        <div id="layout-blueprint" className="aspect-[3/4] grid grid-cols-2 gap-2 p-2 bg-muted">
          <SlotBox index={0} />
          <SlotBox index={1} />
        </div>
      );
    case "split-horizontal":
      return (
        <div id="layout-blueprint" className="aspect-[3/4] grid grid-rows-2 gap-2 p-2 bg-muted">
          <SlotBox index={0} />
          <SlotBox index={1} />
        </div>
      );
    case "triple-column":
      return (
        <div id="layout-blueprint" className="aspect-[3/4] grid grid-cols-3 gap-2 p-2 bg-muted">
          <SlotBox index={0} />
          <SlotBox index={1} />
          <SlotBox index={2} />
        </div>
      );
    case "header-dual":
      return (
        <div id="layout-blueprint" className="aspect-[3/4] grid grid-rows-[2fr_3fr] gap-2 p-2 bg-muted">
          <SlotBox index={0} />
          <div className="grid grid-cols-2 gap-2">
            <SlotBox index={1} />
            <SlotBox index={2} />
          </div>
        </div>
      );
    case "grid-2x2":
      return (
        <div id="layout-blueprint" className="aspect-[3/4] grid grid-cols-2 grid-rows-2 gap-2 p-2 bg-muted">
          <SlotBox index={0} />
          <SlotBox index={1} />
          <SlotBox index={2} />
          <SlotBox index={3} />
        </div>
      );
    case "hero-sidebar":
      return (
        <div id="layout-blueprint" className="aspect-[3/4] grid grid-cols-[2fr_1fr] gap-2 p-2 bg-muted">
          <SlotBox index={0} />
          <SlotBox index={1} />
        </div>
      );
    case "single":
    default:
      return (
        <div id="layout-blueprint" className="aspect-[3/4] p-2 bg-muted">
          <div className="h-full">
            <SlotBox index={0} />
          </div>
        </div>
      );
  }
}


