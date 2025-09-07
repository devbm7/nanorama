"use client";
import React, { useState } from "react";
import { usePosterState } from "@/hooks/usePosterState";
import { nanoid } from "nanoid";

export function ManualLayoutEditor() {
  const { manualSlots = [], addManualSlot, updateManualSlot, removeManualSlot } = usePosterState();
  const [draft, setDraft] = useState({ index: 0, x: 5, y: 5, width: 40, height: 30 });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {manualSlots.map((s) => (
          <div key={s.id} className="border rounded p-2 flex flex-col gap-2">
            <div className="text-xs opacity-70">Slot {s.index}</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-1">X%<input className="border rounded p-1 w-16" type="number" value={s.x} onChange={(e) => updateManualSlot(s.id, { x: Number(e.target.value) })} /></label>
              <label className="flex items-center gap-1">Y%<input className="border rounded p-1 w-16" type="number" value={s.y} onChange={(e) => updateManualSlot(s.id, { y: Number(e.target.value) })} /></label>
              <label className="flex items-center gap-1">W%<input className="border rounded p-1 w-16" type="number" value={s.width} onChange={(e) => updateManualSlot(s.id, { width: Number(e.target.value) })} /></label>
              <label className="flex items-center gap-1">H%<input className="border rounded p-1 w-16" type="number" value={s.height} onChange={(e) => updateManualSlot(s.id, { height: Number(e.target.value) })} /></label>
            </div>
            <button className="border rounded px-2 py-1 text-xs" onClick={() => removeManualSlot(s.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="border rounded p-2 space-y-2">
        <div className="text-xs font-semibold">Add slot</div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <label className="flex items-center gap-1">Index<input className="border rounded p-1 w-16" type="number" value={draft.index} onChange={(e) => setDraft({ ...draft, index: Number(e.target.value) })} /></label>
          <label className="flex items-center gap-1">X%<input className="border rounded p-1 w-16" type="number" value={draft.x} onChange={(e) => setDraft({ ...draft, x: Number(e.target.value) })} /></label>
          <label className="flex items-center gap-1">Y%<input className="border rounded p-1 w-16" type="number" value={draft.y} onChange={(e) => setDraft({ ...draft, y: Number(e.target.value) })} /></label>
          <label className="flex items-center gap-1">W%<input className="border rounded p-1 w-16" type="number" value={draft.width} onChange={(e) => setDraft({ ...draft, width: Number(e.target.value) })} /></label>
          <label className="flex items-center gap-1">H%<input className="border rounded p-1 w-16" type="number" value={draft.height} onChange={(e) => setDraft({ ...draft, height: Number(e.target.value) })} /></label>
          <button
            className="px-2 py-1 border rounded"
            onClick={() => addManualSlot({ id: nanoid(), ...draft })}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}


