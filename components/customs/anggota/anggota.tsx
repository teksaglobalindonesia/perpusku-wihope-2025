"use client";

import Link from "next/link";
import { useState } from "react";

export const members = [
    {
        id: 1,
        name: "I Nyoman Triadi Swastika",
        email: "triadiswas31@gmail.com",
        nim: 7156
    },

    {
        id: 2,
        name: "I Putu Surya Widiana",
        email: "suryawidi19@gmail.com",
        nim: 7157
    },

    {
        id: 3,
        name: "I Made Samuel Ulung Prasetya",
        email: "samuelprasetya777@gmail.com",
        nim: 7158
    },

    {
        id: 4,
        name: "Putu Siwi Novianti",
        email: "siwi28@gmail.com",
        nim: 7159
    },

    {
        id: 5,
        name: "Daniel Rainhard",
        email: "daniel4@gmail.com",
        nim: 7160
    },

    {
        id: 6,
        name: "Devon Manggala Putra",
        email: "manggala318@gmail.com",
        nim: 7161
    },

    {
        id: 7,
        name: "I Gusti Ngurah Agung Aby Pradivta Permana",
        email: "Gungby10@gmail.com",
        nim: 7162
    },
    {
        id: 8,
        name: "Ulfric Stormcloak",
        email: "Skyrimfornords11@gmail.com",
        nim: 7163
    },

    {
        id: 9,
        name: "Tullius Merrilus",
        email: "Fortheempire@gmail.com",
        nim: 7164
    },

    {
        id: 10,
        name: "Fenris Herald",
        email: "huntingground28@gmail.com",
        nim: 7165
    }
]

export default function ListAnggota({ members }: { members: any[]}){
    const [currentPage, setCurrentPage] = useState(1);
    const [munculPopup, setMunculPopup] = useState(false);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(members.length / itemsPerPage);
        
    const mulaiIndex = (currentPage - 1) * itemsPerPage;
    const akhirIndex = mulaiIndex + itemsPerPage;
    const saatiniMember = members.slice(mulaiIndex, akhirIndex);
        
    const handleprev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
        
    const handlenext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    return(
        <>
        <div className="w-full bg-[#FFEAC5] mt-16 md:mt-[84px] px-4 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full px-2 md:px-3 py-3 md:py-5">
                <div className="md:flex md:items-center md:justify-between font-morrisroman">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        Members
                    </h1>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
                        <button className="px-4 md:px-8 border-2 md:border-4 rounded-md text-sm md:text-lg">
                            Search...
                        </button>
                        <Link href="/anggota/tambah_member" className="px-4 md:px-8 py-2 clip-custom text-sm 
                        md:text-lg font-cyrodiil text-white font-semibold bg-green-500 text-center">
                            Add
                        </Link>
                    </div>
                </div>
                {saatiniMember.map((member) => (
                    <div key={member.id} className="w-full border-2 md:border-4 
                    rounded-md p-3 md:p-4 mt-3 md:mt-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
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
                                <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
                                    <Link href={`/anggota/pinjaman_member?id=${member.id}`} 
                                    className="bg-blue-500 px-4 py-1 md:px-8 clip-custom text-xs md:text-base">
                                        Borrowing
                                    </Link>
                                    <Link href="/anggota/edit_member" className="bg-yellow-400 px-4 py-1 
                                    md:px-8 clip-custom text-xs md:text-base">
                                        Edit
                                    </Link>
                                    <button className="bg-red-400 px-4 py-1 md:px-8 clip-custom text-xs 
                                    md:text-base" onClick={() => setMunculPopup(true)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
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

        {munculPopup && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex 
            items-center justify-center bg-[#F2C078] w-[90%] md:w-[500px] h-auto md:h-[142px] p-4 
            md:p-0 rounded-xl shadow-lg">
                <div className="w-full md:w-64 font-cyrodiil">
                    <h1 className="text-lg md:text-xl text-center md:text-left">
                        Are you sure you want to delete this member?
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center 
                    md:justify-start mt-4 text-base md:text-lg">
                        <button className="bg-red-500 px-4 md:px-8 py-2 clip-custom">
                            DELETE
                        </button>
                        <button className="border-2 rounded-md px-3 py-2 md:px-4 md:py-0" 
                        onClick={() => setMunculPopup(false)}>
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}