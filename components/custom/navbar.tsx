'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavbar } from './function/HidNav';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { visible, toggleNavbar } = useNavbar();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Perpusku?', path: '/about' },
    { label: 'Book', path: '/book' },
    { label: 'Anggota', path: '/anggota' },
    { label: 'Peminjaman', path: '/peminjaman' },
    { label: 'Pengembalian', path: '/pengembalian' }
  ];

  if (!visible) return null; // kalau navbar disembunyikan → jangan render sama sekali

  return (
    <nav className="fixed top-0 z-[9999] flex h-[80px] w-screen flex-row items-center justify-between bg-white px-6 text-black transition-colors duration-700 dark:bg-black dark:text-white">
      <h1 className="text-3xl font-normal underline transition-colors duration-700">
        Perpusku
      </h1>

      {/* Tombol toggle mobile menu */}
      <button
        className="rounded-lg bg-white px-2 text-4xl text-blue-700 transition-colors duration-700 md:hidden dark:bg-black dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        =
      </button>

      {/* Menu desktop */}
      <div className="hidden flex-row gap-4 md:flex">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <span
              className={`cursor-pointer rounded-lg px-8 py-2 transition-colors duration-700
                ${
                  pathname === item.path
                    ? 'bg-yellow-500 text-white'
                    : 'text-black hover:bg-blue-100 dark:text-white dark:hover:bg-gray-800'
                }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute left-0 top-[80px] z-10 flex w-full flex-col items-start bg-gray-100 px-6 py-4 transition-colors duration-700 md:hidden dark:bg-gray-900">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
            >
              <span
                className={`mb-4 block w-full rounded-lg px-4 py-2 text-left transition-colors duration-200
                  ${
                    pathname === item.path
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-blue-800 hover:bg-blue-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                  }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
