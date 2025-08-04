'use client';
import { useState, useEffect } from 'react';
import { BASE_URL, NAME, TOKEN } from '@/lib/api';
import { StatusBukuType } from '@/app/dashboard/page';
import { ReturnRecord } from '@/type/api-response';

export const D_ReturnBooks = ({ maxData = 2 }: StatusBukuType) => {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredReturn, setFilteredReturn] = useState<ReturnRecord[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const fetchReturns = async () => {
                setError(null);
                try {
                    const response = await fetch(
                        `${BASE_URL}/api/return/list${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`,
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: TOKEN,
                                'x-wihope-name': NAME,
                            },
                            cache: 'no-store',
                        }
                    );
                    if (!response.ok) {
                        throw new Error('Failed to fetch returns');
                    }
                    const { data } = await response.json();
                    setFilteredReturn(data || []);
                } catch (error: any) {
                    console.error('Error fetching returns:', error.message);
                    setFilteredReturn([]);
                    setError('Gagal mengambil data pengembalian');
                }
            };

            fetchReturns();
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const totalPages = Math.ceil(filteredReturn.length / maxData);
    const paginatedData = filteredReturn.slice((page - 1) * maxData, page * maxData);

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(1);
        }
    }, [page, totalPages]);

    const paginationRange = () => {
        const delta = 2;
        const range: (number | string)[] = [];
        const left = Math.max(2, page - delta);
        const right = Math.min(totalPages - 1, page + delta);

        for (let i = left; i <= right; i++) {
            range.push(i);
        }
        if (left > 2) range.unshift('...');
        if (right < totalPages - 1) range.push('...');
        range.unshift(1);
        if (totalPages > 1) range.push(totalPages);
        return range;
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const getStatusLabel = (returnDate: string, actualReturnDate: string | null) => {
        if (!actualReturnDate) return 'BELUM DIKEMBALIKAN';
        return returnDate <= actualReturnDate ? 'TEPAT WAKTU' : 'TERLAMBAT';
    };

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 py-16">
            <div className="mx-auto">
                {/* Search Section */}
                <div className="mb-12 w-full flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                            PENGEMBALIAN HARI INI
                        </h1>
                        <div className="inline-block bg-black text-white px-8 py-4 text-sm font-medium tracking-wider">
                            {filteredReturn.length === 0 ? 'EMPTY' : `${filteredReturn.length} ITEMS`}
                        </div>
                    </div>
                    <div className="w-full sm:max-w-md relative">
                        <input
                            type="text"
                            placeholder="Cari pengembalian..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="space-y-8">
                    {error ? (
                        <div className="text-center text-lg text-red-500">{error}</div>
                    ) : paginatedData.length > 0 ? (
                        paginatedData.map((item: ReturnRecord, index: number) => (
                            <div key={index} className="bg-white border-2 border-black hover:bg-gray-50 transition-colors duration-300">
                                <div className="p-8">
                                    <div className="sm:grid flex-col flex gap-8 sm:grid-cols-12 sm:items-center">
                                        <div className="sm:col-span-9 space-y-3 text-center sm:text-left">
                                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                PENGEMBALIAN
                                            </div>
                                            <h2 className="text-3xl font-bold text-black leading-tight">{item.book.title}</h2>
                                            <div className="text-lg text-gray-600 font-medium">Peminjam: {item.member.name}</div>
                                            <div className="text-lg text-gray-600 font-medium">Tanggal Peminjaman: {item.loan_date}</div>
                                            <div className="text-lg text-gray-600 font-medium">
                                                Tanggal Pengembalian: {item.return.actual_return_date || 'Belum dikembalikan'}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3 flex flex-row justify-end space-y-4">
                                            <div className="bg-black text-center max-sm:w-full text-white px-6 py-3 text-sm font-bold tracking-wider inline-block">
                                                DIKEMBALIKAN
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white border-2 border-black">
                            <div className="p-16 text-center">
                                <h2 className="text-4xl font-bold text-black mb-4">
                                    TIDAK ADA<br />
                                    PENGEMBALIAN
                                </h2>
                                <p className="text-lg text-gray-600 font-medium">Tidak ada data pengembalian untuk ditampilkan</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            HALAMAN {page} DARI {totalPages}
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`px-4 py-2 border-2 text-sm font-bold tracking-wider transition-colors ${
                                    page === 1
                                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                        : 'bg-white text-black border-black hover:bg-black hover:text-white'
                                }`}
                            >
                                SEBELUMNYA
                            </button>
                            <div className="flex flex-wrap items-center gap-1">
                                {paginationRange().map((pageNum, i) => (
                                    <button
                                        key={i}
                                        onClick={() => typeof pageNum === 'number' && setPage(pageNum)}
                                        disabled={pageNum === '...'}
                                        className={`w-10 h-10 border-2 text-sm font-bold transition-colors ${
                                            pageNum === page
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-black hover:bg-black hover:text-white'
                                        } ${pageNum === '...' && 'cursor-default'}`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`px-4 py-2 border-2 text-sm font-bold tracking-wider transition-colors ${
                                    page === totalPages
                                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                        : 'bg-white text-black border-black hover:bg-black hover:text-white'
                                }`}
                            >
                                SELANJUTNYA
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};