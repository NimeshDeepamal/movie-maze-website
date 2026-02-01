import React, { useEffect, useState } from 'react';
import './DarkMode.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DarkMode = () => {
  const [isDark, setIsDark] = useState(true);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme, or system preference, or default to dark
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    setIsDark(shouldBeDark);
    document.body.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('selectedTheme', newTheme);
  };

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`toggle-track ${isDark ? 'dark' : 'light'}`}>
        <div className="toggle-thumb">
          {isDark ? (
            <DarkModeIcon className="toggle-icon" />
          ) : (
            <LightModeIcon className="toggle-icon" />
          )}
        </div>
        <span className="toggle-icon-bg light-icon">
          <LightModeIcon />
        </span>
        <span className="toggle-icon-bg dark-icon">
          <DarkModeIcon />
        </span>
      </div>
    </button>
  );
};

export default DarkMode;
