"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HapusAnggotaDialog from "@/components/custom/anggota/hapusanggota";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function Anggota() {
  const [anggotaList, setAnggotaList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 6;

  const fetchAnggota = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/member/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
             "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        }
      );

      const json = await response.json();
      const fetchedData = json.data;

      const formatted = fetchedData.map((item: any) => ({
        id: item.id,
        name: item.name ?? "Tanpa Nama",
        address: item.address ?? "-",
        email: item.email ?? "-",
        nomor: item.id_member ?? "-",
      }));

      setAnggotaList(formatted);

      if (json.meta?.pagination?.total) {
        setTotalItems(json.meta.pagination.total);
      } else if (typeof json.total === 'number') {
        setTotalItems(json.total);
      }
    } catch (error) {
      console.error("Gagal mengambil data anggota:", error);
    }
  };

  useEffect(() => {
    fetchAnggota();
  }, [searchTerm, currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleDelete = (id: number) => {
    const filtered = anggotaList.filter((anggota) => anggota.id !== id);
    setAnggotaList(filtered);
  };

  return (
    <main className="py-6 px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="font-sans font-bold text-navy text-2xl">Anggota</h1>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari nama anggota..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
        {anggotaList.map((anggota) => (
          <div
            key={anggota.id}
            className="border border-navy rounded-lg p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold text-navy">{anggota.name}</h2>
            <p className="text-sm text-[#B0B3B8]">ID: {anggota.nomor}</p>
            <p className="text-sm text-[#B0B3B8]">Address: {anggota.address}</p>
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

              <HapusAnggotaDialog onConfirm={() => handleDelete(anggota.id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-navy text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-navy text-white"
                : "bg-white text-navy border border-navy hover:bg-blue-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-navy text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
}
