"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export type Book = {
    title?: string;
    writer?: string;
    stock?: number;
    cover?: {
        url?: string;
    };
    categories?: Array<{
        id: number;
        name: string;
    }>;
}

export const Buku = () => {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchQuery = encodeURIComponent(searchTerm);
                const res = await fetch(
                    `${BASE_URL}/api/book/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchQuery}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: TOKEN,
                            'x-wihope-name': WIHOPE_NAME,
                        },
                        cache: 'no-store',
                    }
                );

                const bookData = await res.json();

                setItems(bookData?.data || []);

                       const pagination = bookData?.meta?.pagination;

                if (pagination?.page_count) {
                    setTotalPages(pagination.page_count);
                } else if (pagination?.total && pagination?.page_size) {
                    setTotalPages(Math.ceil(pagination.total / pagination.page_size));
                }

            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };

        fetchData();
    }, [searchTerm, currentPage]);

    const bukaModal = () => setShowModal(true);
    const tutupModal = () => setShowModal(false);

    const konfirmasiHapus = () => {
        alert("Item dihapus!");
        setShowModal(false);
    };

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


            <div className="bg-[#edf0f1] mx-4 sm:mx-6 lg:mx-24 my-8 drop-shadow-lg rounded-lg pb-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center px-6 py-6">
                    <h1 className="text-[20px] sm:text-[24px] text-black font-semibold">Buku</h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="flex items-center bg-white px-3 py-2 rounded text-black w-full sm:w-auto">
                            🔍
                            <input
                                type="text"
                                placeholder="Pencarian..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="ml-2 bg-transparent outline-none placeholder-black w-full"
                            />


                        </div>
                        <Link
                            href="/tambah_buku"
                            className="bg-[#5bbd87] hover:bg-[#4a996d] px-4 py-2 rounded transition text-white text-center"
                        >
                            Tambah
                        </Link>
                    </div>
                </div>

                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white mx-4 sm:mx-6 my-4 rounded-xl shadow hover:shadow-lg transition duration-300"
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-4 p-4 md:p-6">

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Image
                                    src={BASE_URL + item.cover?.url || "/coverbook.jpg"}
                                    alt="book cover"
                                    width={130}
                                    height={160}
                                    className="rounded-lg object-cover w-[130px] h-[160px]"
                                />
                                <div className="flex flex-col justify-between py-2">
                                    <div>
                                        <h1 className="text-[20px] sm:text-[24px] font-semibold text-gray-800">{item.title}</h1>
                                        <p className="text-[14px] text-[#757575]">
                                            {item.categories?.map((cat) => cat.name).join(", ") ?? "Tanpa kategori"}
                                        </p>
                                        <p className="text-[14px] text-[#757575]">{item.writer}</p>
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

                            <div className="flex items-center justify-start md:justify-end">
                                {item.stock === 0 ? (
                                    <span className="bg-[#F57373] text-white text-[16px] px-4 py-2 rounded-sm mt-2 md:mt-0">
                                        HABIS
                                    </span>
                                ) : (
                                    <div className="flex items-center gap-2 text-black text-[16px] mt-2 md:mt-0">
                                        <span>Stok:</span>
                                        <span className="font-semibold">{item.stock}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center gap-2 mt-6 flex-wrap px-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
                    >
                        &lt;
                    </button>

                    {[...Array(3)].map((_, index) => {
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
