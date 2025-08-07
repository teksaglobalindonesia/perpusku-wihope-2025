'use client';
import { useState, useEffect } from 'react';
import { BASE_URL, NAME, TOKEN } from '@/lib/api';
import { Loan, Pagination } from '@/type/api-response';
import { UserType } from '@/app/dashboard/members/page';

export const M_Peminjaman = ({ id_member, statusBukuItems = [], pagination }: UserType) => {
    const [page, setPage] = useState<number>(pagination?.pagination.page || 1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<Loan[]>(statusBukuItems);
    const [showReturnModal, setShowReturnModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Loan | null>(null);
    const [paginationMeta, setPaginationMeta] = useState<Pagination['pagination']>(
        pagination?.pagination || { page: 1, page_size: 5, total: 0, page_count: 1 }
    );

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const fetchLoans = async () => {
                try {
                    const queryParams = new URLSearchParams({
                        page: page.toString(),
                        page_size: paginationMeta.page_size.toString(),
                        ...(id_member && { id_member }),
                        ...(searchQuery && { search: encodeURIComponent(searchQuery) }),
                    });
                    const response = await fetch(
                        `${BASE_URL}/api/loan/list?${queryParams}`,
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
                    if (response.ok) {
                        const { data, meta } = await response.json();
                        setFilteredItems(data || []);
                        setPaginationMeta(meta?.pagination || {
                            page: 1,
                            page_size: 5,
                            total: data?.length || 0,
                            page_count: Math.ceil((meta?.pagination?.total || 0) / (meta?.pagination?.page_size || 5)),
                        });
                    } else {
                        console.error('Failed to fetch loans:', response.statusText);
                        setFilteredItems([]);
                        setPaginationMeta({
                            page: 1,
                            page_size: 5,
                            total: 0,
                            page_count: 1,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching loans:', error);
                    setFilteredItems([]);
                    setPaginationMeta({
                        page: 1,
                        page_size: 5,
                        total: 0,
                        page_count: 1,
                    });
                }
            };
            fetchLoans();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, page, id_member, paginationMeta.page_size]);

    useEffect(() => {
        if (page > paginationMeta.page_count && paginationMeta.page_count > 0) {
            setPage(paginationMeta.page_count);
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
        }
    `;

    const getLoanStatus = (loan: Loan) => {
        const today = new Date().toISOString().split('T')[0];
        const returnDate = loan.return_date;
        if (loan.return) {
            return { status: 1, label: 'SUDAH DIKEMBALIKAN' };
        } else if (returnDate < today) {
            return { status: 2, label: 'TERLAMBAT' };
        } else {
            return { status: 0, label: 'SEDANG DIPINJAM' };
        }
    };

    const handleReturn = (item: Loan) => {
        setSelectedItem(item);
        setShowReturnModal(true);
    };

    const confirmReturn = () => {
        setShowReturnModal(false);
        setSelectedItem(null);
    };

    const cancelReturn = () => {
        setShowReturnModal(false);
        setSelectedItem(null);
    };

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16">
            <div className="mx-auto">
                {/* Search Section */}
                <div className="mb-12 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                            PEMINJAMAN {filteredItems[0]?.member.name || 'ANGGOTA'}
                        </h1>
                        <div className="inline-block bg-black text-white px-8 py-4 text-sm font-medium tracking-wider">
                            {paginationMeta.total === 0 ? 'EMPTY' : `${paginationMeta.total} ITEMS`}
                        </div>
                    </div>
                    <div className="w-full lg:max-w-md flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari judul buku..."
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
                </div>

                {/* Content Grid */}
                <div className="space-y-8">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => {
                            const { status, label } = getLoanStatus(item);
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white border-2 border-black hover:bg-gray-50 transition-colors duration-300"
                                >
                                    <div className="p-8">
                                        <div className="sm:grid flex-col flex gap-8 sm:grid-cols-12 items-center">
                                            <div className="col-span-1 sm:col-span-9 space-y-3 text-center sm:text-left">
                                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">PEMINJAMAN</div>
                                                <h2 className="text-3xl font-bold text-black leading-tight">{item.book.title}</h2>
                                                <div className="text-lg text-gray-600 font-medium">Peminjam: {item.member.name}</div>
                                                <div className="text-lg text-gray-600 font-medium">Tanggal Peminjaman: {item.loan_date}</div>
                                                <div className="text-lg text-gray-600 font-medium">
                                                    Tanggal Pengembalian: {item.return_date}
                                                </div>
                                            </div>
                                            <div className="col-span-3 space-y-4">
                                                <div className="bg-black w-full text-white px-6 py-3 text-sm font-bold tracking-wider inline-block text-center">
                                                    {label}
                                                </div>
                                                {status !== 1 && (
                                                    <div className="flex flex-col w-full gap-2">
                                                        <button
                                                            onClick={() => handleReturn(item)}
                                                            className="bg-white w-full text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300 text-center"
                                                        >
                                                            KEMBALIKAN
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="bg-white border-2 border-black">
                            <div className="p-16 text-center">
                                <h2 className="text-4xl font-bold text-black mb-4">
                                    TIDAK ADA<br />
                                    DATA PEMINJAMAN
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
                                        className={`w-10 h-10 ${getButtonStyles(pageNum === '...', pageNum === page)} ${pageNum === '...' && 'cursor-default'}`}
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

                {/* Return Modal */}
                {showReturnModal && selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                        <div className="flex flex-col w-[500px] max-w-[90vw] bg-white border-2 border-black shadow-lg items-center justify-center gap-4 px-6 py-6">
                            <div className="text-xl font-semibold text-black text-center">
                                Apakah yakin ingin mengembalikan buku <span className="text-blue-500">{selectedItem.book.title}</span>?
                            </div>
                            <div className="flex flex-row gap-4">
                                <button
                                    onClick={cancelReturn}
                                    className="px-8 py-3 bg-white text-black border-2 border-black text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                                >
                                    BATAL
                                </button>
                                <button
                                    onClick={confirmReturn}
                                    className="px-8 py-3 bg-black text-white border-2 border-black text-sm font-bold tracking-wider hover:bg-blue-500 hover:border-blue-500 transition-colors duration-300"
                                >
                                    KEMBALIKAN
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};