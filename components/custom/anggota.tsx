"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

export type cart1props = {
    items?: Array<{
        name?: string;
        id_member?: string;
        email?: string;
        documentId?: string;
    }>;
};

export const Anggota = ({ items = [] }: cart1props) => {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const bukaModal = () => setShowModal(true);
    const tutupModal = () => setShowModal(false);

    const konfirmasiHapus = () => {
        alert("Item dihapus!");
        setShowModal(false);
    };

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, items]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-md w-[300px] text-center">
                        <p className="mb-4 font-semibold text-[16px] text-gray-800">Yakin ingin menghapus ini?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={tutupModal}
                                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={konfirmasiHapus}
                                className="bg-[#F57373] hover:bg-[#c65d5d] text-white px-4 py-2 rounded-lg transition"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-[#edf0f1] mx-4 sm:mx-10 md:mx-20 lg:mx-24 my-6 sm:my-10 drop-shadow-lg rounded-lg pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 py-6 gap-4">
                    <h1 className="text-[20px] md:text-[24px] text-black font-semibold">Anggota</h1>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center bg-white px-3 py-2 rounded text-black w-full sm:w-auto">
                            🔍
                            <input
                                type="text"
                                placeholder="Pencarian..."
                                className="ml-2 bg-transparent outline-none placeholder-black w-full sm:w-[150px]"
                            />
                        </div>
                        <Link
                            href="/tambah_anggota"
                            className="bg-[#5bbd87] hover:bg-[#4a996d] px-4 py-2 rounded-sm transition text-white text-center w-full sm:w-auto"
                        >
                            Tambah
                        </Link>
                    </div>
                </div>

                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white mx-4 sm:mx-6 my-4 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                        <div className="flex flex-col md:flex-row justify-between p-4 sm:p-6 gap-4">
                            <div className="flex flex-col justify-between py-2">
                                <div className="mb-4">
                                    <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-800">{item.name}</h1>
                                    <p className="text-[14px] text-[#757575]">{item.id_member}</p>
                                    <p className="text-[14px] text-[#757575]">{item.email}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <Link
                                        href={`/pinjam_anggota/${item.documentId}`}
                                        className="bg-[#e4c682] hover:bg-[#b39c65] px-4 py-1 rounded-sm transition text-white"
                                    >
                                        Peminjaman
                                    </Link>
                                    <Link
                                        href="/edit_anggota"
                                        className="bg-[#7bbade] hover:bg-[#689cba] px-4 py-1 rounded-sm transition text-white"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={bukaModal}
                                        className="bg-[#F57373] hover:bg-[#c65d5d] px-4 py-1 rounded-sm transition text-white"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center flex-wrap gap-2 mt-6 px-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    {[...Array(2)].map((_, index) => {
                        const page = currentPage + index;
                        if (page > totalPages) return null;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 rounded ${currentPage === page
                                    ? "bg-[#5bbd87] text-white"
                                    : "bg-gray-200"
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </>
    );
};
