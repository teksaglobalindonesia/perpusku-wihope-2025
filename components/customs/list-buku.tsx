"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const books = [
        {
            id: 1,
            title: "The Lusty Argonian Maid v.1",
            category: "Comedy",
            author: "Crassius Curio",
            image: "/image/Lusty Argonian.png",
            stock: 2
        },

        {
            id: 2,
            title: "The Last King of the Ayleids",
            category: "History",
            author: "Herminia Cinna",
            image: "/image/Last King Aylieds.png",
            stock: 1
        },

        {
            id: 3,
            title: "Mixed Unit Tactics",
            category: "History",
            author: "Codus Callonus",
            image: "/image/Mixed Unit.jpg",
            stock: 0
        },

        {
            id: 4,
            title: "The Rise and Fall of the Blades",
            category: "History",
            author: "Anonymous",
            image: "/image/Rise blades book.png",
            stock: 0
        },

        {
            id: 5,
            title: "Incident at Necrom",
            category: "Mystery",
            author: "Jonquilla Bothe",
            image: "/image/illusion_skil_book.png",
            stock: 5
        },

        {
            id: 6,
            title: "Oghma Infinium",
            category: "Arcane",
            author: "Xarxes",
            image: "/image/OghmaInfinium.png",
            stock: 1
        },

        {
            id: 7,
            title: "The Ransom of Zarek",
            category: "Drama",
            author: "Marobar Sul",
            image: "/image/RansomZarek.png",
            stock: 8
        },

        {
            id: 8,
            title: "The Red Kitchen Reader",
            category: "Cooking",
            author: "Simocles Quo",
            image: "/image/RansomZarek.png",
            stock: 6
        },

        {
            id: 9,
            title: "Thief",
            category: "Drama",
            author: "Reven",
            image: "/image/Last King Aylieds.png",
            stock: 2
        },

        {
            id: 10,
            title: "Withershins",
            category: "Comedy",
            author: "Yaqut Tawashi",
            image: "/image/Restoration.png",
            stock: 9
        },
    ]

export default function ListBuku(){
    const [currentPage, setCurrentPage] = useState(1);
    const [munculPopup, setMunculPopup] = useState(false);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(books.length / itemsPerPage);

    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniBooks = books.slice(mulaiIndex, akhirIndex);

    const handleprev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handlenext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] px-4 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full px-2 md:px-3 py-3 md:py-5">
                <div className="md:flex md:items-center md:justify-between font-morrisroman">
                    <h1 className="text-2xl md:text-3xl font-semibold">Books</h1>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
                        <button className="px-4 md:px-8 border-2 md:border-4 rounded-md text-sm md:text-lg">Search...</button>
                        <Link href="/buku/tambah_buku" className="px-4 md:px-8 py-2 clip-custom text-sm md:text-lg font-cyrodiil text-white font-semibold bg-green-500 text-center">
                            Add
                        </Link>
                    </div>
                </div>
                {saatiniBooks.map((book) => (
                    <div key={book.id} className="w-full md:flex md:items-center md:justify-between border-2 md:border-4 rounded-md p-3 md:p-4 mt-3 md:mt-5">
                        <div className="flex flex-col md:flex-row md:gap-7">
                            <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                                <Image src={book.image} alt={book.title} fill quality={100} className="object-contain" />
                            </div>
                            <div className="text-sm md:text-lg font-cyrodiil">
                                <h1 className="font-semibold md:line-clamp-none line-clamp-1">{book.title}</h1>
                                <h2 className="md:line-clamp-none line-clamp-1">{book.category}</h2>
                                <h3 className="md:line-clamp-none line-clamp-1">by {book.author}</h3>
                                <div className="flex gap-2 md:gap-3 mt-2">
                                    <Link href="/buku/edit_buku" className="bg-yellow-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base">Edit</Link>
                                    <button className="bg-red-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base" onClick={() => setMunculPopup(true)}>Delete</button>
                                </div>
                            </div>
                        </div>
                        {book.stock === 0 ? (
                            <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
                                Unavailable
                            </div>
                        ) : (
                            <h1 className="mt-2 md:mt-0 md:ml-auto text-sm md:text-lg font-morrisroman">Stok: {book.stock}</h1>
                        )}
                    </div>
                ))}
                <div className="flex items-center justify-center gap-1 md:gap-2 font-morrisroman text-sm md:text-xl mt-3 md:mt-4">
                    <button onClick={handleprev} disabled={currentPage === 1} className="px-2 md:px-3 py-1 border rounded text-xs md:text-base">←</button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-2 md:px-3 py-1 border rounded text-xs md:text-base ${currentPage === index + 1 ? "bg-green-400" : ""}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={handlenext} disabled={currentPage === totalPages} className="px-2 md:px-3 py-1 border rounded text-xs md:text-base">→</button>
                </div>
            </div>
        </div>

        {munculPopup && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F2C078] w-[90%] md:w-[500px] h-auto md:h-[142px] p-4 md:p-0 rounded-xl shadow-lg">
                <div className="w-full md:w-64 font-cyrodiil">
                    <h1 className="text-lg md:text-xl text-center md:text-left">Are you sure you want to delete this book?</h1>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center md:justify-start mt-4 text-base md:text-lg">
                        <button className="bg-red-500 px-4 md:px-8 py-2 clip-custom">DELETE</button>
                        <button className="border-2 rounded-md px-3 py-2" onClick={() => setMunculPopup(false)}>CANCEL</button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}