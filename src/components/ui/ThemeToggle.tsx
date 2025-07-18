"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const html = document.documentElement;

    if (newIsDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 cursor-pointer w-10 h-10 flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <span className="hover:scale-120 transition-all duration-300">
          <Sun size={20} className="text-yellow-400" />
        </span>
      ) : (
        <span className="hover:scale-120 transition-all duration-300">
          <Moon size={20} className="text-slate-800" />
        </span>
      )}
    </button>
  );
};
