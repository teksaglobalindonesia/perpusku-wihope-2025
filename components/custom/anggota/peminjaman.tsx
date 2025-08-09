"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { API_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";


interface Peminjaman {
  id: number;
  documentId: string;
  peminjam: string;
  id_member: string;
  judul: string;
  tanggal_pinjam: string;
  tanggal_kembali: string;
  status_pinjam: string;
  image: string;
}

export default function PeminjamanAnggota({ id }: { id: string }) {
  const [data, setData] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchPeminjaman = async () => {
      try {
        const response = await fetch(
          `https://cms-perpusku.widhimp.my.id/api/loan/list?page=${currentPage}&page_size=${itemsPerPage}`,
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

        const filtered = fetchedData.filter((item: any) => `${item.member?.id}` === id);

        const formatted: Peminjaman[] = filtered.map((item: any) => ({
          id: item.id,
          documentId: item.documentId ?? "Tanpa ID Dokumen",
          peminjam: item.member?.name ?? "Tanpa Nama",
          id_member: item.member?.id_member ?? "Tanpa ID Member",
          judul: item.book?.title ?? "Tanpa Judul",
          tanggal_pinjam: item.loan_date ?? "Tidak diketahui",
          tanggal_kembali: item.return_date ?? "Tidak diketahui",
          status_pinjam: item.status_pinjam ?? "DIPINJAM",
          image: item.book?.cover?.url
            ? `https://cms-perpusku.widhimp.my.id${item.book.cover.url}`
            : "/images/default.jpg",
        }));

        setData(formatted);
        setTotalItems(formatted.length);
      } catch (error) {
        console.error("Gagal fetch data peminjaman:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPeminjaman();
    }
  }, [id, currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-navy">Peminjaman Anggota ID: {id}</h1>

      {loading ? (
        <p>Memuat data...</p>
      ) : data.length === 0 ? (
        <p>Tidak ada data peminjaman.</p>
      ) : (
        data.map((item) => (
          <div
            key={`api-${item.id}`}
            className="border rounded p-4 shadow-sm flex flex-col gap-1 bg-white"
          >
            <p className="font-bold text-navy">{item.judul}</p>
            <p className="text-sm text-gray-700">Tanggal Pinjam: {item.tanggal_pinjam}</p>
            <p className="text-sm text-gray-700">Tanggal Kembali: {item.tanggal_kembali}</p>

            <div className="mt-2 flex justify-between items-center">
              {item.status_pinjam !== "DIKEMBALIKAN" && (
                <Button className="bg-[#F9CA24] text-black px-4 py-1 rounded hover:bg-[#f5b041]">
                  Kembalikan
                </Button>
              )}
              <span
                className={`text-xs px-2 py-1 rounded text-white ${
                  item.status_pinjam === "TERLAMBAT"
                    ? "bg-red-500"
                    : item.status_pinjam === "DIKEMBALIKAN"
                    ? "bg-green-400"
                    : "bg-cyan-400"
                }`}
              >
                {item.status_pinjam}
              </span>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-navy text-white hover:bg-blue-700"
          }`}
          disabled={currentPage === 1}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-navy text-white hover:bg-blue-700"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
