"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { members } from "@/components/customs/list-anggota";
import Link from "next/link";

export default function PinjamanMemb(){
    const pinjams = [
        {
            id: 1,
            title: "The Lusty Argonian Maid v.1",
            peminjaman: "17 June 2025",
            pengembalian: "24 June 2025",
            image: "/image/Lusty Argonian.png",
            status: "Dikembalikan"
        },

        {
            id: 2,
            title: "The Last King of the Ayleids",
            peminjaman: "17 January 2025",
            pengembalian: "24 January 2025",
            image: "/image/Last King Aylieds.png",
            status: "Terlambat"
        },

        {
            id: 3,
            title: "Mixed Unit Tactics",
            peminjaman: "17 March 2025",
            pengembalian: "24 March 2025",
            image: "/image/Mixed Unit.jpg",
            status: "Dipinjam"
        },

        {
            id: 4,
            title: "The Rise and Fall of the Blades",
            peminjaman: "17 April 2025",
            pengembalian: "24 April 2025",
            image: "/image/Rise blades book.png",
            status: "Dikembalikan"
        },

        {
            id: 5,
            title: "Incident at Necrom",
            peminjaman: "17 May 2025",
            pengembalian: "24 May 2025",
            image: "/image/illusion_skil_book.png",
            status: "Terlambat"
        },

        {
            id: 6,
            title: "Oghma Infinium",
            peminjaman: "17 July 2025",
            pengembalian: "24 July 2025",
            image: "/image/OghmaInfinium.png",
            status: "Dipinjam"
        },
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const id = parseInt(searchParams.get("id") ?? "0");

    const member = members.find(m => m.id === id);

    
    const itemsPerPage = 3;
    const totalPages = Math.ceil(pinjams.length / itemsPerPage);
    
    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniPinjam = pinjams.slice(mulaiIndex, akhirIndex);
    
    const handleprev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    
    const handlenext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] mt-16 md:mt-[84px] px-4 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full px-2 md:px-3 py-3 md:py-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between font-morrisroman gap-4 md:gap-0">
                    <div className="font-morrisroman text-2xl md:text-3xl font-semibold">
                        <h1 className="pb-1 md:pb-3">Borrowing</h1>
                        <h1 className="text-xl md:text-2xl">{member?.name}</h1>
                    </div>
                    <Link href="/anggota" className="bg-[#F2C078] hover:bg-[#4B352A] hover:text-white duration-300 text-black py-2 px-4 clip-custom text-center md:text-left">
                        ← Back
                    </Link>
                </div>
                {saatiniPinjam.map((pinjam) => (
                    <div key={pinjam.id} className="w-full flex flex-col md:flex-row items-start md:items-center justify-between border-2 md:border-4 rounded-md p-3 md:p-4 mt-3 md:mt-5">
                        <div className="flex flex-col md:flex-row md:gap-7 w-full">
                            <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                                <Image 
                                    src={pinjam.image} 
                                    alt={pinjam.title} 
                                    fill 
                                    quality={100} 
                                    className="object-contain" 
                                />
                            </div>
                            <div className="text-sm md:text-lg font-cyrodiil">
                                <h1 className="font-semibold line-clamp-1 md:line-clamp-none">{pinjam.title}</h1>
                                <h3 className="line-clamp-1 md:line-clamp-none">Borrowing: {pinjam.peminjaman}</h3>
                                <h4 className="line-clamp-1 md:line-clamp-none">Returning: {pinjam.pengembalian}</h4>
                                {(pinjam.status === "Dipinjam" || pinjam.status === "Terlambat") && (
                                    <div className="flex mt-2">
                                        <button className="bg-green-400 px-4 md:px-8 clip-custom text-xs md:text-base">
                                            Return
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {pinjam.status === "Terlambat" ? (
                            <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
                                Late to Return
                            </div>
                        ) : pinjam.status === "Dikembalikan" ? (
                            <div className="mt-2 md:mt-0 md:ml-auto bg-green-600 text-white px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
                                Returned
                            </div>
                        ) : pinjam.status === "Dipinjam" ? (
                            <div className="mt-2 md:mt-0 md:ml-auto bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
                                Borrowed
                            </div>
                        ) : null}
                    </div>
                ))}
                <div className="flex items-center justify-center gap-1 md:gap-2 font-morrisroman text-sm md:text-xl mt-3 md:mt-4">
                    <button onClick={handleprev} disabled={currentPage === 1} className="px-2 md:px-3 py-1 border rounded text-xs md:text-base">
                        ←
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index + 1}onClick={() => setCurrentPage(index + 1)}className={`px-2 md:px-3 py-1 border rounded text-xs md:text-base ${currentPage === index + 1 ? "bg-green-400" : ""}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handlenext} disabled={currentPage === totalPages} className="px-2 md:px-3 py-1 border rounded text-xs md:text-base">
                        →
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}