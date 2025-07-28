'use client'
import { useMemo, useState } from 'react';

export type cart1props = {
    items?: Array<{
        title?: string;
        Peminjaman?: string;
        Pengembalian?: string;
        status?: number;
        info?: boolean;
    }>
}

export const Angopin = ({ items = [] }: cart1props) => {

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
                <div className=" grid grid-cols-3 px-5 py-5">
                    <h1 className="text-[24px] text-black font-medium">Peminjaman Anggota</h1>
                </div>
                <div className="grid grid-cols-3 gap-4 px-5 py-5">
                     {currentItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300">
                            <div className="px-[19px] py-[19px] flex flex-row justify-between">
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-col fle">
                                        <h1 className="text-[24px] font-medium">{item.title}</h1>
                                        <h1 className="flex flex-row gap-2">Peminjaman:<span className="text-[#757575]">{item.Peminjaman}</span></h1>
                                        <h1 className="flex flex-row gap-2">Pengembalian:<span className="text-[#757575]">{item.Pengembalian}</span></h1>
                                        <div className="py-3">
                                            {item.info ? (
                                                <div className="bg-[#dfe29c] px-3 py-1 rounded-md inline-block">
                                                <span className="text-sm text-black">Kembalikan</span>
                                            </div>
                                            ) : (
                                                <div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {item.status === undefined ? null : (
                                        item.status === 1 ? (
                                            <div className="bg-[#F57373] px-3 py-1 rounded-md inline-block">
                                                <span className="text-sm text-white font-medium">Terlambat</span>
                                            </div>
                                        ) : item.status === 2 ? (
                                            <div className="bg-[#5bbd87] px-3 py-1 rounded-md">
                                                <h1 className="text-sm text-white font-medium">Dikembalikan</h1>
                                            </div>
                                        ) : (
                                            <div className="bg-[#5db5bc] px-3 py-1 rounded-md">
                                                <h1 className="text-sm text-white font-medium">Dipinjam</h1>
                                            </div>
                                        )
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