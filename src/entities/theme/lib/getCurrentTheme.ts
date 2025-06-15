import { Theme } from "@/entities/theme/model/type";

export function getCurrentTheme(): Theme {
  const currentTheme = localStorage.getItem("theme") || "light";

  if (currentTheme === "dark" || currentTheme === "light") {
    return currentTheme;
  }

  return "light";
}
