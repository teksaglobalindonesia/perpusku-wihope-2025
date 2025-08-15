'use client';
import { useState, useEffect } from 'react';
import { BASE_URL, NAME, TOKEN } from '@/lib/api';

// Interfaces
interface Pagination {
    pagination: {
        page: number;
        page_size: number;
        total: number;
        page_count: number;
    };
}

interface Cover {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
    name: string;
    width: number;
    height: number;
}

interface Category {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
}

interface Book {
    id: number;
    documentId: string;
    title: string;
    writer: string;
    publisher: string;
    published_year: string;
    stock: number;
    createdAt: string;
    cover: Cover;
    categories?: Category[]; 
}

interface Member {
    id: number;
    documentId: string;
    name: string;
    email: string;
    address: string;
    id_member: string;
    createdAt: string;
}

interface Loan {
    id: number;
    documentId: string;
    book: Book;
    member: Member;
    loan_date: string;
    return_date: string;
    createdAt: string;
}

export const R_AddReturn = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [actualReturnDate, setActualReturnDate] = useState<string>(
        new Date().toISOString().split('T')[0]
    );
    const [loans, setLoans] = useState<Loan[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [paginationMeta, setPaginationMeta] = useState<Pagination['pagination']>({
        page: 1,
        page_size: 5,
        total: 0,
        page_count: 1,
    });
    const itemsPerPage = 5;

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [modalOpen]);

    // Helper functions for pagination
    const getButtonStyles = (isDisabled: boolean, isActive: boolean = false) => `
        px-4 py-2 border-2 text-sm font-bold tracking-wider transition-colors
        ${isDisabled ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed' :
            isActive ? 'bg-black text-white border-black' :
                'bg-white text-black border-black hover:bg-black hover:text-white'}
    `;

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

    // Fetch loaned books
    useEffect(() => {
        const fetchLoans = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch(`${BASE_URL}/api/loan/list?status=loaned&page=${page}&page_size=${itemsPerPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: TOKEN,
                        'x-wihope-name': NAME,
                    },
                    cache: 'no-store',
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Failed to fetch loans: ${res.status} ${res.statusText} - ${errorText}`);
                }

                const { data, meta }: { data: Loan[]; meta: Pagination } = await res.json();
                console.log('Loans response:', data);
                setLoans(data);
                setPaginationMeta(meta.pagination);
                if (data.length === 0) {
                    setError('No loaned books available');
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching loans';
                console.error('Fetch loans error:', err);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoans();
    }, [page]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        if (!selectedLoan || !actualReturnDate) {
            setError('Please select a loan and specify the actual return date');
            setIsSubmitting(false);
            return;
        }

        // Validate return date is not before loan date
        if (selectedLoan && new Date(actualReturnDate) < new Date(selectedLoan.loan_date)) {
            setError('Actual return date cannot be earlier than the loan date');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/return/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                body: JSON.stringify({
                    data: {
                        loan: selectedLoan.documentId,
                        actual_return_date: actualReturnDate,
                    },
                }),
                cache: 'no-store',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add return: ${response.status} ${response.statusText} - ${errorText}`);
            }

            setSuccess(true);
            setSelectedLoan(null);
            setActualReturnDate(new Date().toISOString().split('T')[0]);
            setPage(1);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while adding return';
            console.error('Submit return error:', err);
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRetryFetch = () => {
        setError(null);
        setPage(1);
    };

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16">
            <div className="mx-auto">
                {/* Header Section */}
                <div className="mb-12 w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                        TAMBAH PENGEMBALIAN
                    </h1>
                </div>

                {/* Form Section */}
                <div className="bg-white border-2 border-black p-8">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 flex justify-between items-center">
                            <span>{error}</span>
                            {error.includes('No loaned books available') && (
                                <button
                                    onClick={handleRetryFetch}
                                    className="bg-black text-white px-4 py-2 text-sm font-bold tracking-wider hover:bg-gray-800"
                                >
                                    RETRY
                                </button>
                            )}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700">
                            Return added successfully!
                        </div>
                    )}
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="loan"
                                    className="text-sm font-medium text-gray-700 uppercase tracking-wider"
                                >
                                    Peminjaman
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                    disabled={isSubmitting}
                                    className={`w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none text-left ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'
                                        } transition-colors duration-300`}
                                >
                                    {selectedLoan ? `${selectedLoan.book.title} - ${selectedLoan.member.name}` : 'Pilih Peminjaman'}
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="actualReturnDate"
                                    className="text-sm font-medium text-gray-700 uppercase tracking-wider"
                                >
                                    Tanggal Pengembalian
                                </label>
                                <input
                                    type="date"
                                    id="actualReturnDate"
                                    value={actualReturnDate}
                                    onChange={(e) => setActualReturnDate(e.target.value)}
                                    disabled={isSubmitting}
                                    required
                                    className={`w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-black">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-black text-white px-8 py-3 text-sm font-bold tracking-wider transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? 'SAVING...' : 'SIMPAN PENGEMBALIAN'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white border-2 border-black shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center border-b border-black px-6 py-4 bg-gray-50">
                            <h2 className="text-lg font-medium text-gray-800 uppercase tracking-wider">
                                PILIH PEMINJAMAN
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-400 hover:text-red-500 text-xl transition-all"
                            >
                                ×
                            </button>
                        </div>

                        <div className="overflow-y-auto px-6 py-4 space-y-4">
                            {isLoading ? (
                                <p className="text-sm text-gray-500 text-center">Loading...</p>
                            ) : loans.length === 0 ? (
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">No loaned books available</p>
                                    <button
                                        onClick={handleRetryFetch}
                                        className="mt-2 bg-black text-white px-4 py-2 text-sm font-bold tracking-wider hover:bg-gray-800"
                                    >
                                        RETRY
                                    </button>
                                </div>
                            ) : (
                                loans.map((item) => (
                                    <div
                                        key={item.documentId}
                                        className="border-2 border-black p-4 flex gap-6 items-center hover:bg-gray-100 transition"
                                    >
                                       
                                        <div className="flex flex-col gap-2 flex-1">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{item.book.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.book.categories && item.book.categories.length > 0
                                                        ? item.book.categories.map((cat) => cat.name).join(', ')
                                                        : 'No categories'}
                                                </p>
                                                <p className="text-sm text-gray-500">Peminjam: {item.member.name}</p>
                                                <p className="text-sm text-gray-500">Tanggal Pinjam: {new Date(item.loan_date).toLocaleDateString()}</p>
                                                <p className="text-sm text-gray-500">Tanggal Kembali: {new Date(item.return_date).toLocaleDateString()}</p>
                                            </div>
                                            <button
                                                className="bg-white text-black px-4 py-2 text-sm font-bold tracking-wider hover:bg-black hover:text-white border-2 border-black transition-colors duration-300"
                                                onClick={() => {
                                                    setSelectedLoan(item);
                                                    setModalOpen(false);
                                                }}
                                            >
                                                PILIH
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {paginationMeta.page_count > 1 && (
                            <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-black px-6 py-4 bg-gray-50">
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
                    </div>
                </div>
            )}
        </div>
    );
};