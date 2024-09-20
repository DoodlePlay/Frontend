import { create } from 'zustand';

interface FlipState {
  isFlipped: boolean;
  toggleFlip: () => void;
  setFlipState: (value: boolean) => void; //상태를 직접 설정
}

const useFlipStore = create<FlipState>(set => ({
  isFlipped: false,
  toggleFlip: () =>
    set(state => {
      const newValue = !state.isFlipped;
      localStorage.setItem('flip-storage', JSON.stringify(newValue)); // local storage에 저장
      return { isFlipped: newValue };
    }),
  setFlipState: (value: boolean) => set({ isFlipped: value }), // 상태를 local storage에서 불러온 값으로 설정
}));

export default useFlipStore;
