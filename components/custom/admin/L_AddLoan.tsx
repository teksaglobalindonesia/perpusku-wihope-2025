'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BASE_URL, NAME, TOKEN } from '@/lib/api';

// Interfaces (unchanged)
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
    categories: Category[];
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

export const L_AddLoan = () => {
    const [modalOpen, setModalOpen] = useState<'book' | 'member' | null>(null);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [borrowDate, setBorrowDate] = useState('');
    const [duration, setDuration] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [paginationMetaBook, setPaginationMetaBook] = useState<Pagination['pagination']>({
        page: 1,
        page_size: 5,
        total: 0,
        page_count: 1,
    });
    const [paginationMetaMember, setPaginationMetaMember] = useState<Pagination['pagination']>({
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

        // Cleanup to restore scrolling when component unmounts or modal closes
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [modalOpen]);

    // Helper functions for pagination (unchanged)
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
        const right = Math.min(paginationMetaBook.page_count - 1, page + delta);

        if (paginationMetaBook.page_count <= 1) return range;

        if (left > 2) range.push('...');
        for (let i = left; i <= right; i++) range.push(i);
        if (right < paginationMetaBook.page_count - 1) range.push('...');
        if (paginationMetaBook.page_count > 1) range.push(paginationMetaBook.page_count);

        return range;
    };

    const paginationRangeMember = () => {
        const delta = 2;
        const range: (number | string)[] = [1];
        const left = Math.max(2, page - delta);
        const right = Math.min(paginationMetaMember.page_count - 1, page + delta);

        if (paginationMetaMember.page_count <= 1) return range;

        if (left > 2) range.push('...');
        for (let i = left; i <= right; i++) range.push(i);
        if (right < paginationMetaMember.page_count - 1) range.push('...');
        if (paginationMetaMember.page_count > 1) range.push(paginationMetaMember.page_count);

        return range;
    };

    // Fetch books and members (unchanged)
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/book/list?page=${page}&page_size=${itemsPerPage}`, {
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
                    throw new Error(`Failed to fetch books: ${res.status} ${res.statusText} - ${errorText}`);
                }

                const { data, meta }: { data: Book[]; meta: Pagination } = await res.json();
                console.log('Books response:', data);
                data.forEach(book => console.log('Cover URL:', book.cover?.url));
                const availableBooks = data.filter(book => book.stock > 0);
                setBooks(availableBooks);
                setPaginationMetaBook(meta.pagination);
                if (availableBooks.length === 0) {
                    setError('No books available with stock');
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching books';
                console.error('Fetch books error:', err);
                setError(errorMessage);
            }
        };

        const fetchMembers = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/member/list?page=${page}&page_size=${itemsPerPage}`, {
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
                    throw new Error(`Failed to fetch members: ${res.status} ${res.statusText} - ${errorText}`);
                }

                const { data, meta }: { data: Member[]; meta: Pagination } = await res.json();
                console.log('Members response:', data);
                setMembers(data);
                setPaginationMetaMember(meta.pagination);
                if (data.length === 0) {
                    setError('No members available');
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching members';
                console.error('Fetch members error:', err);
                setError(errorMessage);
            }
        };

        fetchBooks();
        fetchMembers();
    }, [page]);

    const calculateReturnDate = (borrowDate: string, duration: string) => {
        if (!borrowDate || !duration) return '';
        const date = new Date(borrowDate);
        if (duration === '1 Minggu') {
            date.setDate(date.getDate() + 7);
        } else if (duration === '1 Bulan') {
            date.setMonth(date.getMonth() + 1);
        }
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        if (!selectedBook || !selectedMember || !borrowDate || !duration) {
            setError('Please fill all required fields');
            setIsSubmitting(false);
            return;
        }

        try {
            const returnDate = calculateReturnDate(borrowDate, duration);
            const response = await fetch(`${BASE_URL}/api/loan/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: TOKEN,
                    'x-wihope-name': NAME,
                },
                body: JSON.stringify({
                    data: {
                        member: selectedMember.documentId,
                        book: selectedBook.documentId,
                        loan_date: borrowDate,
                        return_date: returnDate,
                    },
                }),
                cache: 'no-store',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add loan: ${response.status} ${response.statusText} - ${errorText}`);
            }

            setSuccess(true);
            setSelectedBook(null);
            setSelectedMember(null);
            setBorrowDate('');
            setDuration('');
            setPage(1);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred while adding loan';
            console.error('Submit loan error:', err);
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
                {/* Header Section (unchanged) */}
                <div className="mb-12 w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                        TAMBAH PEMINJAMAN
                    </h1>
                </div>

                {/* Form Section (unchanged) */}
                <div className="bg-white border-2 border-black p-8">
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 flex justify-between items-center">
                            <span>{error}</span>
                            {(error.includes('No books available') || error.includes('No members available')) && (
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
                            Loan added successfully!
                        </div>
                    )}
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="book"
                                    className="text-sm font-medium text-gray-700 uppercase tracking-wider"
                                >
                                    Buku
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen('book')}
                                    disabled={isSubmitting}
                                    className={`w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none text-left ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'
                                        } transition-colors duration-300`}
                                >
                                    {selectedBook ? selectedBook.title : 'Pilih Buku'}
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="member"
                                    className="text-sm font-medium text-gray-700 uppercase tracking-wider"
                                >
                                    Anggota
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen('member')}
                                    disabled={isSubmitting}
                                    className={`w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none text-left ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'
                                        } transition-colors duration-300`}
                                >
                                    {selectedMember ? selectedMember.name : 'Pilih Anggota'}
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="borrowDate"
                                    className="text-sm font-medium text-gray-700 uppercase tracking-wider"
                                >
                                    Tanggal Pinjam
                                </label>
                                <input
                                    type="date"
                                    id="borrowDate"
                                    value={borrowDate}
                                    onChange={(e) => setBorrowDate(e.target.value)}
                                    disabled={isSubmitting}
                                    required
                                    className={`w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="duration"
                                    className="text-sm font-medium text-gray-700 uppercase tracking-wider"
                                >
                                    Durasi
                                </label>
                                <select
                                    id="duration"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    disabled={isSubmitting}
                                    required
                                    className={`w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    <option value="">Pilih Durasi</option>
                                    <option value="1 Minggu">1 Minggu</option>
                                    <option value="1 Bulan">1 Bulan</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-black">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-black text-white px-8 py-3 text-sm font-bold tracking-wider transition-colors duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? 'SAVING...' : 'SIMPAN PEMINJAMAN'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {modalOpen === 'book' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white border-2 border-black shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center border-b border-black px-6 py-4 bg-gray-50">
                            <h2 className="text-lg font-medium text-gray-800 uppercase tracking-wider">
                                PILIH BUKU
                            </h2>
                            <button
                                onClick={() => setModalOpen(null)}
                                className="text-gray-400 hover:text-red-500 text-xl transition-all"
                            >
                                ×
                            </button>
                        </div>

                        <div className="overflow-y-auto px-6 py-4 space-y-4">
                            {isSubmitting ? (
                                <p className="text-sm text-gray-500 text-center">Loading...</p>
                            ) : books.length === 0 ? (
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">No books available</p>
                                    <button
                                        onClick={handleRetryFetch}
                                        className="mt-2 bg-black text-white px-4 py-2 text-sm font-bold tracking-wider hover:bg-gray-800"
                                    >
                                        RETRY
                                    </button>
                                </div>
                            ) : (
                                books.map((item) => (
                                    <div
                                        key={item.documentId}
                                        className="border-2 border-black p-4 flex gap-6 items-center hover:bg-gray-100 transition"
                                    >
                                        <Image
                                            src={item.cover?.url ? `${BASE_URL}${item.cover.url}` : '/default-book.png'}
                                            alt={item.cover?.alternativeText || item.title}
                                            width={100}
                                            height={140}
                                            className="object-cover w-24 h-36 border border-black"
                                        />
                                        <div className="flex flex-col gap-2 flex-1">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.categories.map((cat) => cat.name).join(', ')}
                                                </p>
                                                <p className="text-sm text-gray-500">{item.writer}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 w-fit">
                                                    {item.stock} TERSEDIA
                                                </p>
                                                <button
                                                    className="bg-white text-black px-4 py-2 text-sm font-bold tracking-wider hover:bg-black hover:text-white border-2 border-black transition-colors duration-300"
                                                    onClick={() => {
                                                        setSelectedBook(item);
                                                        setModalOpen(null);
                                                    }}
                                                >
                                                    PILIH
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {paginationMetaBook.page_count > 1 && (
                            <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-black px-6 py-4 bg-gray-50">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    HALAMAN {paginationMetaBook.page} DARI {paginationMetaBook.page_count}
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
                                        onClick={() => setPage((p) => Math.min(paginationMetaBook.page_count, p + 1))}
                                        disabled={page === paginationMetaBook.page_count}
                                        className={getButtonStyles(page === paginationMetaBook.page_count)}
                                    >
                                        SELANJUTNYA
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {modalOpen === 'member' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white border-2 border-black shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center border-b border-black px-6 py-4 bg-gray-50">
                            <h2 className="text-lg font-medium text-gray-800 uppercase tracking-wider">
                                PILIH ANGGOTA
                            </h2>
                            <button
                                onClick={() => setModalOpen(null)}
                                className="text-gray-400 hover:text-red-500 text-xl transition-all"
                            >
                                ×
                            </button>
                        </div>

                        <div className="overflow-y-auto px-6 py-4 space-y-4">
                            {isSubmitting ? (
                                <p className="text-sm text-gray-500 text-center">Loading...</p>
                            ) : members.length === 0 ? (
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">No members available</p>
                                    <button
                                        onClick={handleRetryFetch}
                                        className="mt-2 bg-black text-white px-4 py-2 text-sm font-bold tracking-wider hover:bg-gray-800"
                                    >
                                        RETRY
                                    </button>
                                </div>
                            ) : (
                                members.map((item) => (
                                    <div
                                        key={item.documentId}
                                        className="border-2 border-black p-4 flex gap-6 items-center hover:bg-gray-100 transition"
                                    >
                                        <div className="flex flex-col gap-2 flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.id_member}</p>
                                            <p className="text-sm text-gray-500">{item.email}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedMember(item);
                                                setModalOpen(null);
                                            }}
                                            className="bg-white text-black px-4 py-2 text-sm font-bold tracking-wider hover:bg-black hover:text-white border-2 border-black transition-colors duration-300"
                                        >
                                            PILIH
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {paginationMetaMember.page_count > 1 && (
                            <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-black px-6 py-4 bg-gray-50">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    HALAMAN {paginationMetaMember.page} DARI {paginationMetaMember.page_count}
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
                                        {paginationRangeMember().map((pageNum, i) => (
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
                                        onClick={() => setPage((p) => Math.min(paginationMetaMember.page_count, p + 1))}
                                        disabled={page === paginationMetaMember.page_count}
                                        className={getButtonStyles(page === paginationMetaMember.page_count)}
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