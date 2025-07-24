// UNTUK YANG INI LOGIC SAMA DATA LOOPINGNYA BUATNYA PAKE AI KARENA MASIH BELUM DAPET BUAT LOGICNYA


'use client';
import { useState } from 'react';
import Link from 'next/link';

const PinjamanALicia = [
    {
        title: 'Mengenal React',
        borrower: 'Alicia',
        borrowedAt: '2025-07-10',
        returnedAt: '2025-07-15',
        status: 1,
    },
    {
        title: 'Mengenal Next.js',
        borrower: 'Alicia',
        borrowedAt: '2025-07-10',
        returnedAt: '2025-07-15',
        status: 0,
    },
    {
        title: 'Mengenal JavaScript',
        borrower: 'Alicia',
        borrowedAt: '2025-07-10',
        returnedAt: '2025-07-15',
        status: 2,
    },
];

export type StatusBukuType = {
    statusBukuItems?: typeof PinjamanALicia;
    maxData?: number;
};

export const M_Peminjaman = ({ statusBukuItems = PinjamanALicia, maxData = 5, }: StatusBukuType) => {
    const [page, setPage] = useState<number>(1);
    const totalPages = Math.ceil(statusBukuItems.length / maxData);
    
    const paginatedData = statusBukuItems.slice(
        (page - 1) * maxData,
        page * maxData
    );

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    // const hitungDurasiHari = (start: string, end: string) => {
    //     const startDate = new Date(start);
    //     const endDate = new Date(end);
    //     const diffTime = endDate.getTime() - startDate.getTime();
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     return diffDays;
    // };

    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Peminjaman Alicia</h3>

            </div>

            {/* Data List */}
            {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3 mx-6 my-4">
                        <div className="px-6 py-4 flex flex-row justify-between items-center border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200">
                            {/* Informasi */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-base text-gray-600">
                                    Tanggal Peminjaman: {item.borrowedAt}
                                </p>
                                <p className="text-base text-gray-600">
                                    Tanggal Pengembalian: {item.returnedAt}
                                </p>
                                {/* <p className="text-base text-gray-600">
                                    Durasi Peminjaman:{' '}
                                    {hitungDurasiHari(item.borrowedAt, item.returnedAt)} hari
                                </p> */}

                                {(item.status === 0 || item.status === 2) && (
                                    <div className="flex flex-row gap-2 mt-2">
                                        <button
                                            className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                        >
                                            KEMBALIKAN
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <p
                                    className={`py-2 px-4 text-sm font-semibold rounded-full ${item.status === 0
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : item.status === 1
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {item.status === 0
                                        ? 'BELUM DIKEMBALIKAN'
                                        : item.status === 1
                                            ? 'DIKEMBALIKAN'
                                            : 'TERLAMBAT'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Tidak ada data peminjaman.
                </div>
            )}

            {/* Pagination */}
            <div className="flex gap-4 flex-row justify-center py-4 px-6 items-center border-t border-gray-200">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                    {page} / {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
