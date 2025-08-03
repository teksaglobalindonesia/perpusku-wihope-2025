'use client'

import { useMemo, useState } from 'react';

export type cart1props = {
    items?: Array<{
        title?: string;
        name?: string;
        createdAt?: string;
        returnDate?: string;
        status?: boolean;
        actualReturnDate?: string;
    }>
}

export const Kembaliya = ({ items = [] }: cart1props) => {
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
                    <h1 className="text-xl sm:text-2xl text-black font-medium">Pengembalian</h1>
                    <div className="flex items-center bg-white px-3 py-1 rounded text-black w-full sm:w-auto">
                        🔍
                        <input
                            type="text"
                            placeholder="Pencarian..."
                            className="ml-2 bg-transparent outline-none placeholder-black w-full sm:w-[150px]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 px-5">
                    {currentItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300">
                            <div className="p-5 flex flex-col justify-between h-full">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                    <p className="text-sm text-gray-700">Peminjam: {item.name}</p>
                                    <p className="text-sm">Tanggal Pinjam: {item.createdAt}</p>
                                    <p className="text-sm">Batas Kembali: {item.returnDate}</p>
                                    <p className="text-sm">Tanggal Kembali: {item.actualReturnDate}</p>
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
