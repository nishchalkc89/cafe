import { create } from "zustand";
import type { MenuItem } from "@/data/menuCategories";

interface ProductModalState {
  item: MenuItem | null;
  open: (item: MenuItem) => void;
  close: () => void;
}

export const useProductModal = create<ProductModalState>((set) => ({
  item: null,
  open: (item) => set({ item }),
  close: () => set({ item: null }),
}));
