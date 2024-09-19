import { create } from 'zustand';

interface SoundState {
  isSoundOn: boolean;
  toggleSound: () => void;
}

const useSoundStore = create<SoundState>(set => ({
  isSoundOn: true,
  toggleSound: () => set(state => ({ isSoundOn: !state.isSoundOn })),
}));

export default useSoundStore;
