'use client';

import { useState } from 'react';
import Image from 'next/image';

export type HeaderProps = {
  items?: Array<{
    text?: string;
    link?: string;
  }>;
};

export default function Header({ items = [] }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#393E46] text-[#DFD0B8]">
      <div className="flex justify-between items-center px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/image/logo.png"
            alt="Logo Perpusku"
            width={50}
            height={60}
            className="object-contain"
          />
          <h1 className="font-playwrite text-xl sm:text-2xl hover:text-[#948979]">
            Perpusku
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="hover:text-[#948979] text-sm font-playwrite px-4 py-2"
            >
              {item.text}
            </a>
          ))}
        </nav>

        {/* Mobile Burger */}
        <button
          className="sm:hidden flex flex-col gap-[5px] z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className={`block h-[2px] w-6 bg-[#DFD0B8] transition-transform duration-300 ${
              isOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#DFD0B8] transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[#DFD0B8] transition-transform duration-300 ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#222831] shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#DFD0B8] hover:text-[#948979] text-2xl"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col items-start px-6 gap-4">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="text-[#DFD0B8] hover:text-[#948979] text-lg font-playwrite"
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </header>
  );
}
