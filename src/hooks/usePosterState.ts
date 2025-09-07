import { create } from "zustand";
import { nanoid } from "nanoid";
import type { PosterState, PosterComponent, LayoutTemplateId, ManualSlotRect } from "../types/poster";

interface PosterActions {
  setTitle: (title: string) => void;
  setLayout: (layout: LayoutTemplateId) => void;
  setColorScheme: (scheme: string) => void;
  
  addImageComponent: (prompt?: string) => void;
  addInfoCard: (title?: string, bullets?: string[]) => void;
  updateComponent: (id: string, update: Partial<PosterComponent>) => void;
  removeComponent: (id: string) => void;

  setManualSlots: (slots: ManualSlotRect[]) => void;
  addManualSlot: (slot: ManualSlotRect) => void;
  updateManualSlot: (id: string, update: Partial<ManualSlotRect>) => void;
  removeManualSlot: (id: string) => void;

  reset: () => void;
}

const initialState: PosterState = {
  title: "Nanorama Poster",
  layout: "single",
  components: [],
  colorScheme: "default",
  manualSlots: [],
};

export const usePosterState = create<PosterState & PosterActions>((set) => ({
  ...initialState,
  setTitle: (title) => set({ title }),
  setLayout: (layout) => set({ layout }),
  setColorScheme: (colorScheme) => set({ colorScheme }),
  
  addImageComponent: (prompt = "") =>
    set((state) => ({
      components: [
        ...state.components,
        { id: nanoid(), type: "image", prompt },
      ],
    })),
  addInfoCard: (title = "", bullets: string[] = []) =>
    set((state) => ({
      components: [
        ...state.components,
        { id: nanoid(), type: "infoCard", title, bullets },
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

  setManualSlots: (slots) => set({ manualSlots: slots }),
  addManualSlot: (slot) => set((s) => ({ manualSlots: [...(s.manualSlots || []), slot] })),
  updateManualSlot: (id, update) =>
    set((s) => ({ manualSlots: (s.manualSlots || []).map((r) => (r.id === id ? { ...r, ...update } : r)) })),
  removeManualSlot: (id) => set((s) => ({ manualSlots: (s.manualSlots || []).filter((r) => r.id !== id) })),

  reset: () => set(initialState),
}));


