'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export type headerProps = {
  navItems?: Array<{
    label: string;
    path: string;
  }>;
};

export const Header = ({ ...props }: headerProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="border-b border-beige-300 bg-beige-800 px-4 py-4 shadow-md shadow-beige-900/20 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <h1 className="font-vintage text-3xl font-semibold text-beige-100">
          Perpusku
        </h1>

        {/* Hamburger Button (visible on mobile) */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-md text-beige-100 focus:outline-none focus:ring-2 focus:ring-beige-500 focus:ring-offset-2 focus:ring-offset-beige-800"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
                  isOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
                  isOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              ></span>
            </div>
          </button>
        )}

        {/* Navigation Items */}
        {/* Desktop Navigation (always visible on desktop) */}
        {!isMobile && (
          <nav className="flex gap-2">
            {props.navItems?.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={index}
                  href={item.path}
                  className={`rounded-md px-4 py-2 font-vintage transition-all duration-300 ${
                    isActive
                      ? 'bg-beige-700 font-medium text-beige-50'
                      : 'text-beige-100 hover:bg-beige-700/80 hover:text-beige-50'
                  } focus:outline-none focus:ring-2 focus:ring-beige-500 focus:ring-offset-2 focus:ring-offset-beige-800`}
                >
                  {item.label}
                  {isActive && (
                    <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-beige-300"></span>
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {/* Mobile Navigation (only visible when menu is open) */}
        {isMobile && isOpen && (
          <nav className="absolute left-0 right-0 top-16 z-50 bg-beige-800 shadow-lg md:hidden">
            <div className="flex flex-col px-4 py-2">
              {props.navItems?.map((item, index) => {
                const isActive = pathname === item.path;
                return (
                  <a
                    key={index}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-md px-4 py-3 font-vintage transition-all duration-300 ${
                      isActive
                        ? 'bg-beige-700 font-medium text-beige-50'
                        : 'text-beige-100 hover:bg-beige-700/80 hover:text-beige-50'
                    } focus:outline-none focus:ring-2 focus:ring-beige-500 focus:ring-offset-2 focus:ring-offset-beige-800`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-beige-300"></span>
                    )}
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};