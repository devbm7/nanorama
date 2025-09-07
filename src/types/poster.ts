export type PosterComponentType = "text" | "image";

export interface PosterTextComponent {
  id: string;
  type: "text";
  content: string;
  slotIndex?: number;
}

export interface PosterImageComponent {
  id: string;
  type: "image";
  prompt: string;
  // Uploaded asset image chosen by the user
  assetUrl?: string;
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
  | PosterTextComponent
  | PosterImageComponent
  | PosterInfoCardComponent;

export type LayoutTemplateId =
  | "single"
  | "split-vertical"
  | "split-horizontal"
  | "triple-column"
  | "header-dual"
  | "grid-2x2"
  | "hero-sidebar";

export interface PosterState {
  title: string;
  layout: LayoutTemplateId;
  components: PosterComponent[];
  colorScheme: string;
}


