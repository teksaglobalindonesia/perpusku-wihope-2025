'use client'

import { useMemo, useState } from 'react';
import Link from 'next/link';

export type cart1props = {
    items?: Array<{
        title?: string;
        name?: string;
        createdAt?: string;
        actual_return_date?: string;
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
            <div className="bg-[#edf0f1] mx-4 sm:mx-6 md:mx-10 lg:mx-24 my-8 drop-shadow-lg rounded-lg pb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-6 gap-4">
                    <h1 className="text-xl sm:text-2xl text-black font-medium">Peminjam</h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center bg-white px-3 py-1 rounded text-black w-full sm:w-auto">
                            🔍
                            <input
                                type="text"
                                placeholder="Pencarian..."
                                className="ml-2 bg-transparent outline-none placeholder-black w-full sm:w-[150px]"
                            />
                        </div>
                        <Link href="/tambah_peminjam" className="bg-[#5bbd87] hover:bg-[#4a996d] px-4 py-2 rounded-sm transition text-white text-sm sm:text-base w-full sm:w-auto text-center">
                            Tambah
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 px-5">
                    {currentItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300">
                            <div className="p-5 flex flex-col justify-between h-full">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-lg font-medium">{item.title}</h1>
                                    <p className="text-sm">
                                        <strong>Peminjam:</strong>{" "}
                                        <span className="text-[#757575]">{item.name}</span>
                                    </p>
                                    <p className="text-sm">
                                        <strong>Peminjaman:</strong>{" "}
                                        <span className="text-[#757575]">{item.createdAt}</span>
                                    </p>
                                    <p className="text-sm">
                                        <strong>Pengembalian:</strong>{" "}
                                        <span className="text-[#757575]">{item.actual_return_date}</span>
                                    </p>
                                    {item.info && (
                                        <div className="mt-2">
                                            <span className="bg-[#5bbd87] px-3 py-1 rounded-md inline-block text-sm text-white font-medium">
                                                Kembalikan
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {item.status && (
                                    <div className="mt-4">
                                        <div className="bg-[#F57373] px-3 py-1 rounded-md inline-block">
                                            <span className="text-sm text-white font-medium">Terlambat</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center mt-6 gap-2 text-black">
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
        </>
    );
};
