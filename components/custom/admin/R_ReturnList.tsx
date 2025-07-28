'use client';
import { useState, useMemo } from 'react';
import { StatusBukuType } from './D_LoanBook';
import { StatusBuku } from '@/app/dashboard/page';

export const R_ReturnList = ({ statusBukuItems = StatusBuku, maxData = 5 }: StatusBukuType) => {
    const [page, setPage] = useState(1);

    const filteredItems = useMemo(() => {
        return statusBukuItems.filter((item) => item.status === 1 || item.status === 2);
    }, [statusBukuItems]);

    const totalPages = Math.ceil(filteredItems.length / maxData);
    const paginatedData = filteredItems.slice((page - 1) * maxData, page * maxData);

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0: return 'BELUM DIKEMBALIKAN';
            case 1: return 'DIKEMBALIKAN';
            case 2: return 'TERLAMBAT';
            default: return 'UNKNOWN';
        }
    };

    const getStatusClass = (status: number) => {
        switch (status) {
            case 0: return 'bg-yellow-100 text-yellow-800';
            case 1: return 'bg-green-100 text-green-800';
            case 2: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Peminjaman</h3>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="mx-6 my-4">
                        <div className="px-6 py-4 flex justify-between items-center border rounded-md hover:shadow-lg transition-shadow">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-base text-gray-600">Peminjam: {item.borrower}</p>
                                <p className="text-base text-gray-600">Tanggal Peminjaman: {item.borrowedAt}</p>
                                <p className="text-base text-gray-600">Tanggal Pengembalian: {item.returnedAt}</p>
                                <p className="text-base text-gray-600">Tanggal Pengembalian Aktual: {item.actualReturnedAt}</p>
                            </div>
                            <p className={`py-2 px-4 text-sm font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                {getStatusLabel(item.status)}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Tidak ada data peminjaman.
                </div>
            )}

            <div className="flex justify-center gap-4 py-4 px-6 border-t">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                        page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                >
                    Prev
                </button>
                <span className="text-sm text-gray-600 font-medium">{page} / {totalPages}</span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                        page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
