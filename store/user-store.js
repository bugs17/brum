import { create } from "zustand";

export const useUserStore = create((set) => ({
  // === STATE ===
  username: null,
  saldo: 0,
  isAuth: false,

  // === ACTIONS ===
  setUsername: (name) => set({ username: name }),

  setSaldo: (amount) => set({ saldo: amount }),

  setIsAuth: (status) => set({ isAuth: status }),
}));
