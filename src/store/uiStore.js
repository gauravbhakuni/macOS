import { create } from 'zustand'

// Restore from localStorage if exists
const initialScreen = typeof window !== 'undefined'
  ? localStorage.getItem('macos-screen') || 'start'
  : 'start'

export const useUIStore = create((set) => ({
  screen: initialScreen,
  setScreen: (screen) => {
    localStorage.setItem('macos-screen', screen)
    set({ screen })
  },
}))
