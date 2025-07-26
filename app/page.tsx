"use client";
import React from "react";

export default function Dashboard() {
  return (
    <main className="px-8 py-6 space-y-8 bg-white text-navy min-h-screen">
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>

      {/* Buku Stok Habis */}
      <section className="border border-[#B0B3B8] rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-navy">📕 Buku Stok Habis</h2>
          <input
            type="text"
            placeholder="Cari buku..."
            className="border border-[#B0B3B8] px-3 py-2 rounded-lg w-60 focus:outline-none"
          />
        </div>

        <div className="space-y-4">
          {/* Item Buku */}
          <div className="flex items-center justify-between border border-[#B0B3B8] p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <img
              src="/images/Cantik Itu Luka.jpg"
              alt="Cover Cantik Itu Luka"
              className="w-12 h-12 "/>  
              <div>
                <p className="font-bold font-sans">Cantik Itu Luka</p>
                <p className="text-sm text-[#B0B3B8] font-semibold">Historical</p>
                <p className="text-sm text-[#B0B3B8]">By: Eka Kurniawan</p>
              </div>
            </div>
            <span className="bg-[#FF4D4D] text-white px-4 py-1 rounded-r-lg text-sm font-semibold">
              HABIS
            </span>
          </div>
          <div className="flex items-center justify-between border border-[#B0B3B8] p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <img
              src="/images/laut bercerita.jpg"
              alt="Cover Cantik Itu Luka"
              className="w-12 h-12 "/>
              <div>
                <p className="font-bold font-sans">Laut bercerita</p>
                <p className="text-sm text-[#B0B3B8] font-semibold">Persahabatan</p>
                <p className="text-sm text-[#B0B3B8]">By: Leila Salikha Chudori</p>
              </div>
            </div>
            <span className="bg-[#FF4D4D] text-white px-4 py-1 rounded-r-lg text-sm font-semibold">
              HABIS
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Prev</button>
  <button className="px-3 py-1 rounded bg-navy text-white">1</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">2</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">3</button>
  <span className="px-2 text-gray-500">...</span>
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Next</button>
</div>

      </section>

      {/* Peminjaman */}
      <section className="bg-blue border border-navy rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">📚 Peminjaman Hari Ini</h2>
          <input
            type="text"
            placeholder="Cari peminjam..."
            className="border border-[#B0B3B8] px-3 py-2 rounded-lg w-60 focus:outline-none"
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#B0B3B8] p-4 rounded-lg shadow-sm">
            <p className="font-bold">Pesta Bunuh Diri</p>
            <p className="text-sm">Peminjam: Leka</p>
            <p className="text-sm">Peminjaman: 17 Juli 2025, 08.00</p>
            <p className="text-sm">Pengembalian: 24 Juli 2025</p>
          </div>
          <div className="bg-white border border-[#B0B3B8] p-4 rounded-lg shadow-sm">
            <p className="font-bold">Laut Bercerita</p>
            <p className="text-sm">Peminjam: Agis</p>
            <p className="text-sm">Peminjaman: 17 Juli 2025, 08.00</p>
            <p className="text-sm">Pengembalian: 24 Juli 2025</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Prev</button>
  <button className="px-3 py-1 rounded bg-navy text-white">1</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">2</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">3</button>
  <span className="px-2 text-gray-500">...</span>
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Next</button>
</div>

      </section>

      {/* Pengembalian */}
      <section className="border border-[#B0B3B8] rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-navy">📦 Pengembalian Hari Ini</h2>
          <input
            type="text"
            placeholder="Cari pengembali..."
            className="border border-[#B0B3B8] px-3 py-2 rounded-lg w-60 focus:outline-none"
          />
        </div>

        <div className="space-y-4">
          <div className="border border-[#B0B3B8] p-4 rounded-lg shadow-sm flex justify-between items-start">
            <div>
              <p className="font-bold">Indigo Tapi Penakut</p>
              <p className="text-sm">Peminjam: Tika</p>
              <p className="text-sm">Peminjaman: 10 Juli 2025, 08.00</p>
              <p className="text-sm">Pengembalian: 17 Juli 2025</p>
            </div>
            <button className="bg-navy hover:bg-blue text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200">
            KEMBALIKAN
            </button>


          </div>
          <div className="border border-[#B0B3B8] p-4 rounded-lg shadow-sm flex justify-between items-start">
            <div>
              <p className="font-bold">Magma</p>
              <p className="text-sm">Peminjam: Ana</p>
              <p className="text-sm">Peminjaman: 10 Juli 2025, 08.00</p>
              <p className="text-sm">Pengembalian: 17 Juli 2025</p>
            </div>
            <button className="bg-navy hover:bg-blue text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200">
            KEMBALIKAN
            </button>


          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Prev</button>
  <button className="px-3 py-1 rounded bg-navy text-white">1</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">2</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">3</button>
  <span className="px-2 text-gray-500">...</span>
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Next</button>
</div>

      </section>
    </main>
  );
}
