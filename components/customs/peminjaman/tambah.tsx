"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "../pagination/pagination";
import { addLoans } from "@/lib/api";

interface Book {
    id: number;
    documentId: string;
    title: string;
    cover?: { url: string };
    categories?: { name: string }[];
    writer: string;
    stock: number;
}

interface Member {
    id: number;
    name: string;
    email: string;
    address: string;
    id_member: string;
    documentId: string
}

export default function TambahLoan({ books, members}: {books: any[], members: any[] }){
    const API = "https://cms-perpusku.widhimp.my.id";
    const [munculBuku, setMunculBuku] = useState(false);
    const [munculMember, setMunculMember] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterBook, setFilterBook] = useState<Book[]>(books);
    const [filterMember, setFilterMember] = useState<Member[]>(members);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [loan_date, setLoan_date] = useState("");
    const [durationWeeks, setDurationWeeks] = useState<number | null>(null);
    const [return_date, setReturn_date] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 
    const [popupMessage, setPopupMessage] = useState("");

    const itemsPerPage = 3;

    const totalPages = Math.ceil(filterBook.length / itemsPerPage);
    const totalPages2 = Math.ceil(filterMember.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterBook, filterMember])

    const handleChooseBook = (book: any) => {
        setSelectedBookId(book.documentId); 
        setMunculBuku(false);
    };

    const handleChooseMember = (member: any) => {
        setSelectedMemberId(member.documentId);
        setMunculMember(false); 
    };

    useEffect(() => {
        if (loan_date && durationWeeks) {
            const startDate = new Date(loan_date);
            startDate.setDate(startDate.getDate() + durationWeeks * 7);
            setReturn_date(startDate.toISOString().split("T")[0]);
        }
    }, [loan_date, durationWeeks]);

    async function handleSave() {
    try {
        if (!selectedBookId || !selectedMemberId || !loan_date || !return_date) {
            setPopupMessage("Please select a book, member, and specify dates!");
            setShowPopup(true);
            return;
        }

        setLoading(true);
        const payload = { 
            book: selectedBookId,
            member: selectedMemberId,
            loan_date,
            return_date
        };
        console.log("Data dikirim:", payload);

        const res = await addLoans(payload);
        console.log("Respon API:", res);

        setPopupMessage("Loan successfully added!");
        setShowPopup(true);

    } catch (err) {
        console.error("Error:", err);
        setPopupMessage(err instanceof Error ? err.message : "Loan failed to add!");
        setShowPopup(true);
    } finally {
        setLoading(false);
    }
}

function handlePopupClose() {
    setShowPopup(false);
    setSelectedBookId(null);
    setSelectedMemberId(null);
    setLoan_date("");
    setDurationWeeks(null); 
    setReturn_date("");
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
                        <label>Member</label>
                        <div className="mt-2 md:mt-4 flex items-center gap-2">
                            <span>{selectedMemberId ? `ID: ${selectedMemberId}` : "No member selected"}</span>
                            <button 
                                className="bg-white hover:bg-[#F2C078] duration-300 py-2 px-3 border-2 rounded-md text-black" 
                                onClick={() => setMunculMember(true)}
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

        {munculMember && (
            <div className="fixed top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex 
            flex-col gap-4 bg-[#F2C078] w-[90%] md:w-[1000px] h-auto p-4 md:p-6 rounded-xl shadow-lg 
            overflow-y-auto max-h-[80vh] z-[999]">
                {members.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((member) => (
                <div key={member.id} className="w-full md:flex md:items-center md:justify-between 
                border-2 md:border-4 rounded-md p-3 md:p-4">
                    <div className="flex flex-col md:flex-row md:gap-7">
                        <div className="text-sm md:text-lg font-cyrodiil">
                            <h1 className="font-semibold line-clamp-1 md:line-clamp-none">
                                {member.name}
                            </h1>
                            <h2 className="line-clamp-1 md:line-clamp-none">
                                {member.id_member}
                            </h2>
                            <h3 className="line-clamp-1 md:line-clamp-none">
                                {member.email}
                            </h3>
                            <div className="flex mt-2">
                                <button 
                                    onClick={() => handleChooseMember(member)} 
                                    className="bg-green-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base"
                                >
                                    Choose
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                <div className="flex">
                    <button onClick={() => setMunculMember(false)} className="bg-[#F0F2BD] 
                    hover:bg-[#4B352A] hover:text-white duration-300 text-black py-2 px-4 
                    clip-custom text-center">
                            ← Back
                    </button>
                </div>
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages2}
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