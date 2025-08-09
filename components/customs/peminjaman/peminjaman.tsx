"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchLoan from "../search/search_loan";
import Pagination from "../pagination/pagination";

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

interface Return {
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
    loan_date: Date | string;
    return_date: Date | string;
    return?: {
        actual_return_date: Date | string;
    };
}

export default function Peminjaman({ peminjamans, books, returns }: { peminjamans: any[], books: any[], returns: any[] }){
    const API = "https://cms-perpusku.widhimp.my.id";
    const [currentPage, setCurrentPage] = useState(1);
    const [filterLoan, setFilterLoan] = useState<Loan[]>(peminjamans);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filterLoan.length / itemsPerPage);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [filterLoan]);

    const getBookData = (bookId: number) => {
        return books.find(book => book.id === bookId);
    }

    const isLateReturn = (returnItem: Return) => {
        if (!returnItem.return || !returnItem.return.actual_return_date) return false;
        
        const returnDate = new Date(returnItem.return_date);
        const actualReturnDate = new Date(returnItem.return.actual_return_date);
        
        return actualReturnDate > returnDate;
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
                            setFilterLoan(result.length ? result : peminjamans)
                        }}/>
                        <Link href="/peminjaman/tambah" className="px-4 md:px-8 py-4 clip-custom 
                        text-sm md:text-lg font-cyrodiil text-white font-semibold bg-green-500 text-center hover:bg-green-800 duration-300">
                            Add
                        </Link>
                    </div>
                </div>
                <div className="w-full border-2 md:border-4 
                rounded-md p-3 md:p-6 mt-3 md:mt-5">
                    {filterLoan.length === 0 ? (
                        <div className="w-full text-center py-10">
                            <p className="text-xl md:text-2xl font-cyrodiil">
                                There is no loans available right now
                            </p>
                        </div>
                    ): (
                        <>
                        {filterLoan.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((peminjam) => {
                        const bookData = peminjam.book ? getBookData(peminjam.book.id) : null;
                        
                        return (
                            <div key={peminjam.id} className="w-full border-2 md:border-4 rounded-md p-3 
                            md:p-4 mt-3 md:mt-5 transition-all duration-300 hover:scale-[1.02] hover:border-[#FFB22C]">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex flex-col md:flex-row md:gap-7">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0 transition-transform duration-300 hover:scale-110">
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
                                            <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
                                                <div className="bg-green-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base transition-colors duration-300 hover:bg-green-600 hover:text-white">
                                                    Return
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {isLateReturn(peminjam) && (
                                        <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white 
                                        px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil 
                                        w-full md:w-auto text-center">
                                            Late to Return
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
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
        </>
    )
}