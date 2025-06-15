import useThemeStore from "@/entities/theme/model/store";
import useTheme from "../model/useTheme";
import { useState } from "react";
import { getCurrentTheme } from "../../../entities/theme/lib/getCurrentTheme";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { currentTheme } = useThemeStore();
  const { applyTheme } = useTheme();

  const toggleTheme = () => {
    setIsAnimating(true);

    setTimeout(() => {
      const theme = getCurrentTheme();
      const newTheme = theme === "light" ? "dark" : "light";
      applyTheme(newTheme);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 50);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          currentTheme === "light" ? "bg-blue-100" : "bg-gray-700"
        }`}
        aria-label={`Switch to ${
          currentTheme === "light" ? "dark" : "light"
        } theme`}
      >
        <span
          className={`absolute inset-y-1 left-1 flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            currentTheme === "dark" ? "translate-x-8" : ""
          } ${isAnimating ? "scale-90" : "scale-100"}`}
        >
          {currentTheme === "light" ? (
            <Sun size={14} className="text-yellow-500" />
          ) : (
            <Moon size={14} className="text-blue-500" />
          )}
        </span>
        <span className="sr-only">
          {currentTheme === "light"
            ? "Switch to dark theme"
            : "Switch to light theme"}
        </span>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
