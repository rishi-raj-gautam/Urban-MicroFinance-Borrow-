import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = darkMode
    ? {
        mode: 'dark',
        bg: 'bg-gray-900',
        cardBg: 'bg-gray-800/50 backdrop-blur-sm',
        border: 'border-gray-700',
        text: 'text-gray-100',
        textMuted: 'text-gray-400',
        subtle: 'bg-gray-800/50',
        hover: 'hover:bg-gray-700/50',
      }
    : {
        mode: 'light',
        bg: 'bg-gray-50',
        cardBg: 'bg-white/80 backdrop-blur-sm',
        border: 'border-gray-200',
        text: 'text-gray-900',
        textMuted: 'text-gray-600',
        subtle: 'bg-gray-100',
        hover: 'hover:bg-gray-100',
      };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
