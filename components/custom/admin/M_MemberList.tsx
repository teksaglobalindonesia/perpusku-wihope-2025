'use client';
import Link from 'next/link';
import { useState } from 'react';

export type UserType = {
    userItems?: Array<{
        name: string,
        uid: string,
        email: string,
    }>;
    maxData?: number;
};

export const M_MemberList = ({ userItems = [], maxData = 5 }: UserType) => {
    const [page, setPage] = useState<number>(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ uid: string, name: string } | null>(null);

    const totalPages = Math.ceil(userItems.length / maxData);
    const paginatedData = userItems.slice(
        (page - 1) * maxData,
        page * maxData
    );

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };
     // INI CUMA LOG KE CONSOLE BUAT MEMUDAHKAN SAYA DALAM DEBUGING
    const handleEdit = (uid: string) => {
        console.log("EDIT item pada produk:", uid);
    };
     // INI CUMA LOG KE CONSOLE BUAT MEMUDAHKAN SAYA DALAM DEBUGING
    const handlePeminjaman = (uid: string) => {
        console.log("Melihat peminjaman item pada produk:", uid);
    };

    const handleDelete = (uid: string, name: string) => {
        setSelectedUser({ uid, name });
        setShowDeleteModal(true);
    };
     // INI CUMA LOG KE CONSOLE BUAT MEMUDAHKAN SAYA DALAM DEBUGING
    const confirmDelete = () => {
        if (selectedUser) {
            console.log("Menghapus user:", selectedUser.uid);
        }
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="flex flex-col mx-10 my-10 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <div className="flex flex-row justify-between py-5 px-6 items-center border-b border-gray-200">
                <h3 className="font-semibold text-2xl text-gray-800">Member List</h3>
                <div className="flex flex-row gap-5">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 h-10 px-4 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                    <Link href="/dashboard/members/add" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md">
                        Tambah Anggota
                    </Link>
                </div>
            </div>

            {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
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
                                        <Link href="/dashboard/members/loan" className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md">
                                            <button onClick={() => handlePeminjaman(item.uid)}>PEMINJAMAN</button>
                                        </Link>
                                        <Link href="/dashboard/members/edit" className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md">
                                            <button onClick={() => handleEdit(item.uid)}>EDIT</button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.uid, item.name)}
                                            className="bg-yellow-300 hover:bg-yellow-400 text-primary-dark px-6 py-2 rounded-md font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
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
                <div className="text-center py-8 text-gray-500">
                    Tidak ada anggota untuk ditampilkan
                </div>
            )}

            <div className="flex gap-4 flex-row justify-center py-4 px-6 items-center border-t border-gray-200">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                    {page} / {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${page === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                >
                    Next
                </button>
            </div>

            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="flex flex-col w-[500px] h-[180px] bg-white rounded-xl shadow-lg items-center justify-center gap-4 px-6 py-4">
                        <div className="text-xl font-semibold text-gray-800 text-center">
                            Apakah yakin ingin menghapus anggota <span className="text-red-600">{selectedUser.name}</span>?
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
