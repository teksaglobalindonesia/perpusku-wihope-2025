"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { API_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";


export default function PengembalianList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pengembalian, setPengembalian] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://cms-perpusku.widhimp.my.id/api/return/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchTerm}`,
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
        const pageCount = data.pagination?.pageCount || 1;
        setTotalPages(pageCount);
      } catch (error) {
        console.error("Gagal mengambil data pengembalian:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, currentPage]);

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

  return (
    <div className="font-sans text-sm space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-navy text-2xl">Pengembalian</h1>
        <input
          type="text"
          placeholder="Cari judul buku..."
          className="border border-navy px-3 py-2 rounded text-gray-500 w-64"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        pengembalian.map((item) => (
          <div
            key={item.id}
            className="border rounded p-4 shadow-sm flex flex-col gap-1"
          >
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
