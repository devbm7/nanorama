export type PosterComponentType = "text" | "image";

export interface PosterTextComponent {
  id: string;
  type: "text";
  content: string;
}

export interface PosterImageComponent {
  id: string;
  type: "image";
  prompt: string;
  url?: string;
}

export type PosterComponent = PosterTextComponent | PosterImageComponent;

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


