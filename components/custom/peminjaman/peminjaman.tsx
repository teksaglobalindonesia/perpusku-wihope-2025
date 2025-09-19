"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function PeminjamanList() {
  const [peminjamanList, setPeminjamanList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPeminjaman = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/loan/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchTerm}`,
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

        const formatted = fetchedData.map((item: any) => {
          const returnDate = new Date(item.return_date);
          const now = new Date();

          let status = item.status_pinjam ?? "Tidak diketahui";
          if (status.toLowerCase() === "sedang_dipinjam" && now > returnDate) {
            status = "terlambat";
          }

          return {
            id: item.id,
            documentId: item.documentId ?? "Tanpa ID Dokumen",
            peminjam: item.member?.name ?? "Tanpa Nama",
            id_member: item.member?.id_member ?? "Tanpa ID Member",
            judul: item.book?.title ?? "Tanpa Judul",
            tanggal_pinjam: item.loan_date ?? "Tidak diketahui",
            tanggal_kembali: item.return_date ?? "Tidak diketahui",
            status_pinjam: status,
          };
        });

        setPeminjamanList(formatted);
        if (json.meta?.pagination?.total) {
          setTotalItems(json.meta.pagination.total);
        } else if (typeof json.total === "number") {
          setTotalItems(json.total);
        }
      } catch (error) {
        console.error("Gagal mengambil data peminjaman:", error);
      }
    };

    fetchPeminjaman();
  }, [searchTerm, currentPage]);

  const handleReturn = async (loanId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/return/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({
          data: {
            loan: loanId,
            actual_return_date: new Date().toISOString().split("T")[0],
          },
        }),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Gagal mengembalikan buku. Status: ${res.status}`);
      }

      alert("Buku berhasil dikembalikan!");
      setPeminjamanList((prev) =>
        prev.filter((item) => item.documentId !== loanId)
      );
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengembalikan buku");
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-6 font-sans text-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="font-sans font-bold text-navy text-2xl">Peminjaman</h1>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari id dokumen..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Link href="/peminjaman/tambah" className="w-full md:w-auto">
            <Button className="bg-navy text-white hover:bg-blue font-sans font-semibold px-4 py-2 rounded-lg w-full md:w-auto">
              + TAMBAH
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid Peminjaman */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {peminjamanList.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-sm bg-white flex flex-col overflow-hidden"
          >
            {/* Strip Status */}
            <div
              className={`h-2 ${
                item.status_pinjam.toLowerCase() === "dikembalikan"
                  ? "bg-green-500"
                  : item.status_pinjam.toLowerCase() === "terlambat"
                  ? "bg-red-500"
                  : item.status_pinjam.toLowerCase() === "sedang_dipinjam"
                  ? "bg-yellow-500"
                  : "bg-gray-300"
              }`}
            />

            {/* Isi Card */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Info Peminjam */}
                <div>
                  <p className="font-bold text-navy">{item.peminjam}</p>
                  <p className="text-xs text-gray-500">
                    ID Member: {item.id_member}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID Dokumen: {item.documentId}
                  </p>
                </div>

                {/* Info Buku */}
                <div>
                  <p className="font-semibold">{item.judul}</p>
                  <p className="text-xs text-gray-600">
                    Pinjam: {formatTanggal(item.tanggal_pinjam)}
                  </p>
                  <p className="text-xs text-gray-600">
                    Kembali: {formatTanggal(item.tanggal_kembali)}
                  </p>
                </div>
              </div>

              {/* Button */}
              <Button
                className="bg-navy text-white hover:bg-blue w-full mt-4"
                onClick={() => handleReturn(item.documentId)}
              >
                KEMBALIKAN
              </Button>
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
    </div>
  );
}

function formatTanggal(input: string) {
  if (!input) return "-";
  const date = new Date(input);
  return format(date, "dd MMMM yyyy, HH:mm", { locale: undefined });
}
