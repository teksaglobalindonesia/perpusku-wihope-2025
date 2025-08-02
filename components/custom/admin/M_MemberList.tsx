'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { UserType } from '@/app/dashboard/members/page';

export const M_MemberList = ({ userItems = [], maxData = 5 }: UserType) => {
    const [page, setPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ nomor_anggota: string; name: string } | null>(null);

    const totalPages = Math.ceil(userItems.length / maxData);
    const paginatedData = useMemo(
        () => userItems.slice((page - 1) * maxData, page * maxData),
        [userItems, page, maxData]
    );

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

    const handleEdit = (nomor_anggota: string) => console.log('EDIT item pada produk:', nomor_anggota);
    const handlePeminjaman = (nomor_anggota: string) =>
        console.log('Melihat peminjaman item pada produk:', nomor_anggota);

    const handleDelete = (nomor_anggota: string, name: string) => {
        setSelectedUser({ nomor_anggota, name });
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedUser) console.log('Menghapus user:', selectedUser.nomor_anggota);
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="max-h-[80%] bg-gray-50 px-5 md:px-10 pb-16 ">
            <div className="mx-auto">
                {/* Search Section */}
                <div className="mb-12 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Kiri: Judul */}
                    <div className="flex-1">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-4">
                            DAFTAR ANGGOTA
                        </h1>
                        <div className="inline-block bg-black text-white px-8 py-4 text-sm font-medium tracking-wider">
                            {userItems.length === 0 ? 'EMPTY' : `${userItems.length} ITEMS`}
                        </div>
                    </div>

                    {/* Kanan: Pencarian dan Tombol Tambah */}
                    <div className="w-full lg:max-w-md flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari anggota..."
                                className="w-full h-12 px-6 bg-white border-2 border-black text-base font-medium focus:outline-none placeholder-gray-400"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/members/add"
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
                            <div key={item.id_member} className="bg-white border-2 border-black hover:bg-gray-50 transition-colors duration-300">
                                <div className="p-8">
                                    <div className="sm:grid flex-col flex gap-8 sm:grid-cols-12 items-center">
                                        {/* Informasi Anggota */}
                                        <div className="col-span-1 sm:col-span-9 space-y-3 text-center sm:text-left">
                                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">ANGGOTA</div>
                                            <h2 className="text-3xl font-bold text-black leading-tight">{item.name}</h2>
                                            <div className="text-lg text-gray-600 font-medium">Nomor Anggota: {item.id_member}</div>
                                            <div className="text-lg text-gray-600 font-medium">Email: {item.email}</div>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-3 space-y-4">
                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    href="/dashboard/members/loan"
                                                    className="bg-black text-center text-white border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
                                                >
                                                    <button onClick={() => handlePeminjaman(item.id_member)}>PEMINJAMAN</button>
                                                </Link>
                                                <Link
                                                    href="/dashboard/members/edit"
                                                    className="bg-white text-center text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                                                >
                                                    <button onClick={() => handleEdit(item.id_member)}>EDIT</button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id_member, item.name)}
                                                    className="bg-white text-black border-2 border-black px-6 py-3 text-sm font-bold tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
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
                                <div className="bg-black text-white w-24 h-24 mx-auto mb-8 flex items-center justify-center text-2xl font-bold">✓</div>
                                <h2 className="text-4xl font-bold text-black mb-4">
                                    TIDAK ADA<br />
                                    ANGGOTA
                                </h2>
                                <p className="text-lg text-gray-600 font-medium">Tidak ada anggota untuk ditampilkan</p>
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
                {showDeleteModal && selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                        <div className="flex flex-col w-[500px] max-w-[90vw] bg-white border-2 border-black shadow-lg items-center justify-center gap-4 px-6 py-6">
                            <div className="text-xl font-semibold text-black text-center">
                                Apakah yakin ingin menghapus anggota <span className="text-red-500">{selectedUser.name}</span>?
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