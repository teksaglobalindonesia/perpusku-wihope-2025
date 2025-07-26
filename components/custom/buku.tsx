"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export type cart1props = {
    items?: Array<{
        title?: string;
        genre?: string;
        penulis?: string;
        status?: number;
        coverBuku?: string;
    }>
}

export const Buku = ({ items = [] }: cart1props) => {
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
                        <p className="mb-4 font-semibold text-[16px] text-gray-800">Yakin ingin menghapus buku ini?</p>
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
            <div className="bg-[#edf0f1] mx-[100px] my-[50px] drop-shadow-lg rounded-lg pb-4">
                <div className="flex justify-between items-center px-6 py-6">
                    <h1 className="text-[24px] text-black font-semibold">Buku</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#ffffff] px-3 py-1 rounded text-black">
                            🔍
                            <input
                                type="text"
                                placeholder="Pencarian..."
                                className="ml-2 bg-transparent outline-none placeholder-black w-[150px]"
                            />
                        </div>
                        <Link href="/tambah_buku" className="bg-[#5bbd87] hover:bg-[#4a996d] px-4 py-2 rounded-sm transition text-white">
                            Tambah
                        </Link>
                    </div>
                </div>

                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white mx-6 my-4 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                        <div className="flex justify-between p-6">
                            <div className="flex gap-6">
                                <Image
                                    src={item.coverBuku || "/coverbook.jpg"}
                                    alt="book cover"
                                    width={130}
                                    height={160}
                                    className="rounded-lg object-cover"
                                />
                                <div className="flex flex-col justify-between py-2">
                                    <div>
                                        <h1 className="text-[24px] font-semibold text-gray-800">{item.title}</h1>
                                        <p className="text-[14px] text-[#757575]">{item.genre}</p>
                                        <p className="text-[14px] text-[#757575]">{item.penulis}</p>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <Link
                                            href="/edit_buku"
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
                            <div className="flex items-center">
                                {item.status === 0 ? (
                                    <span className="bg-[#F57373] text-white text-[16px] px-4 py-2 rounded-sm">HABIS</span>
                                ) : (
                                    <div className="flex items-center gap-2 text-black text-[16px]">
                                        <span>Stok:</span>
                                        <span className="font-semibold">{item.status}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#5bbd87] text-white' : 'bg-gray-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
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
