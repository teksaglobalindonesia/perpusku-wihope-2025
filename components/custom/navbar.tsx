'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const currentPath = usePathname();

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Buku', path: '/Buku' },
    { label: 'Anggota', path: '/Anggota' },
    { label: 'Peminjaman', path: '/Peminjaman' },
    { label: 'Pengembalian', path: '/Pengembalian' },
  ];

  return (
    <header className="w-full h-[98px] px-[105px] flex items-center bg-tint-4">
      <Image
        src="/aset/Logo.png"
        alt="Logo PerpusQu"
        width={243}
        height={60}
        quality={100}
        priority
      />

      <nav className="flex flex-1 justify-end ml-[80px] gap-[28px] text-[16px]">
        {menuItems.map((item) => {
          const active = 
            item.path === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.path);

          return (
            <Link
              key={item.label}
              href={item.path}
              className={`block px-2 py-1 font-inter font-semibold transition-colors ${
                active ? 'text-action-warning' : 'text-neutral-dbrown hover:text-action-warning'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
