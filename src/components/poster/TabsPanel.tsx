"use client";
import React, { useState, useMemo } from "react";
import { LayoutBlueprint } from "./LayoutBlueprint";
import { GeneratedOnly } from "./GeneratedOnly";
import { usePosterState } from "@/hooks/usePosterState";

export function TabsPanel() {
  const { components } = usePosterState();
  const hasGenerated = useMemo(() => {
    return components.some((c) => c.type === "image" && c.generatedUrl);
  }, [components]);

  const [tab, setTab] = useState<"layout" | "generated">("layout");

  return (
    <div className="bg-card text-card-foreground rounded border border-border shadow">
      <div className="flex items-center gap-2 border-b px-2 py-1">
        <button
          className={`px-3 py-2 rounded text-sm ${tab === "layout" ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"}`}
          onClick={() => setTab("layout")}
        >
          Layout
        </button>
        <button
          className={`px-3 py-2 rounded text-sm flex items-center gap-2 ${tab === "generated" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          onClick={() => setTab("generated")}
        >
          Generated
          <span className={`inline-flex items-center justify-center text-[10px] rounded px-1.5 py-0.5 ${hasGenerated ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>
            {hasGenerated ? "ready" : "empty"}
          </span>
        </button>
      </div>
      <div className="p-4 space-y-3">
        {tab === "layout" ? (
          <LayoutBlueprint />
        ) : (
          <div id="poster-canvas-root">
            <GeneratedOnly />
          </div>
        )}
      </div>
    </div>
  );
}


