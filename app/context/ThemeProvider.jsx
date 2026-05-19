"use client";

import { createContext, useState, useEffect, useContext } from "react";

// Reads saved theme from localStorage on first load
// Falls back to 'light' if nothing is saved yet
// Must be a regular function — not a hook — because it runs before React renders
function getInitialTheme() {
  // localStorage is only available in the browser
  // This check prevents errors during server-side rendering
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
  }
  // Default to light mode — user can switch to dark via the toggle
  return "light";
}

export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  // getInitialTheme() runs once on mount — reads from localStorage or defaults to dark
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      document.documentElement.classList.remove(prevTheme);
      document.documentElement.classList.add(newTheme);

      // Persist the user's choice — survives page refresh and browser restart
      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
