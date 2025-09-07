"use client";
import { usePosterState } from "@/hooks/usePosterState";

export function ComponentInput() {
  const {
    components,
    addImageComponent,
    addInfoCard,
    updateComponent,
    removeComponent,
  } = usePosterState();

  async function fileToPngDataUrl(file: File): Promise<string> {
    // Always convert to PNG to avoid unsupported MIME types (e.g., image/avif)
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/png");
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded bg-secondary text-secondary-foreground" onClick={() => addImageComponent("")}>Add Image</button>
        <button className="px-3 py-2 rounded bg-accent text-accent-foreground" onClick={() => addInfoCard("", [""])}>Add InfoCard</button>
      </div>
      <div className="space-y-3">
        {components.map((c) => (
          <div key={c.id} className="border rounded p-3 space-y-2 shadow-sm bg-card text-card-foreground">
            <div className="flex justify-between items-center">
              <div className="text-sm opacity-70">{c.type.toUpperCase()}</div>
              <button className="text-red-500 text-sm" onClick={() => removeComponent(c.id)}>Remove</button>
            </div>
            { c.type === "image" ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm opacity-70">Slot</label>
                  <input
                    type="number"
                    min={0}
                    className="w-20 border rounded p-2 bg-background"
                    value={c.slotIndex ?? 0}
                    onChange={(e) => updateComponent(c.id, { slotIndex: Number(e.target.value) })}
                  />
                </div>
                <input
                  className="w-full border rounded p-2 bg-background"
                  placeholder="Describe the image (prompt)"
                  value={c.prompt}
                  onChange={(e) => updateComponent(c.id, { prompt: e.target.value })}
                />
                <div className="flex items-center gap-3">
                  <label className="text-sm opacity-70">Upload image (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const dataUrl = await fileToPngDataUrl(file);
                      updateComponent(c.id, { assetUrl: dataUrl });
                    }}
                  />
                </div>
                {c.assetUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.assetUrl} alt="uploaded" className="max-h-32 object-contain" />
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm opacity-70">Slot</label>
                  <input
                    type="number"
                    min={0}
                    className="w-20 border rounded p-2 bg-background"
                    value={c.slotIndex ?? 0}
                    onChange={(e) => updateComponent(c.id, { slotIndex: Number(e.target.value) })}
                  />
                </div>
                <input
                  className="w-full border rounded p-2 bg-background"
                  placeholder="Section title (optional)"
                  value={c.title || ""}
                  onChange={(e) => updateComponent(c.id, { title: e.target.value })}
                />
                <div className="space-y-2">
                  {(c.bullets || []).map((b, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        className="flex-1 border rounded p-2 bg-background"
                        placeholder={`Bullet ${idx + 1}`}
                        value={b}
                        onChange={(e) => {
                          const next = [...(c.bullets || [])];
                          next[idx] = e.target.value;
                          updateComponent(c.id, { bullets: next });
                        }}
                      />
                      <button
                        className="border px-2 rounded"
                        onClick={() => {
                          const next = (c.bullets || []).filter((_, i) => i !== idx);
                          updateComponent(c.id, { bullets: next });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    className="border px-3 py-1 rounded"
                    onClick={() => updateComponent(c.id, { bullets: [...(c.bullets || []), ""] })}
                  >
                    Add bullet
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


