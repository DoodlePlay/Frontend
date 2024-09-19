import { create } from 'zustand';

interface FlipState {
  isFlipped: boolean;
  toggleFlip: () => void;
}

const useFlipStore = create<FlipState>(set => ({
  isFlipped: false,
  toggleFlip: () => set(state => ({ isFlipped: !state.isFlipped })),
}));

export default useFlipStore;
