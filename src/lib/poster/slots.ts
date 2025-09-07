import type { LayoutTemplateId } from "@/types/poster";

export function getLayoutSlots(layout: LayoutTemplateId): { count: number; labels: string[] } {
  switch (layout) {
    case "single":
      return { count: 1, labels: ["Main"] };
    case "split-vertical":
      return { count: 2, labels: ["Left", "Right"] };
    case "split-horizontal":
      return { count: 2, labels: ["Top", "Bottom"] };
    case "triple-column":
      return { count: 3, labels: ["Left", "Center", "Right"] };
    case "header-dual":
      return { count: 3, labels: ["Header", "Left", "Right"] };
    case "grid-2x2":
      return { count: 4, labels: ["Top-Left", "Top-Right", "Bottom-Left", "Bottom-Right"] };
    case "hero-sidebar":
      return { count: 2, labels: ["Hero", "Sidebar"] };
    default:
      return { count: 1, labels: ["Main"] };
  }
}


