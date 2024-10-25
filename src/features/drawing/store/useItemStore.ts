import { create } from 'zustand';

interface ItemUsageState {
  ToxicCover: number | null;
  GrowingBomb: number | null;
  PhantomReverse: number | null;
  LaundryFlip: number | null;
  TimeCutter: number | null;
}

interface ItemStore {
  itemUsageState: ItemUsageState;
  setItemUsed: (itemId: keyof ItemUsageState, round: number) => void;
  resetItemUsageState: () => void;
}

const useItemStore = create<ItemStore>(set => ({
  itemUsageState: {
    ToxicCover: null,
    GrowingBomb: null,
    PhantomReverse: null,
    LaundryFlip: null,
    TimeCutter: null,
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
        ToxicCover: null,
        GrowingBomb: null,
        PhantomReverse: null,
        LaundryFlip: null,
        TimeCutter: null,
      },
    }),
}));

export default useItemStore;
