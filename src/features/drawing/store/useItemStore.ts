import { create } from 'zustand';

interface ItemUsageState {
  toxicCover: number | null;
  growingBomb: number | null;
  phantomReverse: number | null;
  laundryFlip: number | null;
  timeCutter: number | null;
}

interface ItemStore {
  itemUsageState: ItemUsageState;
  setItemUsed: (itemId: keyof ItemUsageState, round: number) => void;
  resetItemUsageState: () => void;
}

const useItemStore = create<ItemStore>(set => ({
  itemUsageState: {
    toxicCover: null,
    growingBomb: null,
    phantomReverse: null,
    laundryFlip: null,
    timeCutter: null,
  },
  setItemUsed: (itemId, round) =>
    set(state => ({
      itemUsageState: {
        ...state.itemUsageState,
        [itemId]: round,
      },
    })),
  resetItemUsageState: () =>
    set({
      itemUsageState: {
        toxicCover: null,
        growingBomb: null,
        phantomReverse: null,
        laundryFlip: null,
        timeCutter: null,
      },
    }),
}));

export default useItemStore;
