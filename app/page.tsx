"use client";
import React, { useState } from "react";

export default function Dashboard() {
  const [bookPage, setBookPage] = useState(1);
  const [peminjamanPage, setPeminjamanPage] = useState(1);
  const [pengembalianPage, setPengembalianPage] = useState(1);

  const itemsPerPage = 2;

  const books = [
    {
      title: "Cantik Itu Luka",
      genre: "Historical",
      author: "Eka Kurniawan",
      img: "/images/Cantik Itu Luka.jpg",
    },
    {
      title: "Laut Bercerita",
      genre: "Persahabatan",
      author: "Leila Salikha Chudori",
      img: "/images/laut bercerita.jpg",
    },
  ];

  const peminjaman = [
    {
      title: "Pesta Bunuh Diri",
      peminjam: "Leka",
      pinjam: "17 Juli 2025, 08.00",
      kembali: "24 Juli 2025",
    },
    {
      title: "Laut Bercerita",
      peminjam: "Agis",
      pinjam: "17 Juli 2025, 08.00",
      kembali: "24 Juli 2025",
    },
  ];

  const pengembalian = [
    {
      title: "Indigo Tapi Penakut",
      peminjam: "Tika",
      pinjam: "10 Juli 2025, 08.00",
      kembali: "17 Juli 2025",
    },
    {
      title: "Magma",
      peminjam: "Ana",
      pinjam: "10 Juli 2025, 08.00",
      kembali: "17 Juli 2025",
    },
  ];

  const paginate = (data: any[], page: number) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <main className="px-4 sm:px-8 py-6 space-y-8 bg-white text-navy min-h-screen">
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>

      {/* stok */}
      <section className="border border-[#B0B3B8] rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-navy">📕 Buku Stok Habis</h2>
          <input
            type="text"
            placeholder="Cari buku..."
            className="border border-[#B0B3B8] px-3 py-2 rounded-lg w-full sm:w-60 focus:outline-none"
          />
        </div>

        <div className="space-y-4">
          {paginate(books, bookPage).map((book, i) => (
            <div
              key={i}
              className="flex items-center justify-between border border-[#B0B3B8] p-4 rounded-lg shadow-sm flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center gap-4">
                <img src={book.img} alt={`Cover ${book.title}`} className="w-12 h-12" />
                <div>
                  <p className="font-bold font-sans">{book.title}</p>
                  <p className="text-sm text-[#B0B3B8] font-semibold">{book.genre}</p>
                  <p className="text-sm text-[#B0B3B8]">By: {book.author}</p>
                </div>
              </div>
              <span className="bg-[#FF4D4D] text-white px-4 py-1 rounded-b-lg text-sm font-semibold">
                HABIS
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setBookPage((p) => Math.max(p - 1, 1))}
            disabled={bookPage === 1}
            className={`px-3 py-1 rounded ${
              bookPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-navy text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          <button className="px-3 py-1 rounded bg-navy text-white">{bookPage}</button>
          <button
            onClick={() => setBookPage((p) => Math.min(p + 1, Math.ceil(books.length / itemsPerPage)))}
            disabled={bookPage === Math.ceil(books.length / itemsPerPage)}
            className={`px-3 py-1 rounded ${
              bookPage === Math.ceil(books.length / itemsPerPage)
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-navy text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </section>

      {/* peminjaman */}
      <section className="bg-blue border border-navy rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-white">📚 Peminjaman Hari Ini</h2>
          <input
            type="text"
            placeholder="Cari peminjam..."
            className="border border-[#B0B3B8] px-3 py-2 rounded-lg w-full sm:w-60 focus:outline-none"
          />
        </div>

        <div className="space-y-4">
          {paginate(peminjaman, peminjamanPage).map((b, i) => (
            <div key={i} className="bg-white border border-[#B0B3B8] p-4 rounded-lg shadow-sm">
              <p className="font-bold">{b.title}</p>
              <p className="text-sm">Peminjam: {b.peminjam}</p>
              <p className="text-sm">Peminjaman: {b.pinjam}</p>
              <p className="text-sm">Pengembalian: {b.kembali}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setPeminjamanPage((p) => Math.max(p - 1, 1))}
            disabled={peminjamanPage === 1}
            className={`px-3 py-1 rounded ${
              peminjamanPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-navy text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          <button className="px-3 py-1 rounded bg-navy text-white">{peminjamanPage}</button>
          <button
            onClick={() =>
              setPeminjamanPage((p) => Math.min(p + 1, Math.ceil(peminjaman.length / itemsPerPage)))
            }
            disabled={peminjamanPage === Math.ceil(peminjaman.length / itemsPerPage)}
            className={`px-3 py-1 rounded ${
              peminjamanPage === Math.ceil(peminjaman.length / itemsPerPage)
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-navy text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </section>

      {/* pengembalian */}
      <section className="border border-[#B0B3B8] rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-navy">📦 Pengembalian Hari Ini</h2>
          <input
            type="text"
            placeholder="Cari pengembali..."
            className="border border-[#B0B3B8] px-3 py-2 rounded-lg w-full sm:w-60 focus:outline-none"
          />
        </div>

        <div className="space-y-4">
          {paginate(pengembalian, pengembalianPage).map((b, i) => (
            <div
              key={i}
              className="border border-[#B0B3B8] p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4"
            >
              <div>
                <p className="font-bold">{b.title}</p>
                <p className="text-sm">Peminjam: {b.peminjam}</p>
                <p className="text-sm">Peminjaman: {b.pinjam}</p>
                <p className="text-sm">Pengembalian: {b.kembali}</p>
              </div>
              <button className="bg-navy hover:bg-blue text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200">
                KEMBALIKAN
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setPengembalianPage((p) => Math.max(p - 1, 1))}
            disabled={pengembalianPage === 1}
            className={`px-3 py-1 rounded ${
              pengembalianPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-navy text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>
          <button className="px-3 py-1 rounded bg-navy text-white">{pengembalianPage}</button>
          <button
            onClick={() =>
              setPengembalianPage((p) =>
                Math.min(p + 1, Math.ceil(pengembalian.length / itemsPerPage))
              )
            }
            disabled={pengembalianPage === Math.ceil(pengembalian.length / itemsPerPage)}
            className={`px-3 py-1 rounded ${
              pengembalianPage === Math.ceil(pengembalian.length / itemsPerPage)
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-navy text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
