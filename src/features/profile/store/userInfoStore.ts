import { create } from 'zustand';

interface userInfoState {
  nickname: string;
  setNickname: (newNickname: string) => void;
  clickedAvatarIndex: number;
  onAvatarClick: (index: number) => void;
  isVideoOn: boolean;
  toggleVideo: () => void;
  isSoundOn: boolean;
  toggleSound: () => void;
  isFlipped: boolean;
  toggleFlip: () => void;
}

const useUserInfoStore = create<userInfoState>(set => ({
  nickname: '',
  setNickname: newNickname => set({ nickname: newNickname }),
  clickedAvatarIndex: 0,
  onAvatarClick: index => set({ clickedAvatarIndex: index }),
  isVideoOn: false,
  toggleVideo: () => set(state => ({ isVideoOn: !state.isVideoOn })),
  isSoundOn: true,
  toggleSound: () => set(state => ({ isSoundOn: !state.isSoundOn })),
  isFlipped: false,
  toggleFlip: () => set(state => ({ isFlipped: !state.isFlipped })),
}));

export default useUserInfoStore;
