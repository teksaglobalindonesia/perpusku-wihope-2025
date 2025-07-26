"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HapusAnggotaDialog from "@/components/custom/anggota/hapusanggota";

const dummyAnggota = [
  { id: 1, name: "Nama Anggota 1", nomor: "111111", email: "anggota1@gmail.com" },
  { id: 2, name: "Nama Anggota 2", nomor: "222222", email: "anggota2@gmail.com" },
  { id: 3, name: "Nama Anggota 3", nomor: "333333", email: "anggota3@gmail.com" },
  { id: 4, name: "Nama Anggota 4", nomor: "444444", email: "anggota4@gmail.com" },
  { id: 5, name: "Nama Anggota 5", nomor: "555555", email: "anggota5@gmail.com" },
  { id: 6, name: "Nama Anggota 6", nomor: "666666", email: "anggota6@gmail.com" },
];

export default function Anggota() {
  const [anggotaList, setAnggotaList] = useState(dummyAnggota);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: number) => {
    const filtered = anggotaList.filter((anggota) => anggota.id !== id);
    setAnggotaList(filtered);
  };

  const filteredAnggota = anggotaList.filter((anggota) =>
    anggota.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="py-6 px-8">
      {/* Header dengan Judul + Search + Tambah */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="font-sans font-bold text-navy text-2xl">Anggota</h1>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama anggota..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link href="/anggota/tambah">
            <button className="bg-navy text-white hover:bg-blue font-sans font-semibold px-4 py-2 rounded-lg">
               + TAMBAH
            </button>
          </Link>
        </div>
      </div>

      {/* Card Anggota */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnggota.map((anggota) => (
          <div
            key={anggota.id}
            className="border border-navy rounded-lg p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold text-navy">{anggota.name}</h2>
            <p className="text-sm text-[#B0B3B8]">Nomor: {anggota.nomor}</p>
            <p className="text-sm text-[#B0B3B8]">Email: {anggota.email}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <Link href={`/anggota/peminjaman/${anggota.id}`}>
                <Button className="bg-[#2ECC40] text-white hover:bg-[#29b136]">
                  PEMINJAMAN
                </Button>
              </Link>

              <Link href={`/anggota/edit/${anggota.id}`}>
                <Button className="bg-yellow-300 text-black hover:bg-yellow-400">
                  EDIT
                </Button>
              </Link>

              <HapusAnggotaDialog
                onConfirm={() => handleDelete(anggota.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Prev</button>
        <button className="px-3 py-1 rounded bg-navy text-white">1</button>
        <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">2</button>
        <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">3</button>
        <span className="px-2 text-gray-500">...</span>
        <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Next</button>
      </div>
    </main>
  );
}
