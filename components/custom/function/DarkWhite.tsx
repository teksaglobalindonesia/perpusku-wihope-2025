'use client';
import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // cek preferensi awal user
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDark(false);
    }
  }, []);

  const toggleDark = () => {
    if (isTransitioning) return; // Prevent multiple clicks during transition

    setIsTransitioning(true);

    // Add transition class to html element
    document.documentElement.classList.add('transitioning');

    if (dark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDark(true);
    }

    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
      setIsTransitioning(false);
    }, 700);
  };

  return { dark, toggleDark, isTransitioning };
}
