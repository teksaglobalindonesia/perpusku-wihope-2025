'use client';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const isDark = theme === 'dark' || (!theme && prefersDark);
    setDark(isDark);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const theme = localStorage.getItem('theme');
      setDark(theme === 'dark');
    };

    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { dark?: boolean }
        | undefined;
      if (detail && typeof detail.dark === 'boolean') {
        setDark(detail.dark);
      } else {
        const theme = localStorage.getItem('theme');
        setDark(theme === 'dark');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'theme-change',
        handleThemeChange as EventListener
      );
    };
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-animated-gradient-light" />;
  }

  return (
    <div
      className={`fixed inset-0 -z-10 transition-all duration-700 ease-in-out ${
        dark ? 'bg-animated-gradient-dark' : 'bg-animated-gradient-light'
      }`}
    />
  );
}
