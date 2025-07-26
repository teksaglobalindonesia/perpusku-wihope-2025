'use client';
import { useState } from 'react';
import Image from 'next/image';
import { BookList, User } from '@/app/dashboard/page';
import { BookListType } from './B_BookList';
import { UserType } from './M_MemberList';

export const L_AddLoan = () => {
    const [modalOpen, setModalOpen] = useState<'book' | 'user' | null>(null);
    const [selectedBook, setSelectedBook] = useState<BookListType | any>(null);
    const [selectedUser, setSelectedUser] = useState<UserType | any>(null);
    const [borrowDate, setBorrowDate] = useState('');
    const [duration, setDuration] = useState('');

    const booksInStock = BookList.filter((book) => book.stock > 0);
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(booksInStock.length / itemsPerPage);
    const currentBooks = booksInStock.slice((page - 1) * itemsPerPage, page * itemsPerPage);

     // INI CUMA LOG KE CONSOLE BUAT MEMUDAHKAN SAYA DALAM DEBUGING
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loanData = {
            book: selectedBook,
            user: selectedUser,
            borrowDate,
            duration,
        };

        console.log('Submitted Loan Data:', loanData);
    };

    return (
        <>
            <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
                <div className="flex justify-between py-5 px-6 items-center border-b border-gray-200">
                    <h3 className="font-semibold text-2xl text-gray-800">Tambah Peminjaman</h3>
                </div>

                <div className="px-6 py-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Buku</label>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen('book')}
                                    className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark w-40 py-3 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    {selectedBook ? selectedBook.title : 'Pilih'}
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Anggota</label>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen('user')}
                                    className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark w-40 py-3 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    {selectedUser ? selectedUser.name : 'Pilih'}
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Tanggal Pinjam</label>
                                <input
                                    type="date"
                                    value={borrowDate}
                                    onChange={(e) => setBorrowDate(e.target.value)}
                                    className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Durasi</label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                >
                                    <option value="">Pilih Durasi</option>
                                    <option value="1 Minggu">1 Minggu</option>
                                    <option value="1 Bulan">1 Bulan</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Simpan Buku
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {modalOpen === 'book' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-xl w-[800px] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b px-6 py-4">
                            <h2 className="text-lg font-semibold">Pilih Buku</h2>
                            <button
                                onClick={() => setModalOpen(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="py-4">
                            {currentBooks.map((item) => (
                                <div key={item.id} className="flex flex-col gap-3 mx-6 my-4">
                                    <div className="px-6 py-4 flex flex-row justify-between items-center border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200">
                                        <div className="flex flex-row items-center gap-6">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={128}
                                                height={176}
                                                className="w-32 h-44 object-cover rounded-md"
                                            />
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                                                    <p className="text-base text-gray-600">{item.genre}</p>
                                                    <p className="text-base text-gray-500">{item.author}</p>
                                                </div>
                                                <button
                                                    className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                                    onClick={() => {
                                                        setSelectedBook(item);
                                                        setModalOpen(null);
                                                    }}
                                                >
                                                    Pilih
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="py-2 px-4 text-sm font-medium rounded-full bg-green-100 text-green-800">
                                                {item.stock} TERSEDIA
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 flex-row justify-center py-4 px-6 items-center border-t border-gray-200">
                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                    }`}
                            >
                                Prev
                            </button>
                            <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {modalOpen === 'user' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-xl w-[800px] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b px-6 py-4">
                            <h2 className="text-lg font-semibold">Pilih Anggota</h2>
                            <button
                                onClick={() => setModalOpen(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="py-4">
                            {User.map((item, index) => (
                                <div key={index} className="flex flex-col gap-3 mx-6 my-4">
                                    <div className="px-6 py-4 flex flex-row justify-between items-center border border-gray-200 rounded-md hover:shadow-lg transition-shadow duration-200">
                                        <div className="flex flex-row items-center gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <h3 className="text-xl font-medium text-gray-900">{item.name}</h3>
                                                    <p className="text-base text-gray-600">{item.uid}</p>
                                                    <p className="text-base text-gray-500">{item.email}</p>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedUser(item);
                                                            setModalOpen(null);
                                                        }}
                                                        className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                                                    >
                                                        Pilih
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};