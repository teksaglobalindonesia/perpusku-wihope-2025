'use client'

import { useMemo, useState } from 'react';
import Link from 'next/link';

export type cart1props = {
    items?: Array<{
        title?: string;
        nama?: string;
        Peminjaman?: string;
        Pengembalian?: string;
        status?: boolean;
        info?: boolean;
    }>
}

export const Pinjamya = ({ items = [] }: cart1props) => {

const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

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
                <div className="flex justify-between items-center px-6 py-6">
                    <h1 className="text-[24px] text-black font-medium">Peminjam</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#ffffff] px-3 py-1 rounded text-black">
                            🔍
                            <input
                                type="text"
                                placeholder="Pencarian..."
                                className="ml-2 bg-transparent outline-none placeholder-black w-[150px]"
                            />
                        </div>
                        <Link href="/tambah_peminjam" className="bg-[#5bbd87] hover:bg-[#4a996d] px-4 py-2 rounded-sm transition text-white">
                            Tambah
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 px-5 py-5">
                    {currentItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300">
                            <div className="px-[19px] py-[19px] flex flex-row justify-between">
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-col fle">
                                        <h1 className="text-[24px] font-medium">{item.title}</h1>
                                        <h1 className="flex flex-row gap-2">Peminjam:<span className="text-[#757575]">{item.nama}</span></h1>
                                        <h1 className="flex flex-row gap-2">Peminjaman:<span className="text-[#757575]">{item.Peminjaman}</span></h1>
                                        <h1 className="flex flex-row gap-2">Pengembalian:<span className="text-[#757575]">{item.Pengembalian}</span></h1>
                                        <div className="py-3">
                                            {item.info ? (
                                                <div className="bg-[#5bbd87] px-3 py-1 rounded-md inline-block">
                                                <span className="text-sm text-white font-medium">Kembalikan</span>
                                            </div>
                                            ) : (
                                                <div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {item.status ? (
                                                <div className="bg-[#F57373] px-3 py-1 rounded-md inline-block">
                                                <span className="text-sm text-white font-medium">Terlambat</span>
                                            </div>
                                            ) : (
                                                <div>

                                                </div>
                                            )}
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