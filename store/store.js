import create from "zustand";

export const useEmotionStore = create((set) => ({
  emotionColor: {},
  currentEmotionState: (obj) =>
    set((state) => (state.emotionColor = { ...obj })),
}));
