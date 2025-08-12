"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "../pagination/pagination";
import { addReturns } from "@/lib/api";

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
    documentId: string;
}

export default function TambahReturn({ loans, books }: {loans: any[], books: any[]}){
    const API = "https://cms-perpusku.widhimp.my.id";
    const [currentPage, setCurrentPage] = useState(1);
    const [filterLoan, setFilterLoan] = useState<Loan[]>(loans);
    const [munculLoan, setMunculLoan] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
    const [actual_return_date, setLoan] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 
    const [popupMessage, setPopupMessage] = useState("");

    const itemsPerPage = 3;

    const totalPages = Math.ceil(filterLoan.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterLoan])

    const getBookData = (bookId: number) => {
        return books.find(book => book.id === bookId);
    }

    const handleChooseLoan = (loan: any) => {
        setSelectedLoanId(loan.documentId); 
        setMunculLoan(false);
    };

    async function handleSave() {
    try {
        if (!selectedLoanId || !actual_return_date) {
            setPopupMessage("Please select a loan and actual return date!");
            setShowPopup(true);
            return;
        }

        setLoading(true);

        const payload = { 
            loan: selectedLoanId,
            actual_return_date
        };
        console.log("Data dikirim:", payload);

        const res = await addReturns(payload);
        console.log("Respon API:", res);

        setPopupMessage("Return successfully added!");
        setShowPopup(true);

    } catch (err) {
        console.error("Error:", err);
        setPopupMessage(err instanceof Error ? err.message : "Return failed to add!");
        setShowPopup(true);
    } finally {
        setLoading(false);
    }
}

function handlePopupClose() {
    setShowPopup(false);
    setSelectedLoanId(null);
    setLoan(""); 
}

    return(
        <>
        <div className="w-full px-4 md:px-[64px] mt-16 md:mt-[84px] bg-[#FFEAC5] pb-6">
            <div className="w-full flex justify-center items-center py-6 md:py-8">
                <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold text-center">
                    Add a New Loan
                </h1>
            </div>
            <div className="w-full px-4 md:px-[64px] py-5 bg-[#6C4E31] rounded-lg 
            text-white font-cyrodiil text-base md:text-lg">
                <div className="w-full px-2 md:px-4">
                    <div className="py-2">
                        <label>Loan</label>
                            <div className="mt-2 md:mt-4 flex items-center gap-2">
                                <span>{selectedLoanId ? `ID: ${selectedLoanId}` : "No book selected"}</span>
                            <button 
                                className="bg-white hover:bg-[#F2C078] duration-300 py-2 px-3 border-2 rounded-md text-black" 
                                onClick={() => setMunculLoan(true)}
                            >
                                Choose
                            </button>
                        </div>
                    </div>
                    <div className="py-2">
                        <label>Actual Return Date</label>
                        <input 
                            type="date" 
                            value={actual_return_date}
                            onChange={(e) => setLoan(e.target.value)}
                            className="w-full mt-2 py-2 px-3 border rounded-md text-black" 
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 py-4">
                        <Link 
                            href="/peminjaman" 
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 
                            text-black py-2 px-4 clip-custom text-center"
                        >
                            ← Back
                        </Link>
                        <button 
                            type="button"
                            disabled={loading}
                            onClick={handleSave}
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black 
                            py-2 px-4 clip-custom"
                        >
                            {loading ? "Saving..." : "Save Return"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {munculLoan && (
            <div className="fixed top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-[#F2C078] w-[90%] md:w-[1000px] h-auto p-4 md:p-6 rounded-xl shadow-lg overflow-y-auto max-h-[80vh] z-[999]">
                {loans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((loan) => {
                    const bookData = loan.book ? getBookData(loan.book.id) : null;

                    return(
                        <>
                        <div key={loan.id} className="w-full md:flex md:items-center md:justify-between 
                        border-2 md:border-4 rounded-md p-3 md:p-4">
                            <div className="flex flex-col md:flex-row md:gap-7">
                                <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                                    {bookData?.cover ? (
                                    <Image src={`${API}${bookData.cover.url}`}  alt={bookData.title || "Book cover"} fill quality={100} className="object-contain"/>
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-xs">No Image</span>
                                    </div>
                                )}
                                </div>
                                <div className="text-sm md:text-lg font-cyrodiil">
                                    <h1 className="font-semibold">
                                        {loan.book?.title}
                                    </h1>
                                    <h2>
                                        Borrower: {loan.member?.name}
                                    </h2>
                                    <h3>
                                        Borrowing{loan.loan_date instanceof Date ? loan.loan_date.toLocaleDateString() : loan.loan_date}
                                    </h3>
                                    <h4>
                                        Returning: {loan.return_date instanceof Date ? loan.return_date.toLocaleDateString() : loan.return_date}
                                    </h4>
                                    <div className="flex mt-2">
                                        <button 
                                            onClick={() => handleChooseLoan(loan)} 
                                            className="bg-green-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base"
                                        >
                                            Choose
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })}
                <div className="flex">
                    <button onClick={() => setMunculLoan(false)} className="bg-[#F0F2BD] 
                    hover:bg-[#4B352A] hover:text-white duration-300 text-black py-2 px-4 
                    clip-custom text-center">
                        ← Back
                    </button>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setCurrentPage(newPage)}/>
            </div>
        )}
        {showPopup && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F2C078] w-[90%] md:w-[500px] h-auto md:h-[142px] p-4 md:p-0 rounded-xl shadow-lg z-[9999]">
                <div className="w-full md:w-64 font-cyrodiil flex flex-col items-center justify-center text-center">
                    <h1 className="text-lg md:text-xl mb-4">
                        {popupMessage}
                    </h1>
                    <button
                        className="bg-green-400 hover:bg-green-600 duration-300 text-white px-4 md:px-8 py-2 clip-custom"
                        onClick={handlePopupClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        )}
        </>
    )
}