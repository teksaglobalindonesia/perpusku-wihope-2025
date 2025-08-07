'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoanListType } from '@/app/dashboard/loans/page';
import { BASE_URL, NAME, TOKEN } from '@/lib/api';
import { Loan, Pagination } from '@/type/api-response';

export const L_LoanList = ({ statusBukuItems = [], pagination }: LoanListType) => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredLoans, setFilteredLoans] = useState<Loan[]>(statusBukuItems);

    const [paginationMeta, setPaginationMeta] = useState<Pagination['pagination']>(
        pagination?.pagination || { page: 1, page_size: 5, total: 0, page_count: 1 }
    );

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const fetchBooks = async () => {
                const response = await fetch(
                    `${BASE_URL}/api/loan/list?page=${page}&page_size=${paginationMeta.page_size}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
                    }`,
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
                const { data, meta } = await response.json();
                setFilteredLoans(data || []);
                setPaginationMeta(meta?.pagination || {
                    page: 1,
                    page_size: paginationMeta.page_size,
                    total: 0,
                    page_count: 1,
                });
            };
            fetchBooks();
        }, 100);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, page, paginationMeta.page_size]);

    useEffect(() => {
        if (page > paginationMeta.page_count && paginationMeta.page_count > 0) {
            setPage(1);
        }
    }, [page, paginationMeta.page_count]);

    const paginationRange = () => {
        const delta = 2;
        const range: (number | string)[] = [1];
        const left = Math.max(2, page - delta);
        const right = Math.min(paginationMeta.page_count - 1, page + delta);

        if (paginationMeta.page_count <= 1) return range;

        if (left > 2) range.push('...');
        for (let i = left; i <= right; i++) range.push(i);
        if (right < paginationMeta.page_count - 1) range.push('...');
        if (paginationMeta.page_count > 1) range.push(paginationMeta.page_count);

        return range;
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const getButtonStyles = (isDisabled: boolean, isActive: boolean = false) => `
    px-4 py-2 border-2 text-sm font-bold tracking-wider transition-colors
    ${isDisabled
            ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
            : isActive
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black hover:bg-black hover:text-white'
        }`;

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16">
            <div className="mx-auto">
                {/* Search Section */}
                <div className="mb-12 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                            DAFTAR PEMINJAMAN
                        </h1>
                        <div className="inline-block bg-black text-white px-8 py-4 text-sm font-medium tracking-wider">
                            {filteredLoans.length === 0 ? 'EMPTY' : `${filteredLoans.length} ITEMS`}
                        </div>
                    </div>
                    <div className="w-full lg:max-w-md flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari peminjaman..."
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
                        <Link
                            href="/dashboard/loans/add"
                            className="bg-black text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-gray-800 transition-colors duration-300"
                        >
                            TAMBAH
                        </Link>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="space-y-8">
                    {filteredLoans.length > 0 ? (
                        filteredLoans.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="bg-white border-2 border-black hover:bg-gray-50 transition-colors duration-300">
                                <div className="p-8">
                                    <div className="sm:grid flex-col flex gap-8 sm:grid-cols-12 items-center">
                                        <div className="col-span-1 sm:col-span-9 space-y-3 text-center sm:text-left">
                                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">PEMINJAMAN</div>
                                            <h2 className="text-3xl font-bold text-black leading-tight">{item.book.title}</h2>
                                            <div className="text-lg text-gray-600 font-medium">Peminjam: {item.member.name}</div>
                                            <div className="text-lg text-gray-600 font-medium">Tanggal Peminjaman: {item.loan_date}</div>
                                            <div className="text-lg text-gray-600 font-medium">
                                                Tanggal Pengembalian: {item.return_date || 'Belum dikembalikan'}
                                            </div>
                                        </div>
                                        <div className="col-span-3 space-y-4">
                                            <div className="bg-black w-full text-white px-6 py-3 text-sm font-bold tracking-wider inline-block text-center">
                                                {item.return_date === null ? 'SEDANG DIPINJAM' : 'SUDAH DIKEMBALIKAN'}
                                            </div>
                                            <div className="flex flex-col w-full gap-2">
                                                <button
                                                    // onClick={() => handleReturn(item.id || 0)}
                                                    className="bg-white w-full text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300 text-center"
                                                >
                                                    KEMBALIKAN
                                                </button>
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
                                    PEMINJAMAN
                                </h2>
                                <p className="text-lg text-gray-600 font-medium">Tidak ada data peminjaman untuk ditampilkan</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {paginationMeta.page_count > 1 && (
                    <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            HALAMAN {paginationMeta.page} DARI {paginationMeta.page_count}
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={getButtonStyles(page === 1)}
                            >
                                SEBELUMNYA
                            </button>
                            <div className="flex flex-wrap items-center gap-1">
                                {paginationRange().map((pageNum, i) => (
                                    <button
                                        key={i}
                                        onClick={() => typeof pageNum === 'number' && setPage(pageNum)}
                                        disabled={pageNum === '...'}
                                        className={`w-10 h-10 ${getButtonStyles(pageNum === '...', pageNum === page)} ${pageNum === '...' && 'cursor-default'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setPage((p) => Math.min(paginationMeta.page_count, p + 1))}
                                disabled={page === paginationMeta.page_count}
                                className={getButtonStyles(page === paginationMeta.page_count)}
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