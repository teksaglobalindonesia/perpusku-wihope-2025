"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const dummyPeminjaman = [
  {
    id: 1,
    anggotaId: "1",
    judul: "Pesta Bunuh Diri",
    tanggalPinjam: "17 Juli 2025, 08.00",
    tanggalKembali: "24 Juli 2025",
    status: "DIPINJAM",
  },
  {
    id: 2,
    anggotaId: "1",
    judul: "Indigo Tapi Penakut",
    tanggalPinjam: "01 Juli 2025, 10.00",
    tanggalKembali: "08 Juli 2025",
    status: "TERLAMBAT",
  },
  {
    id: 3,
    anggotaId: "1",
    judul: "Laut Bercerita",
    tanggalPinjam: "12 Juli 2025, 09.30",
    tanggalKembali: "19 Juli 2025",
    status: "DIKEMBALIKAN",
  },
];

export default function PeminjamanAnggota({ id }: { id: string }) {
  const [data, setData] = useState(
    dummyPeminjaman.filter((item) => item.anggotaId === id)
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-navy">Peminjaman Anggota ID: {id}</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">Belum ada peminjaman untuk anggota ini.</p>
      ) : (
        data.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 shadow-sm flex flex-col gap-1 bg-white"
          >
            <p className="font-bold text-navy">{item.judul}</p>
            <p className="text-sm text-gray-700">
              Tanggal Pinjam: {item.tanggalPinjam}
            </p>
            <p className="text-sm text-gray-700">
              Tanggal Kembali: {item.tanggalKembali}
            </p>

            <div className="mt-2 flex justify-between items-center">
              {item.status !== "DIKEMBALIKAN" && (
                <Button className="bg-[#F9CA24] text-black px-4 py-1 rounded hover:bg-[#f5b041]">
                  Kembalikan
                </Button>
              )}

              {item.status === "TERLAMBAT" && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  TERLAMBAT
                </span>
              )}
              {item.status === "DIKEMBALIKAN" && (
                <span className="bg-green-400 text-white text-xs px-2 py-1 rounded">
                  DIKEMBALIKAN
                </span>
              )}
              {item.status === "DIPINJAM" && (
                <span className="bg-cyan-400 text-white text-xs px-2 py-1 rounded">
                  DIPINJAM
                </span>
              )}
            </div>
          </div>
        ))
      )}

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
