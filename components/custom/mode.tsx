'use client';

import React, { useState } from 'react';
import { useDarkMode } from './function/DarkWhite';
import { useNavbar } from './function/HidNav';

const ModeToggle = () => {
  const [open, setOpen] = useState(false);
  const { dark, toggleDark, isTransitioning } = useDarkMode();
  const { toggleNavbar } = useNavbar();

  return (
    <div className={`w-screen transition-all duration-700 ease-in-out`}>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-10 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-2xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-500 lg:bottom-24 lg:right-24"
      >
        {open ? '-' : '≡'}
      </button>

      {/* Expand Menu */}
      {open && (
        <div
          className={`w-39 fixed bottom-28 right-10 z-40 flex flex-col space-y-3 rounded-xl p-4 shadow-xl transition-all duration-700 ease-in-out lg:bottom-44 lg:right-24 ${
            dark ? 'bg-white text-black' : 'bg-gray-800 text-white'
          }`}
        >
          <button className="rounded-lg bg-red-500 p-2" onClick={toggleNavbar}>
            Navbar
          </button>
          <button
            onClick={toggleDark}
            disabled={isTransitioning}
            className={`theme-toggle-btn rounded-lg p-3 shadow-lg transition-all duration-500 hover:cursor-pointer ${
              isTransitioning ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <span
              className={`theme-icon text-2xl transition-all duration-500 ${
                dark ? 'rotate-180' : 'rotate-0'
              }`}
            >
              {dark ? '🌞' : '🌙'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ModeToggle;
