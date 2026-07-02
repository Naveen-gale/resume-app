import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('app-font-size') || 'Medium';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app-font-size', fontSize);
    const root = document.documentElement;
    root.setAttribute('data-font-size', fontSize.toLowerCase());
  }, [fontSize]);

  return { theme, setTheme, fontSize, setFontSize };
};
