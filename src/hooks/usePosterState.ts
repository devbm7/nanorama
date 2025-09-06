import { create } from "zustand";
import { nanoid } from "nanoid";
import type {
  PosterState,
  PosterComponent,
  LayoutTemplateId,
} from "../types/poster";

interface PosterActions {
  setTitle: (title: string) => void;
  setLayout: (layout: LayoutTemplateId) => void;
  setColorScheme: (scheme: string) => void;
  addTextComponent: (content?: string) => void;
  addImageComponent: (prompt?: string) => void;
  updateComponent: (id: string, update: Partial<PosterComponent>) => void;
  removeComponent: (id: string) => void;
  reset: () => void;
}

const initialState: PosterState = {
  title: "Nanorama Poster",
  layout: "single",
  components: [],
  colorScheme: "default",
};

export const usePosterState = create<PosterState & PosterActions>((set) => ({
  ...initialState,
  setTitle: (title) => set({ title }),
  setLayout: (layout) => set({ layout }),
  setColorScheme: (colorScheme) => set({ colorScheme }),
  addTextComponent: (content = "") =>
    set((state) => ({
      components: [
        ...state.components,
        { id: nanoid(), type: "text", content },
      ],
    })),
  addImageComponent: (prompt = "") =>
    set((state) => ({
      components: [
        ...state.components,
        { id: nanoid(), type: "image", prompt },
      ],
    })),
  updateComponent: (id, update) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? ({ ...c, ...update } as PosterComponent) : c
      ),
    })),
  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
    })),
  reset: () => set(initialState),
}));


