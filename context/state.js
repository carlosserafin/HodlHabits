import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      isDynamicAuth: false,
      isWorldCoinAuth: false,
      setDynamicAuth: () => set({ isDynamicAuth: true }),
      setWorldCoinAuth: () => set({ isWorldCoinAuth: true }),
      handleLogout: () => set({ isDynamicAuth: false, isWorldCoinAuth: false }),
    }),
    {
      name: 'hodlhabits-storage', 
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)