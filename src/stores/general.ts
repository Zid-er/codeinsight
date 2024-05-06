import { create } from 'zustand'



interface ThemeState {
    isDark: boolean
    updateMode: (by: boolean) => void
  }

  
export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  updateMode: (mode:boolean) => set({ isDark: mode }),
}))



//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
