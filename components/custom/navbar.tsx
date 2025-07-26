'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Book', path: '/book' },
    { label: 'Anggota', path: '/anggota' },
    { label: 'Peminjaman', path: '/peminjaman' },
    { label: 'Pengembalian', path: '/pengembalian' }
  ];

  return (
    <div className="flex h-[80px] w-full flex-row items-center bg-blue-900 px-6">
      <h1 className="mr-32 pl-12 pr-32 text-3xl font-normal text-white underline">
        Perpusku
      </h1>
      <div className="flex w-1/2 flex-row gap-4 pl-32">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <span
              className={`mx-2 cursor-pointer rounded-lg px-8 py-2 transition-colors duration-200
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
    </div>
  );
};

export default Navbar;
