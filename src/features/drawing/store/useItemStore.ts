import { create } from 'zustand';

interface ItemUsageState {
  ToxicCover: boolean;
  GrowingBomb: boolean;
  PhantomReverse: boolean;
  LaundryFlip: boolean;
  TimeCutter: boolean;
}

interface ItemStore {
  activeItem: string | null;
  itemUsageState: ItemUsageState;
  setActiveItem: (itemId: string) => void;
  setItemUsed: (itemId: keyof ItemUsageState) => void;
  resetItemUsageState: () => void;
}

const useItemStore = create<ItemStore>(set => ({
  activeItem: null,
  itemUsageState: {
    ToxicCover: false,
    GrowingBomb: false,
    PhantomReverse: false,
    LaundryFlip: false,
    TimeCutter: false,
  },
  setActiveItem: itemId => set({ activeItem: itemId }),
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
