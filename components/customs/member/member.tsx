"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchMember from "../search/search_member";
import Pagination from "../pagination/pagination";

interface Member {
    id: number;
    name: string;
    email: string;
    address: string;
    id_member: string;
    documentId: string
}

export default function ListAnggota({ members }: { members: any[]}){
    const [currentPage, setCurrentPage] = useState(1);
    const [munculPopup, setMunculPopup] = useState(false);
    const [filterMember, setFilterMember] = useState<Member[]>(members);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filterMember.length / itemsPerPage);
        
    useEffect(() => {
        setCurrentPage(1);
    }, [filterMember]);

    return(
        <>
        <div className="w-full bg-[#FFEAC5] mt-16 md:mt-[84px] px-4 md:px-[64px] py-6 md:py-[40px]">
            <div className="w-full px-2 md:px-3 py-3 md:py-5">
                <div className="md:flex md:items-center md:justify-between font-morrisroman">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        Members
                    </h1>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-3 md:mt-0">
                        <SearchMember onSearch={(result) => {
                            setFilterMember(result.length ? result : members)
                        }}/>
                        <Link href="/anggota/tambah_member" className="px-4 md:px-8 py-4 clip-custom text-sm 
                        md:text-lg font-cyrodiil text-white font-semibold bg-green-500 text-center hover:bg-green-800 duration-300">
                            Add
                        </Link>
                    </div>
                </div>
                {filterMember.length === 0 ? (
                    <div className="w-full text-center py-10">
                        <p className="text-xl md:text-2xl font-cyrodiil">
                            There is no members available right now
                        </p>
                    </div>
                ) : (
                    <>
                    {filterMember.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((member) => (
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
                                        <Link href={`/anggota/pinjaman_anggota/${member.documentId}`} 
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
                    </>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                />
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