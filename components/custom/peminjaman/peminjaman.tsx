"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const dummyPeminjaman = [
  {
    id: 1,
    judul: "Pesta Bunuh Diri",
    peminjam: "anggota 1",
    tanggalPinjam: "17 Juli 2025, 08.00",
    tanggalKembali: "24 Juli 2025",
    terlambat: false,
  },
  {
    id: 2,
    judul: "Cantik Itu Luka",
    peminjam: "Abu",
    tanggalPinjam: "10 Juli 2025, 08.00",
    tanggalKembali: "17 Juli 2025",
    terlambat: true,
  },
  {
    id: 3,
    judul: "Indigo Tapi Penakut",
    peminjam: "Abe",
    tanggalPinjam: "17 Juli 2025, 08.00",
    tanggalKembali: "24 Juli 2025",
    terlambat: false,
  },
  {
    id: 4,
    judul: "Laut Bercerita",
    peminjam: "Abo",
    tanggalPinjam: "10 Juli 2025, 08.00",
    tanggalKembali: "17 Juli 2025",
    terlambat: true,
  },
  {
    id: 5,
    judul: "Magma",
    peminjam: "Widhi",
    tanggalPinjam: "17 Juli 2025, 08.00",
    tanggalKembali: "24 Juli 2025",
    terlambat: false,
  },
  {
    id: 6,
    judul: "7 Prajurit Bapak",
    peminjam: "Widhi",
    tanggalPinjam: "10 Juli 2025, 08.00",
    tanggalKembali: "17 Juli 2025",
    terlambat: true,
  },
];

export default function PeminjamanList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = dummyPeminjaman.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 font-sans text-sm">
  <div className="space-y-4 font-sans text-sm w-full">
  <div className="flex items-center justify-end gap-4">
    <input
      type="text"
      placeholder="Search..."
      className="border px-3 py-2 rounded text-gray-700 w-64"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <Link href="/peminjaman/tambah">
  <Button className="bg-navy text-white hover:bg-blue px-6 py-2 rounded">
    + TAMBAH
  </Button>
  </Link>
  
  </div>
</div>

      {filtered.map((item) => (
        <div
          key={item.id}
          className="border rounded p-4 shadow-sm flex flex-col gap-1"
        >
          <p className="font-bold">{item.judul}</p>
          <p className="font-semibold text-sm">Peminjam: {item.peminjam}</p>
          <p>Tanggal Pinjam: {item.tanggalPinjam}</p>
          <p>Tanggal Kembali: {item.tanggalKembali}</p>
          <div className="flex justify-between items-center mt-2">
            <Button className="bg-navy text-white hover:bg-blue px-4 py-1 rounded">KEMBALIKAN</Button>
            {item.terlambat && (
              <span className=" bg-red-500 text-white text-xs px-2 py-1 rounded-b-lg">
                TERLAMBAT
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
<div className="flex justify-center items-center gap-2 mt-6">
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Prev</button>
  <button className="px-3 py-1 rounded bg-navy text-white">1</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">2</button>
  <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">3</button>
  <span className="px-2 text-gray-500">...</span>
  <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Next</button>
</div>

    </div>
  );
}
