"use client";
import React, { useState, useRef } from "react";
import { usePosterState } from "@/hooks/usePosterState";
import type { ManualSlotRect } from "@/types/poster";
import { nanoid } from "nanoid";

export function LayoutBlueprint() {
  const { layout, manualSlots, addManualSlot } = usePosterState() as unknown as {
    layout: string;
    manualSlots: ManualSlotRect[];
    addManualSlot: (slot: ManualSlotRect) => void;
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [curr, setCurr] = useState<{ x: number; y: number } | null>(null);

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
      if (layout === "manual") {
        const handleDown = (e: React.MouseEvent<HTMLDivElement>) => {
          const el = containerRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setStart({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
          setCurr({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
          setIsDrawing(true);
        };
        const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
          if (!isDrawing || !start) return;
          const el = containerRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setCurr({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
        };
        const handleUp = () => {
          if (!isDrawing || !start || !curr) {
            setIsDrawing(false);
            return;
          }
          const x = Math.min(start.x, curr.x);
          const y = Math.min(start.y, curr.y);
          const width = Math.abs(curr.x - start.x);
          const height = Math.abs(curr.y - start.y);
          setIsDrawing(false);
          setStart(null);
          setCurr(null);
          if (width < 1 || height < 1) return; // ignore tiny drags
          const nextIndex = (manualSlots || []).reduce((m, s) => Math.max(m, s.index), -1) + 1;
          addManualSlot({ id: nanoid(), index: nextIndex, x, y, width, height });
        };
        const preview = (() => {
          if (!isDrawing || !start || !curr) return null;
          const left = Math.min(start.x, curr.x);
          const top = Math.min(start.y, curr.y);
          const w = Math.abs(curr.x - start.x);
          const h = Math.abs(curr.y - start.y);
          const color = colors[((manualSlots || []).length) % colors.length];
          return (
            <div
              className={common + " absolute pointer-events-none"}
              style={{ left: `${left}%`, top: `${top}%`, width: `${w}%`, height: `${h}%`, borderColor: color }}
            >
              <span className="opacity-80" style={{ color: "var(--foreground)" }}>Slot {(manualSlots || []).reduce((m, s) => Math.max(m, s.index), -1) + 1}</span>
            </div>
          );
        })();
        return (
          <div
            id="layout-blueprint"
            ref={containerRef}
            className="aspect-[3/4] p-2 bg-muted relative"
            onMouseDown={handleDown}
            onMouseMove={handleMove}
            onMouseUp={handleUp}
          >
            {(manualSlots || []).map((s: { id: string; index: number; x: number; y: number; width: number; height: number }) => (
              <div
                key={s.id}
                className={common + " absolute"}
                style={{
                  borderColor: colors[s.index % colors.length],
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.width}%`,
                  height: `${s.height}%`,
                }}
              >
                <span className="opacity-80" style={{ color: "var(--foreground)" }}>Slot {s.index}</span>
              </div>
            ))}
            {preview}
            <div className="absolute bottom-2 left-2 text-[10px] opacity-70 bg-background/70 px-1 rounded">Tip: drag to add a slot</div>
          </div>
        );
      }
      return (
        <div id="layout-blueprint" className="aspect-[3/4] p-2 bg-muted">
          <div className="h-full">
            <SlotBox index={0} />
          </div>
        </div>
      );
  }
}


