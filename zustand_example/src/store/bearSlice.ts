import { StateCreator } from "zustand";
import { FishSlice } from "./fishSlice";

export interface BearSlice {
  bears: number;
  hunger: number;
  removeAllBears: () => void;
  increasePopulation: (by: number) => void;
}

/* To avoid covariant and contravariant  need to use create <BearState>()
 * as TS cannot understood from where values came from it returns T as unknown
 */
export const createBearSlice: StateCreator<BearSlice> = (set) => ({
  bears: 0,
  hunger: 0,
  removeAllBears: () => set(() => ({ bears: 0 })),
  increasePopulation: (by) => set((state) => ({ bears: state.bears + by })),
  //eatFish:  set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 }))
});

