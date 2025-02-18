import { create } from "zustand";
import { BearSlice, createBearSlice } from "./bearSlice";
import { createFishSlice, FishSlice } from "./fishSlice";
import { createSharedSlice, SharedSlice } from "./sharedSlice";

export const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({
   ...createBearSlice(...a), 
   ...createFishSlice(...a),
   ...createSharedSlice(...a)
}));
