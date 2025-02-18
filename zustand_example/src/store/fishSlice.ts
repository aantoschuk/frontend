import { StateCreator } from "zustand"

export interface FishSlice {
    fishes: number
}



export const createFishSlice: StateCreator<FishSlice> = (set) => ({
    fishes: 10,
})

