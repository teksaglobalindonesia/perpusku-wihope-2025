"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { books } from "@/components/customs/list-buku";
import { members } from "./list-anggota";

export default function TambahPemjmn(){
    const [munculBuku, setMunculBuku] = useState(false);
    const [munculMember, setMunculMember] = useState(false);

    return(
        <>
        <div className="w-full px-4 md:px-[64px] mt-16 md:mt-[84px] bg-[#FFEAC5] pb-6">
            <div className="w-full flex justify-center items-center py-6 md:py-8">
                <h1 className="font-morrisroman text-2xl md:text-3xl font-semibold text-center">
                    Add a New Borrowing
                </h1>
            </div>
            <div className="w-full px-4 md:px-[64px] py-5 bg-[#6C4E31] rounded-lg text-white font-cyrodiil text-base md:text-lg">
                <div className="w-full px-2 md:px-4">
                    <div className="py-2">
                        <label>Book</label>
                        <button className="bg-white hover:bg-[#F2C078] duration-300 w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black" onClick={() => setMunculBuku(true)}>
                            Choose
                        </button>
                    </div>
                    <div className="py-2">
                        <label>Member</label>
                        <button onClick={() => setMunculMember(true)} className="bg-white hover:bg-[#F2C078] duration-300 w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black">
                            Choose
                        </button>
                    </div>
                    <div className="py-2">
                        <label>Borrowing Date</label>
                        <input 
                            type="date" 
                            className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black" 
                        />
                    </div>
                    <div className="py-2">
                        <label>Borrowing Duration</label>
                        <select className="w-full mt-2 md:mt-4 py-2 px-3 border-2 rounded-md text-black">
                            <option value="" defaultValue={0}></option>
                            <option value="1 minggu">1 Week</option>
                            <option value="2 minggu">2 Week</option>
                            <option value="3 minggu">3 Week</option>
                            <option value="4 minggu">4 Week</option>
                        </select>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 py-4">
                        <Link 
                            href="/peminjaman" 
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom text-center"
                        >
                            ← Back
                        </Link>
                        <button 
                            className="bg-[#F0F2BD] hover:bg-[#F2C078] duration-300 text-black py-2 px-4 clip-custom"
                        >
                            Save Borrowing
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {munculBuku && (
            <div className="fixed top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-[#F2C078] w-[90%] md:w-[1000px] h-auto p-4 md:p-6 rounded-xl shadow-lg overflow-y-auto max-h-[80vh] z-[999]">
                {books.map((book) => (
                <div key={book.id} className="w-full md:flex md:items-center md:justify-between border-2 md:border-4 rounded-md p-3 md:p-4">
                    <div className="flex flex-col md:flex-row md:gap-7">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-0">
                        <Image 
                        src={book.image ?? "/placeholder.png"} 
                        alt={book.title ?? "Book image"} 
                        fill 
                        quality={100} 
                        className="object-contain" 
                        />
                    </div>
                    <div className="text-sm md:text-lg font-cyrodiil">
                        <h1 className="font-semibold">{book.title}</h1>
                        <h2>{book.category}</h2>
                        <h3>by {book.author}</h3>
                        <div className="flex mt-2">
                        <button className="bg-green-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base">
                            Choose
                        </button>
                        </div>
                    </div>
                    </div>
                    {book.stock === 0 ? (
                    <div className="mt-2 md:mt-0 md:ml-auto bg-red-600 text-white px-3 md:px-4 py-1 md:py-2 clip-custom text-sm md:text-lg font-cyrodiil w-full md:w-auto text-center">
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
                    <button onClick={() => setMunculBuku(false)} className="bg-[#F0F2BD] hover:bg-[#4B352A] hover:text-white duration-300 text-black py-2 px-4 clip-custom text-center">
                            ← Back
                    </button>
                </div>
            </div>
        )}

        {munculMember && (
            <div className="fixed top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-[#F2C078] w-[90%] md:w-[1000px] h-auto p-4 md:p-6 rounded-xl shadow-lg overflow-y-auto max-h-[80vh] z-[999]">
                {members.map((member) => (
                <div key={member.id} className="w-full md:flex md:items-center md:justify-between border-2 md:border-4 rounded-md p-3 md:p-4">
                    <div className="flex flex-col md:flex-row md:gap-7">
                    <div className="text-sm md:text-lg font-cyrodiil">
                        <h1 className="font-semibold line-clamp-1 md:line-clamp-none">{member.name}</h1>
                        <h2 className="line-clamp-1 md:line-clamp-none">{member.nim}</h2>
                        <h3 className="line-clamp-1 md:line-clamp-none">{member.email}</h3>
                        <div className="flex mt-2">
                        <button className="bg-green-400 px-4 py-1 md:px-8 clip-custom text-xs md:text-base">
                            Choose
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
                <div className="flex">
                    <button onClick={() => setMunculMember(false)} className="bg-[#F0F2BD] hover:bg-[#4B352A] hover:text-white duration-300 text-black py-2 px-4 clip-custom text-center">
                            ← Back
                    </button>
                </div>
            </div>
        )}
        </>
    )
}