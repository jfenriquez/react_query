"use client";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm btn-outline btn-primary"
    >
      {theme === "light" ? "🌞 Light Mode" : "🌜 Dark Mode"}
    </button>
  );
};

export default ThemeSwitcher;
