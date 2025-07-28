'use client'
import { useState } from 'react';

export type StatusBukuType = {
    statusBukuItems?: Array<{
        title: string;
        borrower: string;
        borrowedAt: string;
        returnedAt: string;
        actualReturnedAt: string;
        status: number;
    }>;
    maxData?: number;
}

export const D_LoanBooks = ({ statusBukuItems = [], maxData = 2 }: StatusBukuType) => {
    const [page, setPage] = useState<number>(1);
    const bookStock = statusBukuItems.filter((item) => item.status === 0); //ini filter buat status buku, 0 = dipinjam dan 1 = dikembalikan
    const totalPages = Math.ceil(bookStock.length / maxData);
    const paginatedData = bookStock.slice((page - 1) * maxData, page * maxData);

    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Peminjaman Hari Ini</h3>
                <div className="relative">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-64 h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <svg className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            {/* Display */}
            {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3 mx-6 my-4">
                        <div className="px-6 py-4 flex flex-row justify-between items-center border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200">
                            {/* Informasi Buku */}
                            <div className="flex flex-row items-center gap-6">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                                        <p className="text-base text-gray-600">Peminjam: {item.borrower}</p>
                                        <p className="text-base text-gray-600">Tanggal Peminjaman: {item.borrowedAt}</p>
                                        <p className="text-base text-gray-600">Tanggal Pengembalian: {item.returnedAt}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Status Buku */}
                            {/* matiin dl karena ga diminta */}
                            <div>
                                {/* <p className="py-2 px-4 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                    {item.status === 0 ? 'DIPINJAM' : `DIKEMBALIKAN`}
                                </p> */}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Tidak ada data peminjaman untuk ditampilkan
                </div>
            )}
            {/* Pagination */}
            <div className="flex justify-center gap-4 py-4 px-6 border-t items-center">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                >
                    Prev
                </button>
                <span className="text-sm text-gray-600 font-medium">{page} / {totalPages}</span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}