"use client";
import { exportElementToPng } from "@/lib/export/pngExport";
import { exportElementToPdf } from "@/lib/export/pdfExport";

export function ExportPanel() {
  return (
    <div className="flex items-center gap-2">
      <button
        className="border px-3 py-2 rounded"
        onClick={() => {
          const el = document.getElementById("poster-canvas-root");
          if (el) exportElementToPng(el);
        }}
      >
        Export PNG
      </button>
      <button
        className="border px-3 py-2 rounded"
        onClick={() => {
          const el = document.getElementById("poster-canvas-root");
          if (el) exportElementToPdf(el);
        }}
      >
        Export PDF
      </button>
    </div>
  );
}


