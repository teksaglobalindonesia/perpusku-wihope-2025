"use client";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <h1 className="text-[#74B6FF] font-bold text-2xl tracking-wide">
                    📖 PERPUSKU
                </h1>

                <div className="hidden lg:flex space-x-8 text-gray-700 font-medium">
                    <Link className="hover:text-[#74B6FF] transition" href="/">Dashboard</Link>
                    <Link className="hover:text-[#74B6FF] transition" href="/buku">Buku</Link>
                    <Link className="hover:text-[#74B6FF] transition" href="/anggota">Anggota</Link>
                    <Link className="hover:text-[#74B6FF] transition" href="/peminjam">Peminjaman</Link>
                    <Link className="hover:text-[#74B6FF] transition" href="/pengembalian">Pengembalian</Link>
                </div>

                <button
                    className="text-3xl lg:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            <div
                className={`lg:hidden flex flex-col gap-3 mt-4 text-gray-700 font-medium transition-all duration-300 ease-in-out ${
                    menuOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
                }`}
            >
                <Link className="hover:text-[#74B6FF] transition" href="/">Dashboard</Link>
                <Link className="hover:text-[#74B6FF] transition" href="/buku">Buku</Link>
                <Link className="hover:text-[#74B6FF] transition" href="/anggota">Anggota</Link>
                <Link className="hover:text-[#74B6FF] transition" href="/peminjam">Peminjaman</Link>
                <Link className="hover:text-[#74B6FF] transition" href="/pengembalian">Pengembalian</Link>
            </div>
        </nav>
    );
};
