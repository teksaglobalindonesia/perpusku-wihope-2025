"use client";

import { useState, useEffect } from "react";
import SearchReturn from "../search/search_return";
import Image from "next/image";
import Pagination from "../pagination/pagination";
import { set } from "date-fns";

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
    createdAt?: string | Date;
}
export default function Pengembali({ returns, books }: { returns: any[], books: any[] }){
    const API = "https://cms-perpusku.widhimp.my.id";
    const [currentPage, setCurrentPage] = useState(1);
    const [filterReturn, setFilterReturn] = useState<Return[]>(returns)

    const today = new Date()
    const todayStr = today.toDateString()
    const todayreturns = filterReturn.filter((returns) => {
        if(!returns.createdAt) return false;
        const createdAtStr = new Date(returns.createdAt).toDateString()
        return createdAtStr === todayStr
    })

    const itemsPerPage = 2;
    const totalPages = Math.ceil(todayreturns.length / itemsPerPage)

    useEffect(() => {
        setCurrentPage(1);
    }, [filterReturn]);

    const getBookData = (bookId: number) => {
        return books.find(book => book.id === bookId)
    }

    const isLateReturn = (returnItem: Return) => {
        if (!returnItem.return || !returnItem.return.actual_return_date) return false;
        
        const returnDate = new Date(returnItem.return_date);
        const actualReturnDate = new Date(returnItem.return.actual_return_date);
        
        return actualReturnDate > returnDate;
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] px-4 sm:px-8 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full border-2 md:border-4 rounded-md px-6 py-4 md:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-morrisroman gap-3 sm:gap-0">
                    <h1 className="text-lg sm:text-xl font-semibold">
                        Today&apos;s Returns
                    </h1>
                    <SearchReturn onSearch={(result) => {
                        setFilterReturn(result.length ? result : returns);
                    }}
                    className="px-4 sm:px-8 border-2 sm:border-4 rounded-md text-sm 
                    sm:text-lg w-full sm:w-auto" 
                    />
                </div>
                {todayreturns.length === 0 ? (
                    <div className="w-full text-center py-10">
                        <p className="text-xl md:text-2xl font-cyrodiil">
                            There is no returns for today
                        </p>
                    </div>
                ) : (
                    <>
                    {todayreturns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((returns) => {
                        <div key={returns.id} className="w-full flex flex-col sm:flex-row items-start 
                        sm:items-center justify-between border-2 sm:border-4 rounded-md p-3 sm:p-4 mt-3 sm:mt-5">
                            <div className="flex flex-col sm:flex-row sm:gap-7 w-full">
                                <div className="text-sm sm:text-lg font-cyrodiil space-y-1 sm:space-y-0">
                                    <h1 className="font-semibold line-clamp-1">
                                        {returns.book?.title}
                                    </h1>
                                    <h2 className="line-clamp-1">
                                        Borrower: {returns.member?.name}
                                    </h2>
                                    <h3 className="line-clamp-1">
                                        Borrowing: {returns.loan_date instanceof Date ? returns.loan_date.toLocaleDateString() : returns.loan_date}
                                    </h3>
                                    <h4 className="line-clamp-1">
                                        Returning: {returns.return_date instanceof Date ? returns.return_date.toLocaleDateString() : returns.return_date}
                                    </h4>
                                    <h5 className="line-clamp-1">
                                        Actual Returning: {returns.return?.actual_return_date instanceof Date ? returns.return?.actual_return_date.toLocaleDateString() : returns.return?.actual_return_date}
                                    </h5>
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
                    })}
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