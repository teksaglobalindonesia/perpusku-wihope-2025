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
        <div className="bg-[#edf0f1] mx-4 md:mx-[60px] my-[30px] drop-shadow-lg rounded-lg pb-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-10 py-5">
                <h1 className="text-[20px] md:text-[24px] text-black font-medium">Peminjaman buku</h1>

                <div className="flex flex-wrap gap-2 justify-center md:justify-center">
                    <Link href="/stok_buku" className="bg-[#86C56B] py-2 px-3 text-white rounded text-sm md:text-base">Stok Buku</Link>
                    <Link href="/pengembalian_buku" className="bg-[#E0B677] py-2 px-3 text-white rounded text-sm md:text-base">Pengembalian Buku</Link>
                </div>

                <div className="flex items-center bg-white px-3 py-2 rounded text-black w-full md:w-auto">
                    🔍
                    <input
                        type="text"
                        placeholder="Pencarian..."
                        className="ml-2 bg-transparent outline-none placeholder-black w-full md:w-[150px]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-10 py-5">
                {currentItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300 w-full">
                        <div className="px-4 py-4 flex flex-col gap-2">
                            <h1 className="text-[20px] font-medium">{item.title}</h1>
                            <p className="flex flex-row gap-1 text-sm">Peminjam: <span className="text-[#757575]">{item.Peminjam}</span></p>
                            <p className="flex flex-row gap-1 text-sm">Peminjaman: <span className="text-[#757575]">{item.Peminjaman}</span></p>
                            <p className="flex flex-row gap-1 text-sm">Pengembalian: <span className="text-[#757575]">{item.Pengembalian}</span></p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-4 gap-2 text-black flex-wrap px-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                >
                    &lt;
                </button>
                {[...Array(2)].map((_, index) => {
                    const page = currentPage + index;
                    if (page > totalPages) return null;
                    return (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${currentPage === page
                                ? "bg-[#5bbd87] text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};
