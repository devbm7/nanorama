"use client";
import { usePosterState } from "@/hooks/usePosterState";

export function ComponentInput() {
  const {
    components,
    addTextComponent,
    addImageComponent,
    updateComponent,
    removeComponent,
  } = usePosterState();

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <button className="border px-3 py-2 rounded" onClick={() => addTextComponent("")}>Add Text</button>
        <button className="border px-3 py-2 rounded" onClick={() => addImageComponent("")}>Add Image</button>
      </div>
      <div className="space-y-3">
        {components.map((c) => (
          <div key={c.id} className="border rounded p-3 space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm opacity-70">{c.type.toUpperCase()}</div>
              <button className="text-red-500 text-sm" onClick={() => removeComponent(c.id)}>Remove</button>
            </div>
            {c.type === "text" ? (
              <textarea
                className="w-full border rounded p-2 bg-transparent"
                rows={3}
                placeholder="Enter text content"
                value={c.content}
                onChange={(e) => updateComponent(c.id, { content: e.target.value })}
              />
            ) : (
              <input
                className="w-full border rounded p-2 bg-transparent"
                placeholder="Describe the image to generate"
                value={c.prompt}
                onChange={(e) => updateComponent(c.id, { prompt: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


