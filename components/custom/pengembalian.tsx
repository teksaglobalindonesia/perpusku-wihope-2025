'use client'

import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { useEffect, useState } from 'react';

export type pengembali = {
    title?: string;
    name?: string;
    createdAt?: string;
    returnDate?: string;
    status?: boolean;
    actualReturnDate?: string;

}

export const Kembaliya = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState<pengembali[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchQuery = encodeURIComponent(searchTerm);
                const res = await fetch(`${BASE_URL}/api/return/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: TOKEN,
                        'x-wihope-name': WIHOPE_NAME,
                    },
                    cache: 'no-store',
                });

                const resultJson = await res.json();
                const mapped = resultJson?.data?.map((item: any): pengembali => {
                    const actualReturnDate = item?.return?.actual_return_date;
                    const expectedReturnDate = item?.return_date;

                    const isLate =
                        actualReturnDate &&
                        expectedReturnDate &&
                        new Date(actualReturnDate) > new Date(expectedReturnDate);

                    return {
                        title: item?.book?.title,
                        name: item?.member?.name,
                        createdAt: item?.loan_date,
                        returnDate: expectedReturnDate,
                        actualReturnDate: actualReturnDate || "-",
                        status: isLate || false,
                    };
                });

                setItems(mapped || []);

                const pagination = resultJson?.meta?.pagination;

                if (pagination?.page_count) {
                    setTotalPages(pagination.page_count);
                } else if (pagination?.total && pagination?.page_size) {
                    setTotalPages(Math.ceil(pagination.total / pagination.page_size));
                }

            } catch (error) {
                console.error('Gagal mengambil data:', error);
            }
        };

        fetchData();
    }, [searchTerm, currentPage]);

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
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="ml-2 bg-transparent outline-none placeholder-black w-full sm:w-[150px]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6 px-5">
                    {items.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300">
                            <div className="p-5 flex flex-col justify-between h-full">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                    <p className="text-sm">
                                        <strong>Peminjam:</strong>{" "}
                                        <span className="text-[#757575]">{item.name}</span></p>

                                    <p className="text-sm">
                                        <strong>Tanggal Pinjam:</strong>{" "}
                                        <span className="text-[#757575]">{item.createdAt}</span></p>

                                    <p className="text-sm">
                                        <strong>Batas Kembali:</strong>{" "}
                                        <span className="text-[#757575]">{item.returnDate}</span> </p>

                                    <p className="text-sm">
                                        <strong>Tanggal Kembali:</strong>{" "}
                                        <span className="text-[#757575]">{item.actualReturnDate}</span></p>
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

                <div className="flex justify-center gap-2 mt-6 flex-wrap px-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                    >
                        &lt;
                    </button>

                    {[...Array(3)].map((_, index) => {
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
