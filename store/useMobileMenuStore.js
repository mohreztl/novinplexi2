// stores/useMobileMenuStore.js
import { create } from "zustand";

const useMobileMenuStore = create((set) => ({
  isOpen: false,
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMobileMenuStore;
