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
  openApp: (app, menu) =>
    set((state) => {
      let updates = {};
      if (app === "System Settings" && menu) {
        updates.settingsDefaultMenu = menu;
      }
      if (!state.openApps.includes(app)) {
        updates.openApps = [...state.openApps, app];
        return updates;
      }
      return updates;
    }),
  closeApp: (app) =>
    set((state) => ({
      openApps: state.openApps.filter((a) => a !== app),
    })),
  settingsDefaultMenu: "General",
  setSettingsDefaultMenu: (menu) => set({ settingsDefaultMenu: menu }),
}));
