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
    const userList = User.filter((user) => user.uid);
    
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 5;
    
    const totalPagesBook = Math.ceil(booksInStock.length / itemsPerPage);
    const currentBooks = booksInStock.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const totalPagesUser = Math.ceil(userList.length / itemsPerPage);
    const currentUser = userList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-800">Pilih Buku</h2>
                            <button
                                onClick={() => setModalOpen(null)}
                                className="text-gray-400 hover:text-red-500 text-xl transition-all"
                            >
                                ×
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto px-6 py-4 space-y-4">
                            {currentBooks.map((item) => (
                                <div key={item.id} className="border rounded-lg p-4 flex gap-6 items-center hover:shadow-md transition">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={100}
                                        height={140}
                                        className="object-cover rounded-md w-24 h-36"
                                    />
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-600">{item.genre}</p>
                                            <p className="text-sm text-gray-500">{item.author}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full w-fit">
                                                {item.stock} TERSEDIA
                                            </p>
                                            <button
                                                className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-4 py-2 rounded-md text-sm font-medium transition-all"
                                                onClick={() => {
                                                    setSelectedBook(item);
                                                    setModalOpen(null);
                                                }}
                                            >
                                                Pilih
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 justify-center items-center border-t px-6 py-4 bg-gray-50">
                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${page === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    }`}
                            >
                                Prev
                            </button>
                            <span className="text-sm text-gray-700 font-medium">
                                {page} / {totalPagesBook}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(p + 1, totalPagesBook))}
                                disabled={page === totalPagesBook}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${page === totalPagesBook
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {modalOpen === 'user' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-800">Pilih Anggota</h2>
                            <button
                                onClick={() => setModalOpen(null)}
                                className="text-gray-400 hover:text-red-500 text-xl transition-all"
                            >
                                ×
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto px-6 py-4 space-y-4">
                            {currentUser.map((item, index) => (
                                <div key={index} className="border rounded-lg p-4 flex gap-6 items-center hover:shadow-md transition">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-600">{item.uid}</p>
                                        <p className="text-sm text-gray-500">{item.email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedUser(item);
                                            setModalOpen(null);
                                        }}
                                        className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-4 py-2 rounded-md text-sm font-medium transition-all"
                                    >
                                        Pilih
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 justify-center items-center border-t px-6 py-4 bg-gray-50">
                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${page === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    }`}
                            >
                                Prev
                            </button>
                            <span className="text-sm text-gray-700 font-medium">
                                {page} / {totalPagesUser}
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(p + 1, totalPagesUser))}
                                disabled={page === totalPagesUser}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${page === totalPagesUser
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};