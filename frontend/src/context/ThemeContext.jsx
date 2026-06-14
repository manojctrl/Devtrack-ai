import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("accentColor") || "blue";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("accentColor", accentColor);
  }, [accentColor]);

  // Dynamic CSS classes mapped to the chosen accent color
  const accentClasses = {
    text: {
      blue: "text-indigo-600 dark:text-indigo-400",
      purple: "text-purple-600 dark:text-purple-400",
      green: "text-emerald-600 dark:text-emerald-400",
    },
    textHover: {
      blue: "hover:text-indigo-600 dark:hover:text-indigo-400",
      purple: "hover:text-purple-600 dark:hover:text-purple-400",
      green: "hover:text-emerald-600 dark:hover:text-emerald-400",
    },
    bg: {
      blue: "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
      purple: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
      green: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
    },
    bgLight: {
      blue: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300",
      purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300",
      green: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300",
    },
    border: {
      blue: "border-indigo-600 dark:border-indigo-400",
      purple: "border-purple-600 dark:border-purple-400",
      green: "border-emerald-600 dark:border-emerald-400",
    },
    borderFocus: {
      blue: "focus:border-indigo-500 focus:ring-indigo-500/20 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20",
      purple: "focus:border-purple-500 focus:ring-purple-500/20 dark:focus:border-purple-400 dark:focus:ring-purple-400/20",
      green: "focus:border-emerald-500 focus:ring-emerald-500/20 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20",
    },
    ring: {
      blue: "ring-indigo-500 dark:ring-indigo-400",
      purple: "ring-purple-500 dark:ring-purple-400",
      green: "ring-emerald-500 dark:ring-emerald-400",
    },
    gradient: {
      blue: "from-indigo-600 to-indigo-800 dark:from-indigo-500 dark:to-indigo-700",
      purple: "from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700",
      green: "from-emerald-600 to-emerald-800 dark:from-emerald-500 dark:to-emerald-700",
    },
    shadow: {
      blue: "shadow-indigo-500/20 dark:shadow-indigo-500/10",
      purple: "shadow-purple-500/20 dark:shadow-purple-500/10",
      green: "shadow-emerald-500/20 dark:shadow-emerald-500/10",
    },
  };

  const getAccentClass = (type) => {
    return accentClasses[type]?.[accentColor] || "";
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        accentColor,
        setAccentColor,
        getAccentClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
