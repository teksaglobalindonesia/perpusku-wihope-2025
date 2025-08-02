"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
    <>
    <div className={`fixed top-0 left-0 z-[999] flex h-[70px] md:h-[84px] w-full flex-row 
    items-center justify-between px-4 md:px-[60px]
    ${isScrolled ? "bg-[#4B352A]/70 backdrop-blur-lg shadow-lg" : "bg-[#4B352A]"} 
    transition-all duration-500`}>
        <div className="flex items-center">
            <div className="relative w-10 h-10 md:w-[50px] md:h-[50px]">
                <Image src="/image/Header_logo.png" alt="h_logo" fill quality={100} className="object-contain"/>
            </div>
            <h1 className="text-xl md:text-2xl pl-2 font-semibold text-white font-planewalker">
                Imperial Library
            </h1>
        </div>
        <div className="hidden md:flex flex-1 flex-row items-center justify-center gap-[60px] text-lg font-[400]">
            <Link href="/" className="font-medium hover:bg-[#F2C078] duration-300 bg-[#F0F2BD] 
            px-[20px] py-[10px] clip-custom font-morrisroman cursor-pointer">
                Dashboard
            </Link>
            <Link href="/buku" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 px-[40px] py-[10px] 
            clip-custom font-morrisroman cursor-pointer">
                Books
            </Link>
            <Link href="/anggota" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 px-[30px] py-[10px] 
            clip-custom font-morrisroman cursor-pointer">
                Member
            </Link>
            <Link href="/peminjaman" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 px-[20px] py-[10px] 
            clip-custom font-morrisroman cursor-pointer">
                Borrowing
            </Link>
            <Link href="/pengembalian" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 px-[30px] 
            py-[10px] clip-custom font-morrisroman cursor-pointer">
                Returning
            </Link>
        </div>
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            )}
        </button>
        {isMenuOpen && (
            <div className="md:hidden absolute top-[70px] left-0 w-full bg-[#4B352A] shadow-lg py-4 px-4">
                <div className="flex flex-col space-y-4">
                    <Link href="/" className="font-medium hover:bg-[#F2C078] duration-300 bg-[#F0F2BD] 
                    px-4 py-3 clip-custom font-morrisroman cursor-pointer text-center" 
                    onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                    </Link>
                    <Link href="/buku" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 
                    px-4 py-3 clip-custom font-morrisroman cursor-pointer text-center" 
                    onClick={() => setIsMenuOpen(false)}>
                        Books
                    </Link>
                    <Link href="/anggota" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 
                    px-4 py-3 clip-custom font-morrisroman cursor-pointer text-center"
                        onClick={() => setIsMenuOpen(false)}>
                        Member
                    </Link>
                    <Link href="/peminjaman" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 
                    px-4 py-3 clip-custom font-morrisroman cursor-pointer text-center" 
                    onClick={() => setIsMenuOpen(false)}>
                        Borrowing
                    </Link>
                    <Link href="/pengembalian" className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 px-4 py-3 
                    clip-custom font-morrisroman cursor-pointer text-center" 
                    onClick={() => setIsMenuOpen(false)}>
                        Returning
                    </Link>
                </div>
            </div>
        )}
    </div>
    </>
);
}
