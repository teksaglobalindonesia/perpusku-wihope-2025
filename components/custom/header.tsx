'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export type headerProps = {
  navItems?: Array<{
    label: string;
    path: string;
  }>;
};

export const Header = ({ navItems = [] }: headerProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative border-b border-dusty-300 bg-gradient-to-r from-beige-800 to-botanical-800 px-4 py-4 shadow-lg shadow-beige-900/30 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <h1 className="font-vintage text-3xl font-bold text-vintage-parchment drop-shadow-sm">
          Perpusku
        </h1>

        {/* Hamburger Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="group relative z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-terracotta-600/30 text-vintage-parchment transition-all duration-300 hover:bg-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
            aria-label="Toggle menu"
          >
            <div className="relative flex flex-col items-center justify-center space-y-1.5">
              <span
                className={`h-0.5 w-6 origin-center transform bg-current transition-all duration-300 ${
                  isOpen ? 'translate-y-1.5 rotate-45 opacity-100' : 'rotate-0 opacity-100'
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen ? 'w-0 opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 origin-center transform bg-current transition-all duration-300 ${
                  isOpen ? '-translate-y-1.5 -rotate-45 opacity-100' : 'rotate-0 opacity-100'
                }`}
              ></span>
            </div>
          </button>
        )}

        {/* Desktop Nav */}
        {!isMobile && (
          <nav className="flex space-x-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`group relative rounded-md px-5 py-2.5 font-vintage text-sm font-medium text-vintage-parchment transition-all duration-300 hover:bg-terracotta-600/40 hover:text-terracotta-100 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 focus:ring-offset-beige-800`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-terracotta-300"></span>
                  )}
                  <span className="absolute inset-0 -z-10 rounded-md bg-terracotta-700/0 opacity-0 transition-all duration-200 group-hover:opacity-10"></span>
                </a>
              );
            })}
          </nav>
        )}

        {/* Mobile Menu Overlay */}
        {isMobile && isOpen && (
          <nav className="absolute left-0 right-0 top-16 z-40 overflow-hidden rounded-b-lg bg-beige-700/95 backdrop-blur-md md:hidden">
            <div className="flex flex-col px-4 py-3">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <a
                    key={index}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`relative my-1 rounded-md px-5 py-3 font-vintage text-beige-100 transition-all duration-300 hover:bg-terracotta-600/30 hover:text-terracotta-50 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:ring-offset-2 focus:ring-offset-beige-700 ${
                      isActive ? 'text-terracotta-50' : ''
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-terracotta-300"></span>
                    )}
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </div>

      {/* Background decoration (optional) */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
};