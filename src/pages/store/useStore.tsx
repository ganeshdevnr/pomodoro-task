import { create } from 'zustand'

export interface Data {
  bears: number
  updateBears: (newBears: number) => void
}

export const useStore = create<Data>((set) => ({
  bears: 100,
  updateBears: (newBears: number) => set({ bears: newBears }),
}))
