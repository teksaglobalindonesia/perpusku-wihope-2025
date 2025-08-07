"use client";

import { useState, useEffect } from "react";
import SearchLoan from "../search/search_loan";
import Image from "next/image";
import Pagination from "../pagination/pagination";

interface Loan {
    id: number;
    book?: {
        id: number;
        title: string;
        cover?: {
            url: string;
        }
    };
    member?: {
        id: number;
        name: string;
    };
    loan_date: Date;
    return_date: Date;
    createdAt?: string | Date;
}

export default function Pinjaman({ loans = [], books }: { loans?: any[], books: any[] }) {
    const API = "https://cms-perpusku.widhimp.my.id";
    const [currentPage, setCurrentPage] = useState(1);
    const [filterLoan, setFilterLoan] = useState<Loan[]>(loans)

    const today = new Date();
    const todayStr = today.toDateString();

    const todayLoans = filterLoan.filter((loan) => {
    if (!loan.createdAt) return false;
    const createdAtStr = new Date(loan.createdAt).toDateString();
    return createdAtStr === todayStr;
    });

    const itemsPerPage = 2;
    const totalPages = Math.ceil(todayLoans.length / itemsPerPage)

    useEffect(() => {
        setCurrentPage(1);
    }, [filterLoan]);

    const getBookData = (bookId: number) => {
        return books.find(book => book.id === bookId);
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] px-4 sm:px-8 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full border-2 md:border-4 rounded-md px-3 py-4 md:py-5 transition-all duration-300 hover:scale-105 hover:border-[#0D5EA6]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-morrisroman gap-3 sm:gap-0">
                    <h1 className="text-lg sm:text-xl font-semibold">
                        Today&apos;s borrowings
                    </h1>
                    <SearchLoan onSearch={(result) => {
                        setFilterLoan(result.length ? result : loans);
                    }}
                    className="px-4 sm:px-8 border-2 sm:border-4 rounded-md text-sm 
                    sm:text-lg w-full sm:w-auto" 
                    />
                </div>
                {todayLoans.length === 0 ? (
                    <div className="w-full text-center py-10">
                        <p className="text-xl md:text-2xl font-cyrodiil">
                            There is no loans for today
                        </p>
                    </div>
                ) : (
                    <>
                    {todayLoans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((loan) => {
                    const bookData = loan.book ? getBookData(loan.book.id) : null;
                    
                    return(
                        <div key={loan.id} className="w-full flex flex-col gap-3 md:gap-4 mt-3 md:mt-5">
                            <div className="flex flex-col sm:flex-row items-start 
                                sm:items-center justify-between border-2 md:border-4 rounded-md p-2 md:p-4 gap-2">
                                <div className="flex flex-col sm:gap-7 w-full">
                                    <div className="flex flex-col sm:flex-row gap-3 md:gap-7 items-start sm:items-center w-full">
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
                                        <div className="text-base md:text-lg font-cyrodiil">
                                            <h1 className="font-semibold line-clamp-1">
                                            {loan.book?.title}
                                            </h1>
                                            <h2 className="line-clamp-1">
                                                Borrower: {loan.member?.name}
                                            </h2>
                                            <h3 className="line-clamp-1">
                                                Borrowing: {loan.loan_date instanceof Date ? loan.loan_date.toLocaleDateString() : loan.loan_date}
                                            </h3>
                                            <h4 className="line-clamp-1">
                                                Returning: {loan.return_date instanceof Date ? loan.return_date.toLocaleDateString() : loan.return_date}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
                    </>
                )}
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