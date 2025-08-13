"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";


export default function PeminjamanList() {
  const [peminjamanList, setPeminjamanList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 4;

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

        const formatted = fetchedData.map((item: any) => ({
          id: item.id,
          documentId: item.documentId ?? "Tanpa ID Dokumen",
          peminjam: item.member?.name ?? "Tanpa Nama",
          id_member: item.member?.id_member ?? "Tanpa ID Member",
          judul: item.book?.title ?? "Tanpa Judul",
          tanggal_pinjam: item.loan_date ?? "Tidak diketahui",
          tanggal_kembali: item.return_date ?? "Tidak diketahui",
          status_pinjam: item.status_pinjam ?? "Tidak diketahui",
          image: item.book?.cover?.url
            ? `https://cms-perpusku.widhimp.my.id${item.book.cover.url}`
            : "/images/default.jpg",
        }));

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

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4 font-sans text-sm">
      {/* Search dan Button Tambah */}
      <div className="flex items-center justify-end gap-4">
        <input
          type="text"
          placeholder="cari id dokumen..."
          className="border px-3 py-2 rounded text-gray-700 w-64"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Link href="/peminjaman/tambah">
          <Button className="bg-navy text-white hover:bg-blue px-6 py-2 rounded">
            + TAMBAH
          </Button>
        </Link>
      </div>

      {/* Daftar Peminjaman */}
      {peminjamanList.map((item) => (
        <div
          key={item.id}
          className="border rounded p-4 shadow-sm flex flex-col gap-1"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold">ID Dokumen: {item.documentId || "-"}</p>
              <p className="font-semibold text-sm">Judul: {item.judul}</p>
              <p className="font-semibold text-sm">
                Peminjam: {item.peminjam} ({item.id_member})
              </p>
              <p className="font-semibold text-sm">
                Tanggal Pinjam: {formatTanggal(item.tanggal_pinjam)}
              </p>
              <p className="font-semibold text-sm">
                Tanggal Kembali: {formatTanggal(item.tanggal_kembali)}
              </p>
              <Button className="bg-navy text-white hover:bg-blue px-4 py-1 rounded mt-2">
                KEMBALIKAN
              </Button>
            </div>
            {getStatusBadge(item.status_pinjam)}
          </div>
        </div>
      ))}

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

function getStatusBadge(status: string | undefined) {
  const value = status?.toLowerCase();

  switch (value) {
    case "dikembalikan":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Dikembalikan</Badge>
      );
    case "terlambat":
      return <Badge variant="destructive">Terlambat</Badge>;
    case "sedang_dipinjam":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">Dipinjam</Badge>
      );
    default:
      return <Badge className="bg-gray-300 text-black">Tidak Diketahui</Badge>;
  }
}
