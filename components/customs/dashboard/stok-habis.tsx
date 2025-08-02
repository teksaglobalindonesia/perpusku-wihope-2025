"use client";

import Image from "next/image";
import { useState } from "react";

export default function Habis({ books }: { books: any[] }){
    const API = "https://cms-perpusku.widhimp.my.id";

    const bukuHabis = books.filter((book) => book.stock === 0);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 2;
    const totalPages = Math.ceil(bukuHabis.length / itemsPerPage);

    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniHabis = bukuHabis.slice(mulaiIndex, akhirIndex);

    const handleprev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handlenext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    return (
        <>
        <div className="w-full bg-[#FFEAC5]">
            <div className="w-full px-4 md:px-[64px] py-6">
                <h1 className="text-2xl md:text-3xl font-semibold font-planewalker text-gray-900 mb-4">
                    Dashboard
                </h1>
                <div className="w-full border-2 md:border-4 rounded-md px-2 md:px-3 py-3 md:py-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between 
                    font-morrisroman gap-2 md:gap-0">
                        <h1 className="text-lg md:text-xl font-semibold">
                            Out of Stock Book
                            </h1>
                        <button className="px-4 md:px-8 border-2 md:border-4 rounded-md 
                        text-base md:text-lg w-full md:w-auto">
                            Search...
                        </button>
                    </div>
                    <div className="w-full flex flex-col gap-3 md:gap-4 mt-3 md:mt-5">
                        {saatiniHabis.map((book) => {
                            return(
                                <div key={book.id} className="flex flex-col sm:flex-row items-start 
                                sm:items-center justify-between border-2 md:border-4 rounded-md p-2 md:p-4 gap-2">
                                <div className="flex flex-col sm:flex-row gap-3 md:gap-7 items-start sm:items-center w-full">
                                    <div className="relative w-12 h-12 md:w-16 md:h-16">
                                        <Image src={book.cover ? API + book.cover.url : "/idk"} alt={book.title} fill quality={100} className="object-contain"/>
                                    </div>
                                    <div className="text-base md:text-lg font-cyrodiil">
                                        <h1 className="font-semibold line-clamp-1">
                                            {book.title}
                                        </h1>
                                        <h2 className="line-clamp-1">
                                            {book.categories?.[0]?.name ?? null}
                                        </h2>
                                        <h3 className="line-clamp-1">
                                            by {book.writer}
                                        </h3>
                                    </div>
                                </div>
                                <div className="sm:ml-auto bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 
                                clip-custom text-sm md:text-lg font-cyrodiil w-full sm:w-auto text-center">
                                    Unavailable
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 md:gap-2 
                    font-morrisroman text-base md:text-xl mt-2">
                        <button className="px-2 md:px-3 py-1 border rounded text-xs md:text-base" 
                        onClick={handleprev} disabled={currentPage === 1}>
                            ←
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button className={`
                                px-2 md:px-3 py-1 border rounded text-xs md:text-base 
                                ${currentPage === index + 1 ? "bg-green-400" : ""}`
                            }
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                        <button className="px-2 md:px-3 py-1 border rounded text-xs md:text-base" 
                        onClick={handlenext} disabled={currentPage === totalPages}>
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}