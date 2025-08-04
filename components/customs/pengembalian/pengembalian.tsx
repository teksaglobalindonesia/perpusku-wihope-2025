"use client";

import { useState } from "react";
import Image from "next/image";
import SearchReturn from "../search/search_return";

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

export default function Pengembalian({ returns, books }: { returns: any[], books: any[] } ){
    const API = "https://cms-perpusku.widhimp.my.id";
    const [currentPage, setCurrentPage] = useState(1);
    const [filterReturn, setFilterReturn] = useState<Return[]>(returns)
        
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filterReturn.length / itemsPerPage);
        
    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniReturns = filterReturn.slice(mulaiIndex, akhirIndex);
        
    const handleprev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
        
    const handlenext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

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
                        Returns
                    </h1>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
                        <SearchReturn onSearch={(result) => {
                            setCurrentPage(1)
                            setFilterReturn(result.length ? result : returns)
                        }}
                        
                        />
                    </div>
                </div>
                {saatiniReturns.map((returns) => {
                    const bookData = returns.book ? getBookData(returns.book.id) : null;

                    return(
                        <div key={returns.id} className="w-full border-2 md:border-4 rounded-md p-3 
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
                                        {returns.book?.title}
                                    </h1>
                                    <h2 className="line-clamp-1 md:line-clamp-none">
                                        Borrower: {returns.member?.name}
                                    </h2>
                                    <h3 className="line-clamp-1 md:line-clamp-none">
                                        Borrowing: {returns.loan_date instanceof Date ? returns.loan_date.toLocaleDateString() : returns.loan_date}
                                    </h3>
                                    <h4 className="line-clamp-1 md:line-clamp-none">
                                        Returning: {returns.return_date instanceof Date ? returns.return_date.toLocaleDateString() : returns.return_date}
                                    </h4>
                                    {/* <h5 className="line-clamp-1 md:line-clamp-none">
                                        Returned: {returns.dikembalikan} 
                                    </h5> */}
                                </div>
                            </div>
                            {isLateReturn(returns) && (
                                <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white 
                                px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil 
                                w-full md:w-auto text-center">
                                    Late to Return
                                </div>
                            )}
                        </div>
                    </div>
                    )
                }
                    
                )}
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