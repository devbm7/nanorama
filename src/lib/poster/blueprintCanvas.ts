import type { LayoutTemplateId, ManualSlotRect } from "@/types/poster";

function strokeRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);
}

export function renderBlueprintToDataUrl(
  layout: LayoutTemplateId,
  manualSlots: ManualSlotRect[] | undefined,
  width = 600,
  height = 800
): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  // background white for compatibility
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const pad = 16;
  const colors = ["#ea4335", "#fbbc05", "#34a853", "#4285f4", "#a142f4"]; // simple palette

  const drawSlots = (rects: Array<{ x: number; y: number; w: number; h: number }>) => {
    rects.forEach((r, i) => {
      strokeRect(ctx, r.x, r.y, r.w, r.h, colors[i % colors.length]);
      ctx.fillStyle = "#111";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(`Slot ${i}`, r.x + 6, r.y + 16);
    });
  };

  switch (layout) {
    case "split-vertical": {
      const w2 = (width - pad * 3) / 2;
      const h1 = height - pad * 2;
      drawSlots([
        { x: pad, y: pad, w: w2, h: h1 },
        { x: pad * 2 + w2, y: pad, w: w2, h: h1 },
      ]);
      break;
    }
    case "split-horizontal": {
      const h2 = (height - pad * 3) / 2;
      const w1 = width - pad * 2;
      drawSlots([
        { x: pad, y: pad, w: w1, h: h2 },
        { x: pad, y: pad * 2 + h2, w: w1, h: h2 },
      ]);
      break;
    }
    case "triple-column": {
      const w3 = (width - pad * 4) / 3;
      const h1 = height - pad * 2;
      drawSlots([
        { x: pad, y: pad, w: w3, h: h1 },
        { x: pad * 2 + w3, y: pad, w: w3, h: h1 },
        { x: pad * 3 + w3 * 2, y: pad, w: w3, h: h1 },
      ]);
      break;
    }
    case "header-dual": {
      const headerH = Math.round((height - pad * 3) * 0.4);
      const bodyH = height - pad * 3 - headerH;
      const bodyW = (width - pad * 3) / 2;
      drawSlots([
        { x: pad, y: pad, w: width - pad * 2, h: headerH },
        { x: pad, y: pad * 2 + headerH, w: bodyW, h: bodyH },
        { x: pad * 2 + bodyW, y: pad * 2 + headerH, w: bodyW, h: bodyH },
      ]);
      break;
    }
    case "grid-2x2": {
      const cellW = (width - pad * 3) / 2;
      const cellH = (height - pad * 3) / 2;
      drawSlots([
        { x: pad, y: pad, w: cellW, h: cellH },
        { x: pad * 2 + cellW, y: pad, w: cellW, h: cellH },
        { x: pad, y: pad * 2 + cellH, w: cellW, h: cellH },
        { x: pad * 2 + cellW, y: pad * 2 + cellH, w: cellW, h: cellH },
      ]);
      break;
    }
    case "hero-sidebar": {
      const sidebarW = Math.round((width - pad * 3) * 0.3);
      const heroW = width - pad * 3 - sidebarW;
      drawSlots([
        { x: pad, y: pad, w: heroW, h: height - pad * 2 },
        { x: pad * 2 + heroW, y: pad, w: sidebarW, h: height - pad * 2 },
      ]);
      break;
    }
    case "manual": {
      (manualSlots || []).forEach((s, i) => {
        strokeRect(
          ctx,
          Math.round((s.x / 100) * width),
          Math.round((s.y / 100) * height),
          Math.round((s.width / 100) * width),
          Math.round((s.height / 100) * height),
          colors[i % colors.length]
        );
        ctx.fillStyle = "#111";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(`Slot ${s.index}`, Math.round((s.x / 100) * width) + 6, Math.round((s.y / 100) * height) + 16);
      });
      break;
    }
    case "single":
    default: {
      drawSlots([{ x: pad, y: pad, w: width - pad * 2, h: height - pad * 2 }]);
      break;
    }
  }

  return canvas.toDataURL("image/png");
}


