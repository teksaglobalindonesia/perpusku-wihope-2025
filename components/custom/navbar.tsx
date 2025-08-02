'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Book', path: '/book' },
    { label: 'Anggota', path: '/anggota' },
    { label: 'Peminjaman', path: '/peminjaman' },
    { label: 'Pengembalian', path: '/pengembalian' }
  ];

  return (
    <div className="relative flex h-[80px] w-full flex-row items-center justify-between bg-blue-900 px-6">
      <h1 className="text-3xl font-normal text-white underline">Perpusku</h1>

      <button
        className="rounded-lg bg-white px-2 text-4xl text-blue-700 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        =
      </button>

      <div className="hidden flex-row gap-4 md:flex">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <span
              className={`cursor-pointer rounded-lg px-8 py-2 transition-colors duration-200
                ${
                  pathname === item.path
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white text-blue-800 hover:bg-blue-100'
                }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {isOpen && (
        <div className="absolute left-0 top-[80px] z-10 flex w-full flex-col items-start bg-blue-900 px-6 py-4 md:hidden">
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
                      : 'bg-white text-blue-800 hover:bg-blue-100'
                  }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
