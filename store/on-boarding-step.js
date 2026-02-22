import { create } from "zustand";

export const useOnBoardingStep = create((set) => ({
  // === STATE ===
  step: 1,

  // === ACTIONS ===
  nextStep: () =>
    set((state) => ({
      // Maksimal step 3 (sesuai data onboarding kamu)
      step: state.step < 3 ? state.step + 1 : state.step,
    })),

  prevStep: () =>
    set((state) => ({
      // Minimal step 1, jangan sampai nol atau minus
      step: state.step > 1 ? state.step - 1 : state.step,
    })),

  // Reset jika diperlukan (misal saat user keluar)
  resetStep: () => set({ step: 1 }),
}));
