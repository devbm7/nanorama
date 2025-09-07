export type PosterComponentType = "image";



export interface PosterImageComponent {
  id: string;
  type: "image";
  prompt: string;
  // Uploaded asset image chosen by the user
  assetUrl?: string;
  // Original filename for UI display
  assetName?: string;
  // Generated image URL (data URL or remote)
  generatedUrl?: string;
  slotIndex?: number;
}

export interface PosterInfoCardComponent {
  id: string;
  type: "infoCard";
  title?: string;
  bullets: string[];
  slotIndex?: number;
}

export type PosterComponent =
  | PosterImageComponent
  | PosterInfoCardComponent;

export type LayoutTemplateId =
  | "single"
  | "split-vertical"
  | "split-horizontal"
  | "triple-column"
  | "header-dual"
  | "grid-2x2"
  | "hero-sidebar"
  | "manual";

export interface ManualSlotRect {
  id: string;
  index: number; // user-visible slot number
  // percentages 0-100 relative to the blueprint width/height
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PosterState {
  title: string;
  layout: LayoutTemplateId;
  components: PosterComponent[];
  colorScheme: string;
  manualSlots?: ManualSlotRect[];
}


