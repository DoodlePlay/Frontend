import { create } from 'zustand';

interface SoundState {
  isSoundOn: boolean;
  toggleSound: () => void;
  setSoundState: (value: boolean) => void; //상태를 직접 설정
}

const useSoundStore = create<SoundState>(set => ({
  isSoundOn: true,
  toggleSound: () =>
    set(state => {
      const newValue = !state.isSoundOn;
      localStorage.setItem('sound-storage', JSON.stringify(newValue)); // local storage에 저장
      return { isSoundOn: newValue };
    }),
  setSoundState: (value: boolean) => set({ isSoundOn: value }), // 상태를 local storage에서 불러온 값으로 설정
}));

export default useSoundStore;
