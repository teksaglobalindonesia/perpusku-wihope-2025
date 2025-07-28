'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type BookListType = {
    bookListItems?: Array<{
        id: number;
        title: string;
        genre: string;
        author: string;
        image: string;
        stock: number;
    }>;
    maxData?: number;
};

export const B_BookList = ({ bookListItems = [], maxData = 5 }: BookListType) => {
    const [page, setPage] = useState<number>(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDeleteTitle, setBookToDeleteTitle] = useState<string | null>(null);
    const [bookToDeleteId, setBookToDeleteId] = useState<number | null>(null);

    const totalPages = Math.ceil(bookListItems.length / maxData);
    const paginatedData = bookListItems.slice((page - 1) * maxData, page * maxData);

    // INI CUMA LOG KE CONSOLE BUAT MEMUDAHKAN SAYA DALAM DEBUGING
    const handleEdit = (id: number) => {
        console.log("EDIT item pada produk:", id);
    };

    const handleDelete = (id: number) => {
        const book = bookListItems.find((b) => b.id === id);
        if (book) {
            setBookToDeleteTitle(book.title);
            setBookToDeleteId(book.id);
            setShowDeleteModal(true);
        }
    };
    // INI CUMA LOG KE CONSOLE BUAT MEMUDAHKAN SAYA DALAM DEBUGING
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
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Book List</h3>
                <div className="flex flex-row gap-5">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-64 h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <Link href="/dashboard/books/add" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md">
                        Tambah Buku
                    </Link>
                </div>
            </div>

            {/* Display */}
            {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3 mx-6 my-4">
                        {/* Card */}
                        <div className="px-6 py-4 flex flex-row justify-between items-center border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200">
                            {/* Informasi Buku */}
                            <div className="flex flex-row items-center gap-6">
                                {/* Image */}
                                <div>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={128}
                                        height={176}
                                        className="w-32 h-44 object-cover rounded-md"
                                    />
                                </div>
                                {/* Informasi */}
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                                        <p className="text-base text-gray-600">{item.genre}</p>
                                        <p className="text-base text-gray-500">{item.author}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <Link href="/dashboard/books/edit" className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md">
                                            <button onClick={() => handleEdit(item.id)}>EDIT</button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                        >
                                            HAPUS
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Status Buku */}
                            <div>
                                <p
                                    className={`py-2 px-4 text-sm font-medium rounded-full ${item.stock === 0
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {item.stock === 0 ? 'HABIS' : `${item.stock} TERSEDIA`}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Tidak ada buku untuk ditampilkan
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

            {/* Modal Konfirmasi */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="flex flex-col w-[500px] h-[150px] bg-white rounded-xl shadow-lg items-center justify-center gap-4 px-6 py-4">
                        <div className="text-xl font-semibold text-gray-800 text-center">
                            Apakah yakin ingin menghapus{" "}
                            <span className="text-red-500">{bookToDeleteTitle}</span>?
                        </div>
                        <div className="flex flex-row gap-4 text-sm">
                            <button
                                onClick={cancelDelete}
                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                            >
                                BATAL
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                HAPUS
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
