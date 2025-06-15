import { create } from "zustand";
import { getCurrentTheme } from "../lib/getCurrentTheme";

interface ThemeStore {
  currentTheme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: getCurrentTheme(),
  setTheme: (theme) => {
    set({ currentTheme: theme });
  },
}));

export default useThemeStore;
