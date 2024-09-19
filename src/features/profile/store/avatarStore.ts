import { create } from 'zustand';

interface AvatarState {
  clickedAvatarIndex: number;
  onAvatarClick: (index: number) => void;
}

const useAvatarStore = create<AvatarState>(set => ({
  clickedAvatarIndex: 0,
  onAvatarClick: index => set(state => ({ clickedAvatarIndex: index })),
}));

export default useAvatarStore;
