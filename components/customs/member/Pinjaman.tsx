"use client";

import Image from "next/image";
import { useState, useEffect} from "react";
import Link from "next/link";
import Pagination from "../pagination/pagination";

interface Loan {
    id: number;
    documentId: string;
    loan_date: Date;
    return_date: Date;
    book?: {
        id: number;
        title: string;
        cover?: {
            url: string;
        };
    };
    member: {
        name: string
    }
    return?: {
        actual_return_date: Date;
    };
}

interface Book {
    id: number;
    title: string;
    writer: string;
    cover?: {
        url: string;
    };
}

interface PinjamanMembProps {
    loans: Loan[];
    books?: Book[];
}

export default function PinjamanMemb({ loans, books }: PinjamanMembProps){
    const API = "https://cms-perpusku.widhimp.my.id";
    const [currentPage, setCurrentPage] = useState(1);
    const [filterLoan, setFilterLoan] = useState<Loan[]>(loans);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(filterLoan.length / itemsPerPage);

    useEffect(() => {
        setFilterLoan(loans)
        setCurrentPage(1);
    }, [loans]);

    const getBookData = (bookId: number) => {
        return books?.find(book => book.id === bookId);
    }

    const firstMember = loans[0]?.member;

    const isLateReturn = (loan: Loan) => {
        if (!loan.return || !loan.return.actual_return_date) return false;
        
        const returnDate = new Date(loan.return_date);
        const actualReturnDate = new Date(loan.return.actual_return_date);
        
        return actualReturnDate > returnDate;
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] mt-16 md:mt-[84px] px-4 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full px-2 md:px-3 py-3 md:py-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between 
                font-morrisroman gap-4 md:gap-0">
                    <div className="font-morrisroman text-2xl md:text-3xl font-semibold">
                        <h1 className="pb-1 md:pb-3">
                            Borrowing
                        </h1>
                        {firstMember && (
                            <h1 className="text-xl md:text-2xl">
                            {firstMember.name}
                        </h1>
                        )}
                    </div>
                    <Link href="/anggota" className="bg-[#F2C078] hover:bg-[#4B352A] 
                    hover:text-white duration-300 text-black py-2 px-4 clip-custom text-center md:text-left">
                        ← Back
                    </Link>
                </div>
                <div className="w-full border-2 md:border-4 
                rounded-md p-3 md:p-6 mt-3 md:mt-5">
                    {filterLoan.length === 0 ? (
                        <div className="w-full text-center py-10">
                            <p className="text-xl md:text-2xl font-cyrodiil">
                                This member hasn&apos;t borrowed any books
                            </p>
                        </div>
                    ) : (
                        <>
                        {filterLoan.map((pinjam) => {
                        const bookData = pinjam.book ? getBookData(pinjam.book.id) : null;
                        
                        return(
                            <div key={pinjam.id} className="w-full flex flex-col md:flex-row items-start 
                        md:items-center justify-between border-2 md:border-4 rounded-md p-3 md:p-4 mt-3 md:mt-5 transition-all duration-300 hover:scale-[1.02] hover:border-[#224B0C]">
                                <div className="flex flex-col md:flex-row md:gap-7 w-full">
                                    <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0 transition-transform duration-300 hover:scale-110">
                                        <Image 
                                            src={`${API}${bookData?.cover?.url}`}  
                                            alt={bookData?.title || "Book cover"} 
                                            fill 
                                            quality={100} 
                                            className="object-contain" 
                                        />
                                    </div>
                                    <div className="text-sm md:text-lg font-cyrodiil">
                                        <h1 className="font-semibold line-clamp-1 md:line-clamp-none">
                                            {pinjam.book?.title}
                                        </h1>
                                        <h3 className="line-clamp-1 md:line-clamp-none">
                                            Borrowing: {pinjam.loan_date instanceof Date ? pinjam.loan_date.toLocaleDateString() : pinjam.loan_date}
                                        </h3>
                                        <h4 className="line-clamp-1 md:line-clamp-none">
                                            Returning: {pinjam.return_date instanceof Date ? pinjam.return_date.toLocaleDateString() : pinjam.return_date}
                                        </h4>
                                        {/* {(pinjam.status === "Dipinjam" || pinjam.status === "Terlambat") && (
                                            <div className="flex mt-2">
                                                <button className="bg-green-400 px-4 md:px-8 clip-custom 
                                                text-xs md:text-base">
                                                    Return
                                                </button>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                                {isLateReturn(pinjam) && (
                                    <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white 
                                    px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil 
                                    w-full md:w-[160px] text-center">
                                        Late to Return
                                    </div>
                                )}
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
        </>
    )
}