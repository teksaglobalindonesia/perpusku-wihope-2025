"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

type Item = {
    title?: string;
    writer?: string;
    name?: string;
    id_member?: string;
    email?: string;
    cover?: {
        url?: string;
    };
    categories?: Array<{
        id: number;
        name: string;
    }>;
    type?: "buku" | "anggota";
};

export const Tah_pinjam = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"buku" | "anggota" | null>(null);
    const [selectedBuku, setSelectedBuku] = useState<Item | null>(null);
    const [selectedAnggota, setSelectedAnggota] = useState<Item | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchQuery = encodeURIComponent(searchTerm);
                const [resBuku, resAnggota] = await Promise.all([
                    fetch(`${BASE_URL}/api/book/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchQuery}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: TOKEN,
                            "x-wihope-name": WIHOPE_NAME,
                        },
                        cache: "no-store",
                    }),
                    fetch(`${BASE_URL}/api/member/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchQuery}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: TOKEN,
                            "x-wihope-name": WIHOPE_NAME,
                        },
                        cache: "no-store",
                    }),
                ]);

                const bukuJson = await resBuku.json();
                const anggotaJson = await resAnggota.json();

                const dataBuku =
                    bukuJson?.data?.map((b: any) => ({
                        ...b,
                        type: "buku",
                    })) ?? [];

                const dataAnggota =
                    anggotaJson?.data?.map((a: any) => ({
                        ...a,
                        type: "anggota",
                    })) ?? [];

                const combined = [...dataBuku, ...dataAnggota];
                setItems(combined || []);

                const pagination = bukuJson?.meta?.pagination;

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
    }, [searchTerm, currentPage, modalType]);

    const bukaModal = (type: "buku" | "anggota") => {
        setModalType(type);
        setShowModal(true);
    };

    const pilihItem = (item: Item) => {
        if (modalType === "buku") setSelectedBuku(item);
        if (modalType === "anggota") setSelectedAnggota(item);
        setShowModal(false);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const filteredItems = useMemo(
        () => items.filter((item) => item.type === modalType),
        [items, modalType]
    );

    const paginatedItems = useMemo(() => filteredItems, [filteredItems]);

    return (
        <>
            {showModal && modalType && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-auto relative">
                        <h2 className="text-lg font-semibold mb-4 capitalize">Pilih {modalType}</h2>
                        <div className="flex items-center bg-white px-3 py-1 rounded text-black w-full sm:w-auto mb-3">
                            🔍
                            <input
                                type="text"
                                placeholder="Pencarian..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="ml-2 bg-transparent outline-none placeholder-black w-full sm:w-[150px]"
                            />
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-gray-500 text-xl"
                        >
                            &times;
                        </button>

                        {paginatedItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-4 rounded-lg mb-3 shadow-sm hover:bg-gray-200 cursor-pointer"
                                onClick={() => pilihItem(item)}
                            >
                                {modalType === "buku" ? (
                                    <div className="flex flex-row gap-4">
                                        <div>
                                            <Image
                                                src={item.cover?.url ? BASE_URL + item.cover.url : "/coverbook.jpg"}
                                                alt="book cover"
                                                width={60}
                                                height={70}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                {item.categories?.map((cat) => cat.name).join(", ") || "Tanpa kategori"}
                                            </p>
                                            <p className="text-sm text-gray-600">{item.writer}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-600">{item.id_member}</p>
                                        <p className="text-sm text-gray-600">{item.email}</p>
                                    </>
                                )}
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
                                        className={`px-3 py-1 rounded ${currentPage === page ? "bg-[#5bbd87] text-white" : "bg-gray-200"}`}
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
                </div>
            )}

            <div className="max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-[#000000] mb-8 pb-4">✏️ Tambah Peminjaman</h1>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="buku" className="block text-sm font-medium text-gray-700 mb-1">Buku</label>
                        <input
                            type="text"
                            id="buku"
                            value={selectedBuku?.title || ""}
                            onClick={() => bukaModal("buku")}
                            readOnly
                            placeholder="Pilih Buku"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="anggota" className="block text-sm font-medium text-gray-700 mb-1">Anggota</label>
                        <input
                            type="text"
                            id="anggota"
                            value={selectedAnggota?.name || ""}
                            onClick={() => bukaModal("anggota")}
                            readOnly
                            placeholder="Pilih Anggota"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Peminjaman</label>
                        <input
                            type="date"
                            id="tanggal"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="durasi" className="block text-sm font-medium text-gray-700 mb-1">Durasi Peminjaman</label>
                        <select
                            id="durasi"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700"
                            required
                        >
                            <option value="" disabled selected>Pilih Durasi</option>
                            <option value="1">1 Minggu</option>
                            <option value="2">2 Minggu</option>
                            <option value="3">3 Minggu</option>
                            <option value="4">4 Minggu</option>
                        </select>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="bg-[#5bbd87] text-white px-5 py-2 rounded-lg shadow hover:bg-[#4a996d] transition"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
