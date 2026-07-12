import { create } from "zustand";

export type CursorVariant =
  | "default"
  | "hover"
  | "drag"
  | "view"
  | "text"
  | "open"
  | "book"
  | "order";

interface AppState {
  isLoading: boolean;
  loadProgress: number;
  hasEntered: boolean;
  cursorVariant: CursorVariant;
  setLoadProgress: (n: number) => void;
  finishLoading: () => void;
  setCursorVariant: (v: CursorVariant) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  loadProgress: 0,
  hasEntered: false,
  cursorVariant: "default",
  setLoadProgress: (n) => set({ loadProgress: n }),
  finishLoading: () => set({ isLoading: false, hasEntered: true }),
  setCursorVariant: (v) => set({ cursorVariant: v }),
}));
