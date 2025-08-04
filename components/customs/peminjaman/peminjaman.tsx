"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchLoan from "../search/search_loan";

interface Loan {
    id: number;
    book?: {
        id: number;
        title: string;
        cover?: {
            url: string;
        };
    };
    member?: {
        id: number;
        name: string;
    };
    loan_date: Date;
    return_date: Date;
}


export default function Peminjaman({ peminjamans, books }: { peminjamans: any[], books: any[] }){
    const API = "https://cms-perpusku.widhimp.my.id";
    const [currentPage, setCurrentPage] = useState(1);
    const [filterLoan, setFilterLoan] = useState<Loan[]>(peminjamans);
    
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filterLoan.length / itemsPerPage);
    
    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniPeminjam = filterLoan.slice(mulaiIndex, akhirIndex);
    
    const handleprev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    
    const handlenext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);        
    }

    const getBookData = (bookId: number) => {
        return books.find(book => book.id === bookId);
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] mt-16 md:mt-[84px] px-4 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full px-2 md:px-3 py-3 md:py-5">
                <div className="md:flex md:items-center md:justify-between font-morrisroman">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        Loans
                    </h1>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
                        <SearchLoan onSearch={(result) => {
                            setCurrentPage(1)
                            setFilterLoan(result.length ? result : peminjamans)
                        }}/>
                        <Link href="/peminjaman/tambah" className="px-4 md:px-8 py-4 clip-custom 
                        text-sm md:text-lg font-cyrodiil text-white font-semibold bg-green-500 text-center">
                            Add
                        </Link>
                    </div>
                </div>
                {saatiniPeminjam.map((peminjam) => {
                    const bookData = peminjam.book ? getBookData(peminjam.book.id) : null;
                    
                    return (
                        <div key={peminjam.id} className="w-full border-2 md:border-4 rounded-md p-3 
                        md:p-4 mt-3 md:mt-5">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-col md:flex-row md:gap-7">
                                    <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                                        {bookData?.cover ? (
                                            <Image 
                                                src={`${API}${bookData.cover.url}`} 
                                                alt={bookData.title || "Book cover"} 
                                                fill 
                                                quality={100} 
                                                className="object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-xs">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-sm md:text-lg font-cyrodiil">
                                        <h1 className="font-semibold line-clamp-1 md:line-clamp-none">
                                            {peminjam.book?.title}
                                        </h1>
                                        <h2 className="line-clamp-1 md:line-clamp-none">
                                            Borrower: {peminjam.member?.name}
                                        </h2>
                                        <h3 className="line-clamp-1 md:line-clamp-none">
                                            Borrowing: {peminjam.loan_date instanceof Date ? peminjam.loan_date.toLocaleDateString() : peminjam.loan_date}
                                        </h3>
                                        <h4 className="line-clamp-1 md:line-clamp-none">
                                            Returning: {peminjam.return_date instanceof Date ? peminjam.return_date.toLocaleDateString() : peminjam.return_date}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="flex items-center justify-center gap-1 md:gap-2 font-morrisroman 
                text-sm md:text-xl mt-3 md:mt-4">
                    <button onClick={handleprev} disabled={currentPage === 1} className="px-2 md:px-3 
                    py-1 border rounded text-xs md:text-base">
                        ←
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-2 md:px-3 py-1 border rounded text-xs md:text-base 
                            ${currentPage === index + 1 ? "bg-green-400" : ""}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handlenext} disabled={currentPage === totalPages} 
                    className="px-2 md:px-3 py-1 border rounded text-xs md:text-base">
                        →
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}