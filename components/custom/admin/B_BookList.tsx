'use client';
import { BookListType } from '@/app/dashboard/books/page';
import { BASE_URL } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const B_BookList = ({ bookListItems = [], maxData = 5 }: BookListType) => {
    const [page, setPage] = useState<number>(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDeleteTitle, setBookToDeleteTitle] = useState<string | null>(null);
    const [bookToDeleteId, setBookToDeleteId] = useState<number | null>(null);

    const totalPages = Math.ceil(bookListItems.length / maxData);
    const paginatedData = bookListItems.slice((page - 1) * maxData, page * maxData);

    // Range pagination dengan ellipsis
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

    const handleEdit = (id: number) => {
        console.log("EDIT item pada produk:", id);
    };

    const handleDelete = (id: number) => {
        const book = bookListItems.find((b) => b.id === id);
        if (book) {
            setBookToDeleteTitle(book.title || null);
            setBookToDeleteId(book.id || null);
            setShowDeleteModal(true);
        }
    };

    const confirmDelete = () => {
        if (bookToDeleteId !== null) {
            console.log("MENGHAPUS buku ID:", bookToDeleteId);
        }
        setShowDeleteModal(false);
        setBookToDeleteId(null);
        setBookToDeleteTitle(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setBookToDeleteId(null);
        setBookToDeleteTitle(null);
    };

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16">
            <div className="mx-auto">
                {/* Search Section */}
                <div className="mb-12 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Kiri: Judul */}
                    <div className="flex-1">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                            DAFTAR BUKU
                        </h1>
                        <div className="inline-block bg-black text-white px-8 py-4 text-sm font-medium tracking-wider">
                            {bookListItems.length === 0 ? 'EMPTY' : `${bookListItems.length} ITEMS`}
                        </div>
                    </div>

                    {/* Kanan: Pencarian dan Tombol Tambah */}
                    <div className="w-full lg:max-w-md flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari buku..."
                                className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/books/add"
                            className="bg-black text-white px-8 py-4 text-sm font-bold tracking-wider hover:bg-gray-800 transition-colors duration-300"
                        >
                            TAMBAH
                        </Link>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="space-y-8">
                    {paginatedData.length > 0 ? (
                        paginatedData.map((item) => (
                            <div key={item.id} className="bg-white border-2 border-black hover:bg-gray-50 transition-colors duration-300">
                                <div className="p-8">
                                    <div className="sm:grid sm:grid-cols-12 gap-8 items-center">
                                        {/* Book Image */}
                                        <div className="col-span-1 sm:col-span-2 flex justify-center sm:justify-start">
                                            <div className="w-full max-w-[150px] aspect-[3/4] bg-gray-100 border-2 border-black overflow-hidden">
                                                <Image
                                                    src={item.cover?.url ? `${BASE_URL}${item.cover.url}` : "/default-book.png"}
                                                    alt={item.title}
                                                    width={150}
                                                    height={200}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* Book Information */}
                                        <div className="col-span-1 sm:col-span-7 space-y-3 text-center sm:text-left py-5">
                                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                {item.categories[0]?.name}
                                            </div>
                                            <h2 className="text-3xl font-bold text-black leading-tight">
                                                {item.title}
                                            </h2>
                                            <div className="text-lg text-gray-600 font-medium">
                                                {item.writer}
                                            </div>
                                        </div>

                                        {/* Status and Actions */}
                                        <div className="col-span-3 space-y-4">
                                            <div className="bg-black text-white border-2 px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300 text-center">
                                                {item.stock === 0 ? 'HABIS' : `${item.stock} TERSEDIA`}
                                            </div>
                                            <div className="flex flex-row sm:flex-col gap-2">
                                                <Link
                                                    href="/dashboard/books/edit"
                                                    // href={`/dashboard/books/edit/${item.id}`}
                                                    className="bg-white w-full text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300 text-center"
                                                >
                                                    <button onClick={() => handleEdit(item.id || 0)}>EDIT</button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id || 0)}
                                                    className="bg-white w-full text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                                                >
                                                    HAPUS
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
                                    BUKU
                                </h2>
                                <p className="text-lg text-gray-600 font-medium">
                                    Tidak ada buku untuk ditampilkan
                                </p>
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
                                className={`px-4 py-2 border-2 text-sm font-bold tracking-wider transition-colors ${page === 1
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
                                        className={`w-10 h-10 border-2 text-sm font-bold transition-colors ${pageNum === page
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
                                className={`px-4 py-2 border-2 text-sm font-bold tracking-wider transition-colors ${page === totalPages
                                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                    : 'bg-white text-black border-black hover:bg-black hover:text-white'
                                    }`}
                            >
                                SELANJUTNYA
                            </button>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                        <div className="flex flex-col w-[500px] max-w-[90vw] bg-white border-2 border-black-xl shadow-lg items-center justify-center gap-4 px-6 py-6">
                            <div className="text-xl font-semibold text-black text-center">
                                Apakah yakin ingin menghapus <span className="text-red-500">{bookToDeleteTitle}</span>?
                            </div>
                            <div className="flex flex-row gap-4">
                                <button
                                    onClick={cancelDelete}
                                    className="px-8 py-3 bg-white text-black border-2 border-black text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                                >
                                    BATAL
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-8 py-3 bg-black text-white border-2 border-black text-sm font-bold tracking-wider hover:bg-red-500 hover:border-red-500 transition-colors duration-300"
                                >
                                    HAPUS
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};