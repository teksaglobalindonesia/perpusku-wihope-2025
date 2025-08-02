"use client";

import { useState } from "react";

export default function Pinjaman({ loans = [] }: { loans?: any[] }) {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 2;
    const totalPages = Math.ceil(loans.length / itemsPerPage)

    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniLoan = loans.slice(mulaiIndex, akhirIndex);

    const handleprev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handlenext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] px-4 sm:px-8 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full border-2 md:border-4 rounded-md px-3 py-4 md:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-morrisroman gap-3 sm:gap-0">
                    <h1 className="text-lg sm:text-xl font-semibold">
                        Today&apos;s borrowings
                    </h1>
                    <button className="px-4 sm:px-8 border-2 sm:border-4 rounded-md text-sm sm:text-lg w-full sm:w-auto">
                        Search...
                    </button>
                </div>
                {saatiniLoan.map((loan) => (
                    <div key={loan.id} className="w-full flex flex-col sm:flex-row sm:items-center 
                    justify-between border-2 sm:border-4 rounded-md p-3 sm:p-4 mt-4 sm:mt-5">
                        <div className="flex flex-col sm:gap-7 w-full">
                            <div className="text-sm sm:text-lg font-cyrodiil space-y-1 sm:space-y-2">
                                <h1 className="font-semibold line-clamp-1">
                                    {loan.book?.title}
                                </h1>
                                <h2 className="line-clamp-1">
                                    Borrower: {loan.member?.name}
                                </h2>
                                <h3 className="line-clamp-1">
                                    Borrowing: {loan.loan_date}
                                </h3>
                                <h4 className="line-clamp-1">
                                    Returning: {loan.return_date}
                                </h4>
                            </div>
                        </div>
                    </div>
                ))}
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
        </>
    )
}