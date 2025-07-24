'use client';
import { useState } from 'react';
import Link from 'next/link';
import { StatusBukuType } from './D_LoanBook';
import { StatusBuku } from '@/app/dashboard/page';

export const L_LoanList = ({ statusBukuItems = StatusBuku, maxData = 5 }: StatusBukuType) => {
    const [page, setPage] = useState<number>(1);

    // ✅ Filter hanya status 0 (belum dikembalikan) atau 2 (terlambat)
    const filteredItems = statusBukuItems.filter((item) => item.status === 0 || item.status === 2);
    const totalPages = Math.ceil(filteredItems.length / maxData);
    const paginatedData = filteredItems.slice((page - 1) * maxData, page * maxData);

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Peminjaman</h3>
                <div className="flex flex-row gap-5">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <Link
                        href="/dashboard/books/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                        Tambah Peminjaman
                    </Link>
                </div>
            </div>

            {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3 mx-6 my-4">
                        <div className="px-6 py-4 flex flex-row justify-between items-center border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-base text-gray-600">Peminjam: {item.borrower}</p>
                                <p className="text-base text-gray-600">Tanggal Peminjaman: {item.borrowedAt}</p>
                                <p className="text-base text-gray-600">Tanggal Pengembalian: {item.returnedAt}</p>
                                <div className="flex flex-row gap-2 mt-2">
                                    <button
                                        className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                    >
                                        KEMBALIKAN
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className={`py-2 px-4 text-sm font-semibold rounded-full ${
                                    item.status === 0
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : item.status === 1
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                }`}>
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

            <div className="flex gap-4 flex-row justify-center py-4 px-6 items-center border-t border-gray-200">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-sm text-gray-600 font-medium">{page} / {totalPages}</span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
