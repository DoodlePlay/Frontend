import { create } from 'zustand';

interface NicknameState {
  nickname: string;
  setNickname: (newNickname: string) => void;
}

const useNicknameStore = create<NicknameState>(set => ({
  nickname: '',
  setNickname: newNickname => set({ nickname: newNickname }),
}));

export default useNicknameStore;
