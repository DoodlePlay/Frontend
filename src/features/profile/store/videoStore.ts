import { create } from 'zustand';

interface VideoState {
  isVideoOn: boolean;
  toggleVideo: () => void;
}

const useVideoStore = create<VideoState>(set => ({
  isVideoOn: false,
  toggleVideo: () => set(state => ({ isVideoOn: !state.isVideoOn })),
}));

export default useVideoStore;
