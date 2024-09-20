'use client'; // Ensure this is at the top of the file

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the theme context with a default value
const ThemeContext = createContext({
  theme: 'light', // Default theme
  toggleTheme: () => {},
});

// ThemeProvider component that manages the state of the theme
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Toggle function to switch between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Use useEffect to persist the theme in localStorage and apply the theme to the body
  useEffect(() => {
    // Check localStorage for existing theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply the current theme to the body class
    document.body.className = theme;
    // Store the theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context in any component
export const useTheme = () => useContext(ThemeContext);
