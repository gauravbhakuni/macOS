import { create } from "zustand";

// Restore from localStorage if exists
const initialScreen =
  typeof window !== "undefined"
    ? localStorage.getItem("macos-screen") || "start"
    : "start";

export const useUIStore = create((set) => ({
  screen: initialScreen,
  setScreen: (screen) => {
    localStorage.setItem("macos-screen", screen);
    set({ screen });
  },
  desktopBackground: localStorage.getItem("macos-background") || "/bg/2.jpg",
  setDesktopBackground: (bg) => {
    localStorage.setItem("macos-background", bg);
    set({ desktopBackground: bg });
  },
  bgModalOpen: false,
  setBgModalOpen: (isOpen) => set({ bgModalOpen: isOpen }),
  openApps: [], // ["finder", "safari"]
  openApp: (app) =>
    set((state) => {
      if (!state.openApps.includes(app)) {
        return { openApps: [...state.openApps, app] };
      }
      return state;
    }),
  closeApp: (app) =>
    set((state) => ({
      openApps: state.openApps.filter((a) => a !== app),
    })),
}));
