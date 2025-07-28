"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Peminjaman(){
    const peminjam = [
            {
                id: 1,
                title: "The Lusty Argonian Maid v.1",
                peminjam: "Varion Drelthar",
                peminjaman: "17 July 2025",
                pengembalian: "24 July 2025",
                image: "/image/Lusty Argonian.png",
                status: 1
            },
    
            {
                id: 2,
                title: "The Last King of the Ayleids",
                peminjam: "Varis Drenvel",
                peminjaman: "17 January 2025",
                pengembalian: "24 January 2025",
                image: "/image/Last King Aylieds.png",
                status: 1
            },
    
            {
                id: 3,
                title: "Mixed Unit Tactics",
                peminjam: "Selvyn Kaedor",
                peminjaman: "17 February 2025",
                pengembalian: "24 February 2025",
                image: "/image/Mixed Unit.jpg",
                status: 0
            },
    
            {
                id: 4,
                title: "The Rise and Fall of the Blades",
                peminjam: "Tharion Velros",
                peminjaman: "17 March 2025",
                pengembalian: "24 March 2025",
                image: "/image/Rise blades book.png",
                status: 0
            },
    
            {
                id: 5,
                title: "Incident at Necrom",
                peminjam: "Kaelrin Morveth",
                peminjaman: "17 April 2025",
                pengembalian: "24 April 2025",
                image: "/image/illusion_skil_book.png",
                status: 1
            },
    
            {
                id: 6,
                title: "Oghma Infinium",
                peminjam: "Draven Thalor",
                peminjaman: "17 May 2025",
                pengembalian: "24 May 2025",
                image: "/image/OghmaInfinium.png",
                status: 1
            },
    
            {
                id: 7,
                title: "The Ransom of Zarek",
                peminjam: "Seryn Dreloth",
                peminjaman: "17 June 2025",
                pengembalian: "24 June 2025",
                image: "/image/RansomZarek.png",
                status: 1
            },
    
            {
                id: 8,
                title: "The Red Kitchen Reader",
                peminjam: "Aric Veynar",
                peminjaman: "17 August 2025",
                pengembalian: "24 August 2025",
                image: "/image/RansomZarek.png",
                status: 1
            },
    
            {
                id: 9,
                title: "Thief",
                peminjam: "Mavryn Selroth",
                peminjaman: "17 September 2025",
                pengembalian: "24 September 2025",
                image: "/image/Last King Aylieds.png",
                status: 1
            },
    
            {
                id: 10,
                title: "Withershins",
                peminjam: "Vorath Keldren",
                peminjaman: "17 October 2025",
                pengembalian: "24 October 2025",
                image: "/image/Restoration.png",
                status: 1
            },
        ]
    
        const [currentPage, setCurrentPage] = useState(1);
    
        const itemsPerPage = 5;
        const totalPages = Math.ceil(peminjam.length / itemsPerPage);
    
        const mulaiIndex = (currentPage - 1) * itemsPerPage;
        const akhirIndex = mulaiIndex + itemsPerPage;
        const saatiniPeminjam = peminjam.slice(mulaiIndex, akhirIndex);
    
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
                <div className="md:flex md:items-center md:justify-between font-morrisroman">
                    <h1 className="text-2xl md:text-3xl font-semibold">Borrowing</h1>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
                        <button className="px-4 md:px-8 border-2 md:border-4 rounded-md text-sm md:text-lg">Search...</button>
                        <Link href="/peminjaman/tambah" className="px-4 md:px-8 py-2 clip-custom text-sm md:text-lg font-cyrodiil text-white font-semibold bg-green-500 text-center">
                            Add
                        </Link>
                    </div>
                </div>
                {saatiniPeminjam.map((peminjam) => (
                    <div key={peminjam.id} className="w-full border-2 md:border-4 rounded-md p-3 md:p-4 mt-3 md:mt-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-col md:flex-row md:gap-7">
                                <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                                    <Image src={peminjam.image} alt={peminjam.title} fill quality={100} className="object-contain" />
                                </div>
                                <div className="text-sm md:text-lg font-cyrodiil">
                                    <h1 className="font-semibold line-clamp-1 md:line-clamp-none">{peminjam.title}</h1>
                                    <h2 className="line-clamp-1 md:line-clamp-none">Borrower: {peminjam.peminjam}</h2>
                                    <h3 className="line-clamp-1 md:line-clamp-none">Borrowing: {peminjam.peminjaman}</h3>
                                    <h4 className="line-clamp-1 md:line-clamp-none">Returning: {peminjam.pengembalian}</h4>
                                    <div className="flex mt-2">
                                        <button className="bg-green-400 px-4 md:px-8 clip-custom text-xs md:text-base">Return</button>
                                    </div>
                                </div>
                            </div>
                            {peminjam.status === 0 && (
                                <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
                                    Late to Return
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center gap-1 md:gap-2 font-morrisroman text-sm md:text-xl mt-3 md:mt-4">
                    <button onClick={handleprev} disabled={currentPage === 1} className="px-2 md:px-3 py-1 border rounded text-xs md:text-base">←</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-2 md:px-3 py-1 border rounded text-xs md:text-base ${currentPage === index + 1 ? "bg-green-400" : ""}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handlenext} disabled={currentPage === totalPages} className="px-2 md:px-3 py-1 border rounded text-xs md:text-base">→</button>
                </div>
            </div>
        </div>
        </>
    )
}