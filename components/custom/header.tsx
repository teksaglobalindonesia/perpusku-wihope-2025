"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const baseClass = "px-4 py-1 border border-white rounded-full shadow-md transition";
  const activeClass = "bg-white text-navy font-semibold";
  const inactiveClass = "text-white hover:bg-white hover:text-navy";

  return (
    <header className="bg-navy p-6">
      <div className="max-w-7xl mx-auto flex items-center flex-col sm:flex-row sm:items-center sm:justify-between gap-4">  
        {/* Judul */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white tracking-wide font-serif italic drop-shadow-md">
            Perpusku
          </span>
        </div>

        {/* Navigasi */}
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <Link
            href="/"
            className={`${baseClass} ${
              isActive("/") ? activeClass : inactiveClass
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/buku"
            className={`${baseClass} ${
              isActive("/buku") ? activeClass : inactiveClass
            }`}
          >
            Buku
          </Link>
          <Link
            href="/anggota"
            className={`${baseClass} ${
              isActive("/anggota") ? activeClass : inactiveClass
            }`}
          >
            Anggota
          </Link>
          <Link
            href="/peminjaman"
            className={`${baseClass} ${
              isActive("/peminjaman") ? activeClass : inactiveClass
            }`}
          >
            Peminjaman
          </Link>
          <Link
            href="/pengembalian"
            className={`${baseClass} ${
              isActive("/pengembalian") ? activeClass : inactiveClass
            }`}
          >
            Pengembalian
          </Link>
        </nav>
      </div>
    </header>
  );
}
