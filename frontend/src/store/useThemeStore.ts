import { create } from "zustand";
type Theme = string;

interface ThemeStore {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark",
  setTheme: (theme: string) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
