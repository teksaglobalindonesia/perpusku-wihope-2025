'use client';
import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState<boolean>(false); // Default ke light mode
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cek preferensi awal user
  useEffect(() => {
    if (!isClient) return;
    
    const saved = localStorage.getItem('theme');
    if (saved) {
      const isDark = saved === 'dark';
      setDark(isDark);
      document.documentElement.classList.toggle('dark', isDark);
      // Broadcast initial theme to listeners
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('theme-change', { detail: { dark: isDark } })
        );
      }
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('theme-change', { detail: { dark: prefersDark } })
        );
      }
    }
  }, [isClient]);

  const toggleDark = () => {
    if (isTransitioning || !isClient) return;

    setIsTransitioning(true);
    const newDark = !dark;
    
    setDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDark);

    // Notify all listeners in this tab immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('theme-change', { detail: { dark: newDark } })
      );
    }

    // Delay buat animasi transisi
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  return { dark, toggleDark, isTransitioning };
}
