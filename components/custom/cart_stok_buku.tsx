'use client'

import Image from "next/image";
import Link from 'next/link';
import { useMemo, useState } from 'react';

export type cart1props = {
    items?: Array<{
        title?: string;
        genre?: string;
        penulis?: string;
        status?: boolean;
        coverBuku?: string;
    }>
}

export const Cartsatu = ({ items = [] }: cart1props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, items]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <div className="bg-[#edf0f1] mx-[100px] my-[50px] drop-shadow-lg rounded-lg pb-4">
                <div className=" grid grid-cols-3 px-5 py-5">
                    <h1 className="text-[24px] text-black font-medium">Stok buku</h1>
                    <div className="flex flex-row gap-2 justify justify-center">
                        <Link href="/peminjaman_buku" className="bg-[#0097B2] py-2 px-2 text-white rounded">Peminjaman Buku</Link>
                        <Link href="/pengembalian_buku" className="bg-[#E0B677] py-2 px-2 text-white rounded">Pengembalian Buku</Link>
                    </div>
                    <div className="flex items-center bg-[#ffffff] px-3 py-1 rounded text-black">
                        🔍
                        <input
                            type="text"
                            placeholder="Pencarian..."
                            className="ml-2 bg-transparent outline-none placeholder-black w-[150px]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 px-5 py-5">
                    {currentItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300 max-w-md w-full">
                            <div className="px-4 py-4 flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-3 items-center">
                                    <Image
                                        src={item.coverBuku || '/coverbook.jpg'}
                                        alt="booknovel"
                                        width={60}
                                        height={90}
                                        className="rounded-md object-cover"
                                    />
                                    <div className="flex flex-col justify-between h-full">
                                        <h1 className="text-lg font-semibold">{item.title}</h1>
                                        <p className="text-sm text-gray-500">{item.genre}</p>
                                        <p className="text-sm text-gray-500">{item.penulis}</p>
                                    </div>
                                </div>

                                {item.status ? (
                                    <div
                                        className="bg-[#F57373] px-3 py-1 rounded-md"
                                    >
                                        <h1 className="text-sm text-white font-medium">Habis</h1>
                                    </div>
                                ) : (
                                    <div
                                        className="bg-[#5bbd87] px-3 py-1 rounded-md"
                                    >
                                        <h1 className="text-sm text-white font-medium">Sedia</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-4 gap-2 text-black">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#5bbd87] text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );

};