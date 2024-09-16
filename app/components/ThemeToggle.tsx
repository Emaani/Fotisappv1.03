import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button 
      onClick={toggleTheme}
      className={`p-2 rounded-full ${theme === 'dark' ? 'bg-yellow-400' : 'bg-gray-800 text-white'}`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;