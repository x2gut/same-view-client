import useThemeStore from "@/entities/theme/model/store";
import { Theme } from "@/entities/theme/model/type";

const useTheme = () => {
  const { setTheme, currentTheme } = useThemeStore();

  const applyTheme = (theme: Theme) => {
    setTheme(theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  };

  const initTheme = () => {
    applyTheme(currentTheme);
  };

  return { applyTheme, initTheme };
};

export default useTheme;
