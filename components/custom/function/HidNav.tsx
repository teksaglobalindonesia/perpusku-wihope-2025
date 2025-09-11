'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type NavbarContextType = {
  visible: boolean;
  toggleNavbar: () => void;
  isTransitioning: boolean;
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ambil preferensi awal user dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('navbar');
    if (saved === 'hidden') setVisible(false);
    if (saved === 'visible') setVisible(true);
  }, []);

  const toggleNavbar = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    document.documentElement.classList.add('transitioning-navbar');

    if (visible) {
      localStorage.setItem('navbar', 'hidden');
      setVisible(false);
    } else {
      localStorage.setItem('navbar', 'visible');
      setVisible(true);
    }

    setTimeout(() => {
      document.documentElement.classList.remove('transitioning-navbar');
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <NavbarContext.Provider value={{ visible, toggleNavbar, isTransitioning }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar harus dipakai di dalam <NavbarProvider>');
  }
  return context;
}
