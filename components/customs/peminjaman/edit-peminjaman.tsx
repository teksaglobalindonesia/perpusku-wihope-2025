"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "../pagination/pagination";
import { increaseBookStock, decreaseBookStock, editLoan } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Book {
    id: number;
    documentId: string;
    title: string;
    cover?: { url: string };
    categories?: { name: string }[];
    writer: string;
    stock: number;
}

export default function EditLoan({ books, documentId }: {books: Book[], documentId: string}){
    const router = useRouter()
    const API = "https://cms-perpusku.widhimp.my.id";

    const [selectedBookId, setSelectedBookId] = useState<string>("")
    const [loan_date, setLoan_date] = useState<string>("")
    const [durationWeeks, setDurationWeeks] = useState<number | null>(null)
    const [return_date, setReturn_date] = useState<string>("")
    const [munculBuku, setMunculBuku] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [popupMessage, setPopupMessage] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [originalBookId, setOriginalBookId] = useState<string>("")
    const [loadingData, setLoadingData] = useState<boolean>(true)

    const itemsPerPage = 5
    const totalPages = Math.ceil(books.length / itemsPerPage)

    // useEffect(() => {
    //     const fetchLoanData = async () => {
    //         try {
    //             setLoadingData(true); 
    //             const loanData = await (documentId); 
    //             console.log("Loan data loaded:", loanData);
                
    //             if (loanData && loanData.length > 0) {
    //                 const loan = loanData[0];
    //                 setSelectedBookId(loan.book?.documentId || "");
    //                 setLoan_date(loan.loan_date || "");
    //                 setReturn_date(loan.return_date || "");
    //                 setOriginalBookId(loan.book?.documentId || "");
                    

    //                 if (loan.loan_date && loan.return_date) {
    //                     const loanDate = new Date(loan.loan_date);
    //                     const returnDate = new Date(loan.return_date);
    //                     const diffTime = Math.abs(returnDate.getTime() - loanDate.getTime());
    //                     const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    //                     setDurationWeeks(diffWeeks);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch loan data:", error);
    //             setPopupMessage("Failed to load loan data");
    //             setShowPopup(true);
    //         } finally {
    //             setLoadingData(false);
    //         }
    //     };

    //     if (documentId) {
    //         fetchLoanData();
    //     }
    // }, [documentId]);

    useEffect(() => {
        if(loan_date && durationWeeks){
            const loanDate = new Date(loan_date)
            const returnDate = new Date(loanDate)
            returnDate.setDate(loanDate.getDate() + (durationWeeks * 7))
            setReturn_date(returnDate.toISOString().split('T')[0])
        }
    }, [loan_date, durationWeeks])

    const handleChooseBook = (books: Book) => {
        setSelectedBookId(books.documentId)
        setMunculBuku(false)
    }

    const handleSave = async () => {
        if(!selectedBookId || !loan_date || !return_date){
            setPopupMessage("Please fill all required fields")
            setShowPopup(true)
            return
        }

        setLoading(true)
        try{
            if(originalBookId && originalBookId !== selectedBookId){
                await increaseBookStock(originalBookId, 1)
                await decreaseBookStock(selectedBookId, 1)
            } else if(!originalBookId && selectedBookId){
                await decreaseBookStock(selectedBookId, 1)
            }
            await editLoan(documentId, {
                book_documentId: selectedBookId,
                loan_date: loan_date,
                return_date: return_date
            })
            setPopupMessage("Loan updated succesfully")
            setShowPopup(true)
        } catch (error){
            setPopupMessage("Failed to updated loan")
            setShowPopup(true)
            console.error("Error updating loan:", error)
        } finally{
            setLoading(false)
        }
    }

    const handlePopupClose = () => {
        setShowPopup(false)
        if(popupMessage.includes("successfully")){
            router.push("/peminjaman")
            router.refresh()
        }
    }

    if (loadingData) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#FFEAC5]">
                <div className="w-12 h-12 border-4 border-t-transparent border-[#6C4E31] rounded-full animate-spin"></div>
            </div>
        );
    }

    return(
        <>
        <div className="w-full px-4 md:px-[64px] mt-16 md:mt-[84px] bg-[#FFEAC5] pb-6">
            <div className="w-full flex justify-center items-center py-6 md:py-8">
                <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold text-center">
                    Edit a Loan
                </h1>
            </div>
            <div className="w-full px-4 md:px-[64px] py-5 bg-[#6C4E31] rounded-lg 
            text-white font-cyrodiil text-base md:text-lg">
                <div className="w-full px-2 md:px-4">
                    <div className="py-2">
                        <label>Book</label>
                            <div className="mt-2 md:mt-4 flex items-center gap-2">
                                <span>{selectedBookId ? `ID: ${selectedBookId}` : "No book selected"}</span>
                            <button 
                                className="bg-white hover:bg-[#F2C078] duration-300 py-2 px-3 border-2 rounded-md text-black" 
                                onClick={() => setMunculBuku(true)}
                            >
                                Choose
                            </button>
                        </div>
                    </div>
                    <div className="py-2">
                        <label>Loan Date</label>
                        <input 
                            type="date" 
                            value={loan_date}
                            onChange={(e) => setLoan_date(e.target.value)}
                            className="w-full mt-2 py-2 px-3 border rounded-md text-black" 
                        />
                    </div>
                    <div className="py-2">
                        <label>Loan Duration</label>
                        <select 
                            value={durationWeeks ?? ""} 
                            onChange={(e) => setDurationWeeks(Number(e.target.value))}
                            className="w-full mt-2 py-2 px-3 border rounded-md text-black"
                        >
                            <option value="">Select duration</option>
                            <option value={1}>1 Week</option>
                            <option value={2}>2 Weeks</option>
                            <option value={3}>3 Weeks</option>
                            <option value={4}>4 Weeks</option>
                        </select>
                    </div>
                    <div className="py-2">
                        <label>Return Date</label>
                        <input 
                            type="date" 
                            value={return_date}
                            readOnly
                            className="w-full mt-2 py-2 px-3 border rounded-md bg-gray-200 cursor-not-allowed text-black" 
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
                            {loading ? "Saving..." : "Save Loan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {munculBuku && (
            <div className="fixed top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col 
            gap-4 bg-[#F2C078] w-[90%] md:w-[1000px] h-auto p-4 md:p-6 rounded-xl shadow-lg 
            overflow-y-auto max-h-[80vh] z-[999]">
                {books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((book) => (
                <div key={book.id} className="w-full md:flex md:items-center md:justify-between 
                border-2 md:border-4 rounded-md p-3 md:p-4">
                    <div className="flex flex-col md:flex-row md:gap-7">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                            <Image src={book.cover ? API + book.cover.url : "/idk"} alt={book.title} fill quality={100} className="object-contain"/>
                        </div>
                        <div className="text-sm md:text-lg font-cyrodiil">
                            <h1 className="font-semibold">
                                {book.title}
                            </h1>
                            <h2>
                                {book.categories?.[0]?.name ?? null}
                            </h2>
                            <h3>
                                by {book.writer}
                            </h3>
                            <div className="flex mt-2">
                            <button 
                                onClick={() => handleChooseBook(book)} 
                                className="bg-green-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base"
                                disabled={book.stock <= 0}
                                >
                                Choose
                            </button>
                            </div>
                        </div>
                    </div>
                    {book.stock === 0 ? (
                        <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white px-3 
                        md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
                            Unavailable
                        </div>
                        ) : (
                        <h1 className="mt-2 md:mt-0 md:ml-auto text-sm md:text-lg font-morrisroman">
                            Stok: {book.stock}
                        </h1>
                    )}
                </div>
                ))}
                <div className="flex">
                    <button onClick={() => setMunculBuku(false)} className="bg-[#F0F2BD] 
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