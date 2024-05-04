import { create } from 'zustand'



interface ThemeState {
    isDark: boolean
    updateMode: (by: boolean) => void
  }

  
export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
  updateMode: (mode:boolean) => set({ isDark: mode }),
}))