import { create } from "zustand";

export const useTabBarStore = create((set) => ({
  // === STATE ===
  hideTabBar: false,

  // === ACTIONS ===
  setHideTabBar: (hide) => set({ hideTabBar: hide }),

  // optional reset
  resetTabBar: () => set({ hideTabBar: false }),
}));
