"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function PengembalianList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pengembalian, setPengembalian] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cms-perpusku.widhimp.my.id/api/return/list", {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 41f0305043bf00843f3bc3c04d2201b51347f1bd98a0500248ec9b411fa0ad2dfb49563c46395439627e931db897841ca95f756f34ea8fe229f33641e45123732c362be24550a849bb67379afef4f1b0f9c5a30746cfbaa82825f3f9e9d4b62c14892afd3f520c614e6269404210184628530738a3037e0e246d0bc2cf655e75",
            "x-wihope-name": "nanda",
          },
          cache: "no-store"
        });

        const data = await response.json();

        const transformed = data.data.map((item: any) => {
          const book = item.book;
          const member = item.member;
          const returnData = item.return;

          const loanDate = new Date(item.loan_date);
          const returnDate = new Date(item.return_date);
          const actualReturnDate = new Date(returnData?.actual_return_date);

          return {
            id: item.id,
            judul: book?.title || "-",
            peminjam: member?.name || "-",
            tanggalPinjam: formatDateTime(loanDate),
            tanggalKembali: formatDate(returnDate),
            dikembalikan: formatDate(actualReturnDate),
            terlambat: actualReturnDate > returnDate,
          };
        });

        setPengembalian(transformed);
      } catch (error) {
        console.error("Gagal mengambil data pengembalian:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const formatDateTime = (date: Date) =>
    date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filtered = pengembalian.filter((item) =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="font-sans text-sm space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-navy text-2xl">Pengembalian</h1>
        <input
          type="text"
          placeholder="Cari judul buku..."
          className="border border-navy px-3 py-2 rounded text-gray-500 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        paginated.map((item) => (
          <div key={item.id} className="border rounded p-4 shadow-sm flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{item.judul}</p>
                <p className="text-sm font-bold">Peminjam: {item.peminjam}</p>
                <p className="text-sm">Peminjaman: {item.tanggalPinjam}</p>
                <p className="text-sm">Pengembalian: {item.tanggalKembali}</p>
                <p className="text-sm">Dikembalikan: {item.dikembalikan}</p>
              </div>
              {item.terlambat && (
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-b-lg h-fit">
                  TERLAMBAT
                </span>
              )}
            </div>
          </div>
        ))
      )}

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
