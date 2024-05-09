import { create } from 'zustand'



interface ThemeState {
    isDark: boolean
    updateMode: (mode: boolean) => void
  }

  
export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  updateMode: (mode:boolean) => set({ isDark: mode }),
}))

interface UserState {
  user: { username: string, userId: number, iat: number, exp: number } | null,
  updateUser: (user: { username: string, userId: number, iat: number, exp: number }) => void
}

export const userStore = create<UserState>((set) => ({
  user: null,
  updateUser: (user) => set({ user })
}))



//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
