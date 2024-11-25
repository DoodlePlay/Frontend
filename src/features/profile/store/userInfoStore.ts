import { create } from 'zustand';

import playSound from '../../../utils/helpers/playSound';

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
  toggleVideo: () => {
    set(state => ({ isVideoOn: !state.isVideoOn })); // 상태 업데이트
    playSound('/sounds/toggleButtonSound.mp3'); // 사운드 재생
  },
  isSoundOn: true,
  toggleSound: () => {
    set(state => ({ isSoundOn: !state.isSoundOn }));
    playSound('/sounds/toggleButtonSound.mp3');
  },
  isFlipped: false,
  toggleFlip: () => {
    set(state => ({ isFlipped: !state.isFlipped }));
    playSound('/sounds/toggleButtonSound.mp3');
  },
}));

export default useUserInfoStore;
