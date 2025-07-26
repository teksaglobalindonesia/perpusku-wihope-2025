'use client'

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type cart1props = {
    items?: Array<{
        title?: string;
        Peminjam?: string;
        Peminjaman?: string;
        Pengembalian?: string;
    }>
}

export const Cartdua = ({ items = [] }: cart1props) => {

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
                    <h1 className="text-[24px] text-black font-medium">Peminjaman buku</h1>
                    <div className="flex flex-row gap-2 justify justify-center">
                        <Link href="/stok_buku" className="bg-[#86C56B] py-2 px-2 text-white rounded">Stok Buku</Link>
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
                        <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300">
                            <div className="px-[19px] py-[19px] flex flex-row justify-between">
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-col fle">
                                        <h1 className="text-[24px] font-medium">{item.title}</h1>
                                        <h1 className="flex flex-row gap-2">Peminjam:<span className="text-[#757575]">{item.Peminjam}</span></h1>
                                        <h1 className="flex flex-row gap-2">Peminjaman:<span className="text-[#757575]">{item.Peminjaman}</span></h1>
                                        <h1 className="flex flex-row gap-2">Pengembalian:<span className="text-[#757575]">{item.Pengembalian}</span></h1>
                                    </div>
                                </div>
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