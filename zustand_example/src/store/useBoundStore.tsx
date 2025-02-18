import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { BearSlice, createBearSlice } from "./bearSlice";
import { createFishSlice, FishSlice } from "./fishSlice";
import { createSharedSlice, SharedSlice } from "./sharedSlice";

export const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()(
  devtools(
    (...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
      ...createSharedSlice(...a),
    }),
    { name: "store" },
  ),
);
