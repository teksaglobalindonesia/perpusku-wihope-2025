"use client";

import { useState } from "react";
import Image from "next/image";

export default function Pengembalian(){
    const pengembalian = [
        {
            id: 1,
            title: "The Lusty Argonian Maid v.1",
            image: "/image/Lusty Argonian.png",
            peminjam: "Aldwin Marcellus",
            peminjaman: "2025-07-25 10:30",
            pengembalian: "2025-07-20",
            dikembalikan: "2025-07-18",
            status: 1
        },

        {
            id: 2,
            title: "The Ransom of Zarek",
            image: "/image/RansomZarek.png",
            peminjam: "Dorian Septim",
            peminjaman: "2025-07-26 14:15",
            pengembalian: "2025-07-28",
            dikembalikan: "2025-07-27",
            status: 1
        },

        {
            id: 3,
            title: "The Last King of the Ayleids",
            image: "/image/Last King Aylieds.png",
            peminjam: "Selina Harkon",
            peminjaman: "2025-07-28 09:45",
            pengembalian: "2025-07-15",
            dikembalikan: "2025-07-16",
            status: 0
        },

        {
            id: 4,
            title: "Incident at Necrom",
            image: "/image/illusion_skil_book.png",
            peminjam: "Gareth Dren",
            peminjaman: "2025-07-29 11:20",
            pengembalian: "2025-07-18",
            dikembalikan: "2025-07-19",
            status: 1
        },

        {
            id: 5,
            title: "Oghma Infinium",
            image: "/image/OghmaInfinium.png",
            peminjam: "Luthien Velas",
            peminjaman: "2025-07-24 13:10",
            pengembalian: "2025-07-30",
            dikembalikan: "2025-07-29",
            status: 1
        },

        {
            id: 6,
            title: "The Red Kitchen Reader",
            image: "/image/RansomZarek.png",
            peminjam: "Marcellus Varo",
            peminjaman: "2025-07-27 16:00",
            pengembalian: "2025-07-26",
            dikembalikan: "2025-07-26",
            status: 1
        },

        {
            id: 7,
            title: "Thief",
            image: "/image/Last King Aylieds.png",
            peminjam: "Cyra Valen",
            peminjaman: "2025-07-23 10:50",
            pengembalian: "2025-07-24",
            dikembalikan: "2025-07-23",
            status: 1
        },

        {
            id: 8,
            title: "Withershins",
            image: "/image/Restoration.png",
            peminjam: "Cassian Morro",
            peminjaman: "2025-07-30 09:00",
            pengembalian: "2025-07-21",
            dikembalikan: "2025-07-21",
            status: 1
        },

        {
            id: 9,
            title: "The Rise and Fall of the Blades",
            image: "/image/Rise blades book.png",
            peminjam: "Lyra Voran",
            peminjaman: "2025-07-25 15:35",
            pengembalian: "2025-08-06",
            dikembalikan: "2025-08-06",
            status: 0
        },

        {
            id: 10,
            title: "Incident at Necrom",
            image: "/image/illusion_skil_book.png",
            peminjam: "Kaelith Rhor",
            peminjaman: "2025-07-28 12:40",
            pengembalian: "2025-08-01",
            dikembalikan: "2025-07-31",
            status: 1
        },
    ]

    const [currentPage, setCurrentPage] = useState(1);
        
    const itemsPerPage = 5;
    const totalPages = Math.ceil(pengembalian.length / itemsPerPage);
        
    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniPengembalian = pengembalian.slice(mulaiIndex, akhirIndex);
        
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
                    <h1 className="text-2xl md:text-3xl font-semibold">Returning</h1>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
                        <button className="px-4 md:px-8 border-2 md:border-4 rounded-md text-sm md:text-lg">Search...</button>
                    </div>
                </div>
                {saatiniPengembalian.map((pengembali) => (
                    <div key={pengembali.id} className="w-full border-2 md:border-4 rounded-md p-3 md:p-4 mt-3 md:mt-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-col md:flex-row md:gap-7">
                                <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                                    <Image src={pengembali.image} alt={pengembali.title} fill quality={100} className="object-contain" />
                                </div>
                                <div className="text-sm md:text-lg font-cyrodiil">
                                    <h1 className="font-semibold line-clamp-1 md:line-clamp-none">{pengembali.title}</h1>
                                    <h2 className="line-clamp-1 md:line-clamp-none">Borrower: {pengembali.peminjam}</h2>
                                    <h3 className="line-clamp-1 md:line-clamp-none">Borrowing: {pengembali.peminjaman}</h3>
                                    <h4 className="line-clamp-1 md:line-clamp-none">Returning: {pengembali.pengembalian}</h4>
                                    <h5 className="line-clamp-1 md:line-clamp-none">Returned: {pengembali.dikembalikan} </h5>
                                </div>
                            </div>
                            {pengembali.status === 0 && (
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