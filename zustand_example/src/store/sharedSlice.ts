/*
 * SharedSlice which updates state of both Bear and Fish slice
 */
import { StateCreator } from "zustand";

import { BearSlice } from "./bearSlice";
import { FishSlice } from "./fishSlice";

export interface SharedSlice {
  eatFish: () => void;
}

// Store State & Store State, StoreContext, StoreActions, StoreSlice
export const createSharedSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  SharedSlice
> = (set) => ({
  eatFish: () =>
    set((state) => ({ hunger: state.hunger + 10, fishes: state.fishes - 1 })),
});
