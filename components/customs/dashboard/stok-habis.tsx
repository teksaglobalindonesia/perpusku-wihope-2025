"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBook from "../search/search_buku";
import Pagination from "../pagination/pagination";

interface Book {
    id: number;
    title: string;
    cover?: { url: string };
    categories?: { name: string }[];
    writer: string;
    stock: number;
}

export default function Habis({ books }: { books: any[] }){
    const API = "https://cms-perpusku.widhimp.my.id";

    const [filterBook, setFilterBook] = useState<Book[]>(books);

    const bukuHabis = filterBook.filter((book) => book.stock === 0);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 2;
    const totalPages = Math.ceil(bukuHabis.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterBook]);

    return (
        <>
        <div className="w-full bg-[#FFEAC5]">
            <div className="w-full px-4 md:px-[64px] py-6">
                <h1 className="text-2xl md:text-3xl font-semibold font-planewalker text-gray-900 mb-4">
                    Dashboard
                </h1>
                <div className="w-full border-2 md:border-4 rounded-md px-2 md:px-6 py-3 md:py-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between 
                    font-morrisroman gap-2 md:gap-0">
                        <h1 className="text-lg md:text-xl font-semibold">
                            Out of Stock Book
                            </h1>
                        <SearchBook onSearch={(result) => {
                            setFilterBook(result.length ? result : books);
                        }}
                        className="px-4 sm:px-8 border-2 sm:border-4 rounded-md text-sm 
                    sm:text-lg w-full sm:w-auto" 
                        />
                    </div>
                    <div className="w-full flex flex-col gap-3 md:gap-4 mt-3 md:mt-5">
                        {filterBook.length === 0 ? (
                        <div className="w-full text-center py-10">
                            <p className="text-xl md:text-2xl font-cyrodiil">
                                All books are available right now
                            </p>
                        </div>
                        ) : (
                            <>
                            {filterBook.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((book) => {
                            return(
                                <div key={book.id} className="flex flex-col sm:flex-row items-start 
                                sm:items-center justify-between border-2 md:border-4 rounded-md p-2 md:p-4 gap-2 transition-all duration-300 hover:scale-[1.02] hover:border-[#43766C]">
                                    <div className="flex flex-col sm:flex-row gap-3 md:gap-7 items-start sm:items-center w-full">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 hover:scale-110">
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
                            </>
                        )}
                    </div>
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages}
                        onPageChange={(newPage) => setCurrentPage(newPage)}
                    />
                </div>
            </div>
        </div>
        </>
    )
}