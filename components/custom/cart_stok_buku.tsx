'use client'

import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type Book = {
    title?: string;

    categories?: Array<{
        id: number;
        name: string;
    }>;

    writer?: string;
    status?: boolean;
    cover?: {
        url?: string;
    };
}

export const Cartsatu = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<Book[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchQuery = encodeURIComponent(searchTerm);
                const resBook = await fetch(
                    `${BASE_URL}/api/book/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchQuery}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: TOKEN,
                        "x-wihope-name": WIHOPE_NAME,
                    },
                    cache: "no-store",
                });
                const dataBooks = await resBook.json();

                const resLoan = await fetch(
                    `${BASE_URL}/api/loan/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchQuery}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: TOKEN,
                        "x-wihope-name": WIHOPE_NAME,
                    },
                    cache: "no-store",
                });
                const dataLoans = await resLoan.json();

                const loans = dataLoans?.data ?? [];

                const pinjamanAktifMap: Record<number, number> = {};
                loans.forEach((loan: any) => {
                    if (!loan.return) {
                        const bookId = loan.book.id;
                        pinjamanAktifMap[bookId] = (pinjamanAktifMap[bookId] || 0) + 1;
                    }
                });

                const booksWithStatus = (dataBooks?.data ?? []).map((book: any) => {
                    const totalTerpinjam = pinjamanAktifMap[book.id] || 0;
                    const stock = book.stock || 0;
                    const tersisa = stock - totalTerpinjam;

                    return {
                        ...book,
                        status: tersisa <= 0,
                    };
                });

                console.log("dataBooks:", dataBooks);
                console.log("dataLoans:", dataLoans);

                setItems(booksWithStatus || []);

                const pagination = dataBooks?.meta?.pagination;

                if (pagination?.page_count) {
                    setTotalPages(pagination.page_count);
                } else if (pagination?.total && pagination?.page_size) {
                    setTotalPages(Math.ceil(pagination.total / pagination.page_size));
                }

            } catch (error) {
                console.error('Gagal mengambil data:', error);
            }
        };

        fetchData();
    }, [searchTerm, currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-[#edf0f1] mx-4 md:mx-[60px] my-[30px] drop-shadow-lg rounded-lg pb-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-10 py-5">
                <h1 className="text-[20px] md:text-[24px] text-black font-medium">Stok buku</h1>

                <div className="flex flex-wrap gap-2 justify-center md:justify-center">
                    <Link href="/peminjaman_buku" className="bg-[#0097B2] py-2 px-3 text-white rounded text-sm md:text-base">Peminjaman Buku</Link>
                    <Link href="/pengembalian_buku" className="bg-[#E0B677] py-2 px-3 text-white rounded text-sm md:text-base">Pengembalian Buku</Link>
                </div>

                <div className="flex items-center bg-white px-3 py-2 rounded text-black w-full md:w-auto">
                    🔍
                    <input
                        type="text"
                        placeholder="Pencarian..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="ml-2 bg-transparent outline-none placeholder-black w-full md:w-[150px]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-10 py-5">
                {items.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300 w-full">
                        <div className="px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex flex-row gap-3 items-center">
                                <Image
                                    src={item.cover?.url ? BASE_URL + item.cover.url : "/coverbook.jpg"}
                                    alt="booknovel"
                                    width={60}
                                    height={90}
                                    className="rounded-md object-cover"
                                />
                                <div className="flex flex-col justify-between h-full">
                                    <h1 className="text-lg font-semibold">{item.title}</h1>
                                    <p className="text-sm text-gray-500">{item.categories?.map((cat) => cat.name).join(", ") ?? "Tanpa kategori"}</p>
                                    <p className="text-sm text-gray-500">{item.writer}</p>
                                </div>
                            </div>

                            {item.status ? (
                                <div className="bg-[#F57373] px-3 py-1 rounded-md">
                                    <h1 className="text-sm text-white font-medium">Habis</h1>
                                </div>
                            ) : (
                                <div className="bg-[#5bbd87] px-3 py-1 rounded-md">
                                    <h1 className="text-sm text-white font-medium">Sedia</h1>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

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
    );
};
