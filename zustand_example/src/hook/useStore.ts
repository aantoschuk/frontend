import { create } from "zustand";

export interface BearState {
  bears: number;
  removeAllBears: () => void;
  increasePopulation: (by: number) => void;
}

/* To avoid covariant and contravariant  need to use create <BearState>()
 * as TS cannot understood from where values came from it returns T as unknown
 */
export const useStore = create<BearState>()((set) => ({
  bears: 0,
  removeAllBears: () => set(() => ({ bears: 0 })),
  increasePopulation: (by) => set((state) => ({ bears: state.bears + by })),
}));
