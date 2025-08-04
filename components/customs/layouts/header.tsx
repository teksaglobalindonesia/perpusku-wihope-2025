"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            href: "/"
        },
        {
            name: "Books",
            href: "/buku"
        },
        {
            name: "Member",
            href: "/anggota"
        },
        {
            name: "Loans",
            href: "/peminjaman"
        },
        {
            name: "Returns",
            href: "/pengembalian"
        }
    ]
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
            <div className="relative w-20 h-20 md:w-[95px] md:h-[95px]">
                <Image src="/image/Header_logo (3).png" alt="h_logo" fill quality={100} className="object-contain"/>
            </div>
            <h1 className="text-xl md:text-2xl pl-2 font-semibold text-white font-planewalker">
                Imperial Library
            </h1>
        </div>
        {navItems.map((item) => {
            const isActive = pathname === item.href;
            return(
                <>
                <div key={item.href} className="hidden md:flex flex-1 flex-row items-center justify-center gap-[60px] 
                text-lg font-[400]">
                    <Link href={item.href} className={`flex justify-center items-center font-medium hover:bg-[#F2C078] duration-300 bg-[#F0F2BD] 
                    w-[120px] py-[10px] clip-custom font-morrisroman cursor-pointer 
                    ${isActive ? "bg-[#F2C078]" : "bg-[#F0F2BD] hover:bg-[#F2C078]"}`}>
                        {item.name}
                    </Link>
                </div>
                </>
            )
        })}
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
                {navItems.map((item) => {
                    const isActive2 = pathname === item.href;
                    return(
                        <>
                        <div key={item.href} className="flex flex-col pb-3">
                            <Link href={item.href} className={`font-medium hover:bg-[#F2C078] duration-300 bg-[#F0F2BD] 
                            px-4 py-3 clip-custom font-morrisroman cursor-pointer text-center ${isActive2 ? "bg-[#F2C078]" : "bg-[#F0F2BD] hover:bg-[#F2C078]"}`} 
                            onClick={() => setIsMenuOpen(false)}>
                                {item.name}
                            </Link>
                        </div>
                        </>
                    )
                })}
            </div>
        )}
    </div>
    </>
);
}
