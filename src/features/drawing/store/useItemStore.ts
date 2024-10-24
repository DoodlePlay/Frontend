import { create } from 'zustand';

interface ItemUsageState {
  ToxicCover: boolean;
  GrowingBomb: boolean;
  PhantomReverse: boolean;
  LaundryFlip: boolean;
  TimeCutter: boolean;
}

interface ItemStore {
  itemUsageState: ItemUsageState;
  setItemUsed: (itemId: keyof ItemUsageState) => void;
  resetItemUsageState: () => void;
}

const useItemStore = create<ItemStore>(set => ({
  itemUsageState: {
    ToxicCover: false,
    GrowingBomb: false,
    PhantomReverse: false,
    LaundryFlip: false,
    TimeCutter: false,
  },
  setItemUsed: itemId =>
    set(state => ({
      itemUsageState: {
        ...state.itemUsageState,
        [itemId]: true,
      },
    })),
  resetItemUsageState: () =>
    set({
      itemUsageState: {
        ToxicCover: false,
        GrowingBomb: false,
        PhantomReverse: false,
        LaundryFlip: false,
        TimeCutter: false,
      },
    }),
}));

export default useItemStore;
