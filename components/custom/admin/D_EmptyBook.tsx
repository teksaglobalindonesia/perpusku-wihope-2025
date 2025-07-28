'use client'
import Image from 'next/image';
import { useState } from 'react';
import { BookListType } from './B_BookList';

export const D_EmptyBook = ({ bookListItems = [], maxData = 2 }: BookListType) => {
    const [page, setPage] = useState<number>(1);
    const emptyBooks = bookListItems.filter((item) => item.stock === 0); //ini buat filter yang stoknya = 0, klo stoknya ga = 0 mmaka item tidak akan ditampilkan (sederhananya ini filter ygy)
    const totalPages = Math.ceil(emptyBooks.length / maxData);
    const paginatedData = emptyBooks.slice((page - 1) * maxData, page * maxData);

    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Buku Stok Habis</h3>
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
                                </div>
                            </div>
                            {/* Status Buku */}
                            <div>
                                <p className="py-2 px-4 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                                    {item.stock === 0 ? 'HABIS' : `${item.stock} Tersedia`}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Tidak ada buku stok habis untuk ditampilkan
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