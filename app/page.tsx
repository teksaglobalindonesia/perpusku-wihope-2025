"use client";
import React, { useState, useEffect } from "react";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function Dashboard() {
  const [bookPage, setBookPage] = useState(1);
  const [peminjamanPage, setPeminjamanPage] = useState(1);
  const [pengembalianPage, setPengembalianPage] = useState(1);

  const [bookTotalPages, setBookTotalPages] = useState(1);
  const [peminjamanTotalPages, setPeminjamanTotalPages] = useState(1);
  const [pengembalianTotalPages, setPengembalianTotalPages] = useState(1);

  const [books, setBooks] = useState<any[]>([]);
  const [peminjaman, setPeminjaman] = useState<any[]>([]);
  const [pengembalian, setPengembalian] = useState<any[]>([]);

  const itemsPerPage = 2;
  const today = new Date().toISOString().split("T")[0]; //tanggal

  // 📕 Fetch stok buku habis
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/book/list?page=${bookPage}&page_size=${itemsPerPage}&search=`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: TOKEN,
              "x-wihope-name": WIHOPE_NAME,
            },
            cache: "no-store",
          }
        );
        const result = await res.json();
        console.log("Books meta:", result.meta?.pagination);

        const fetchedData = result.data || result.items || [];
        const formatted = fetchedData
          .map((item: any) => ({
            id: item.id,
            title: item.title ?? "Tanpa Judul",
            genre:
              item.categories?.length > 0
                ? item.categories.map((cat: { name: any }) => cat.name).join(", ")
                : "Tanpa Kategori",
            author: item.writer ?? "Tanpa Penulis",
            stock: item.stock ?? 0,
            img: item.cover?.url
              ? `https://cms-perpusku.widhimp.my.id${item.cover.url}`
              : "/images/default.jpg",
          }))
          .filter((b: any) => b.stock === 0); // hanya menampilkan stok buku yang habis

        //  Pagination manual setelah filter
        const start = (bookPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginated = formatted.slice(start, end);

        setBooks(paginated);
        setBookTotalPages(Math.ceil(formatted.length / itemsPerPage) || 1);
      } catch (err) {
        console.error("Gagal fetch books:", err);
      }
    };
    fetchBooks();
  }, [bookPage]);

  // Fetch peminjaman hari ini
  useEffect(() => {
    const fetchPeminjaman = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/loan/list?page=${peminjamanPage}&page_size=${itemsPerPage}&search=`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: TOKEN,
              "x-wihope-name": WIHOPE_NAME,
            },
            cache: "no-store",
          }
        );
        const result = await res.json();
        console.log("Peminjaman meta:", result.meta?.pagination);

        const fetchedData = result.data || result.items || [];
        const formatted = fetchedData
          .map((item: any) => ({
            id: item.id,
            peminjam: item.member?.name ?? "Tanpa Nama",
            judul: item.book?.title ?? "Tanpa Judul",
            tanggal_pinjam: item.loan_date ?? "",
            tanggal_kembali: item.return_date ?? "",
            image: item.book?.cover?.url
              ? `https://cms-perpusku.widhimp.my.id${item.book.cover.url}`
              : "/images/default.jpg",
          }))
          .filter((p: any) => p.tanggal_pinjam?.startsWith(today));

        setPeminjaman(formatted);
        setPeminjamanTotalPages(result.meta?.pagination?.pageCount || 1);
      } catch (err) {
        console.error("Gagal fetch peminjaman:", err);
      }
    };
    fetchPeminjaman();
  }, [peminjamanPage]);

  // Fetch pengembalian hari ini
  useEffect(() => {
    const fetchPengembalian = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/return/list?page=${pengembalianPage}&page_size=${itemsPerPage}&search=`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: TOKEN,
              "x-wihope-name": WIHOPE_NAME,
            },
            cache: "no-store",
          }
        );
        const result = await res.json();
        console.log("Pengembalian meta:", result.meta?.pagination);

        const fetchedData = result.data || result.items || [];
        const formatted = fetchedData
          .map((item: any) => {
            const loanDate = new Date(item.loan_date);
            const returnDate = new Date(item.return_date);
            const actualReturnDate = item.actual_return_date
              ? new Date(item.actual_return_date)
              : null;
            return {
              id: item.id,
              judul: item.book?.title || "-",
              peminjam: item.member?.name || "-",
              tanggalPinjam: loanDate.toLocaleDateString("id-ID"),
              tanggalKembali: returnDate.toLocaleDateString("id-ID"),
              dikembalikan: actualReturnDate
                ? actualReturnDate.toISOString().split("T")[0]
                : null,
            };
          })
          .filter((r: any) => r.dikembalikan === today);

        setPengembalian(formatted);
        setPengembalianTotalPages(result.meta?.pagination?.pageCount || 1);
      } catch (err) {
        console.error("Gagal fetch pengembalian:", err);
      }
    };
    fetchPengembalian();
  }, [pengembalianPage]);

  // Pagination Component
  const Pagination = ({
    currentPage,
    totalPages,
    setPage,
  }: {
    currentPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  }) => (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-navy text-white"
        }`}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-navy text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-navy text-white"
        }`}
      >
        Next
      </button>
    </div>
  );

  return (
    <main className="px-4 sm:px-8 py-6 space-y-10 bg-white text-navy min-h-screen">
      <h1 className="text-3xl font-bold text-navy">Dashboard</h1>

      {/* buku habis */}
      <section className="border border-gray-200 rounded-2xl p-6 shadow-md bg-white">
        <h2 className="text-xl font-semibold text-navy mb-6">📕 Stok Buku Habis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex items-center justify-between border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={book.img}
                  alt={`Cover ${book.title}`}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <p className="font-bold">{book.title}</p>
                  <p className="text-sm text-gray-500 font-semibold">{book.genre}</p>
                  <p className="text-sm text-gray-400">By: {book.author}</p>
                </div>
              </div>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                HABIS
              </span>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={bookPage}
          totalPages={bookTotalPages}
          setPage={setBookPage}
        />
      </section>

      {/* peminjaman */}
      <section className="border border-gray-200 rounded-2xl p-6 shadow-md bg-white">
        <h2 className="text-xl font-semibold text-navy mb-6">📚 Peminjaman Hari Ini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {peminjaman.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition flex flex-col gap-2"
            >
              <p className="font-bold">{b.judul}</p>
              <p className="text-sm text-gray-600">Peminjam: {b.peminjam}</p>
              <p className="text-sm text-gray-600">Peminjaman: {b.tanggal_pinjam}</p>
              <p className="text-sm text-gray-600">Pengembalian: {b.tanggal_kembali}</p>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={peminjamanPage}
          totalPages={peminjamanTotalPages}
          setPage={setPeminjamanPage}
        />
      </section>

      {/* pengembalian */}
      <section className="border border-gray-200 rounded-2xl p-6 shadow-md bg-white">
        <h2 className="text-xl font-semibold text-navy mb-6">📦 Pengembalian Hari Ini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pengembalian.map((b) => (
            <div
              key={b.id}
              className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg transition flex flex-col gap-2 bg-white"
            >
              <p className="font-bold">{b.judul}</p>
              <p className="text-sm text-gray-600">Peminjam: {b.peminjam}</p>
              <p className="text-sm text-gray-600">Peminjaman: {b.tanggalPinjam}</p>
              <p className="text-sm text-gray-600">
                Pengembalian: {b.tanggalKembali}
              </p>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={pengembalianPage}
          totalPages={pengembalianTotalPages}
          setPage={setPengembalianPage}
        />
      </section>
    </main>
  );
}
