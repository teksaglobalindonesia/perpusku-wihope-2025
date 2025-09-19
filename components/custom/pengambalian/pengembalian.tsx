"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function PengembalianList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pengembalian, setPengembalian] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 6;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/return/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchTerm}`,
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
        const actualReturnDate = returnData?.actual_return_date
          ? new Date(returnData.actual_return_date)
          : null;

        return {
          id: item.id,
          loanId: item.documentId,
          judul: book?.title || "-",
          peminjam: member?.name || "-",
          tanggalPinjam: formatDateTime(loanDate),
          tanggalKembali: formatDate(returnDate),
          dikembalikan: actualReturnDate ? formatDate(actualReturnDate) : "-",
          terlambat: actualReturnDate
            ? actualReturnDate.getTime() > returnDate.getTime()
            : false,
          sudahDikembalikan: !!actualReturnDate,
        };
      });

      setPengembalian(transformed);

      const totalItems =
        data.meta?.pagination?.total || data.pagination?.total || 0;
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } catch (error) {
      console.error("Gagal mengambil data pengembalian:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

      window.dispatchEvent(new Event("books-updated"));

      fetchData();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengembalikan buku");
    }
  };

  return (
    <div className="font-sans text-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="font-sans font-bold text-navy text-2xl">Pengembalian</h1>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Cari judul buku..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Grid Pengembalian */}
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pengembalian.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-sm bg-white flex flex-col overflow-hidden"
            >
              {/* Strip Status */}
              <div
                className={`h-2 ${
                  item.sudahDikembalikan
                    ? item.terlambat
                      ? "bg-red-500"
                      : "bg-green-500"
                    : "bg-yellow-500"
                }`}
              />

              {/* Isi Card */}
              <div className="p-4 flex-1">
                <p className="font-bold text-navy">{item.judul}</p>
                <p className="text-xs text-gray-600">
                  Peminjam: {item.peminjam}
                </p>
                <p className="text-xs text-gray-600">
                  Peminjaman: {item.tanggalPinjam}
                </p>
                <p className="text-xs text-gray-600">
                  Pengembalian: {item.tanggalKembali}
                </p>
                <p className="text-xs text-gray-600">
                  Dikembalikan: {item.dikembalikan}
                </p>
              </div>

              {/* Action Bar */}
              <div className="border-t bg-gray-50 p-2">
                {item.sudahDikembalikan ? (
                  <span
                    className={`block text-center text-white text-sm px-3 py-2 rounded ${
                      item.terlambat ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {item.terlambat ? "TERLAMBAT" : "DIKEMBALIKAN"}
                  </span>
                ) : (
                  <Button
                    className="bg-navy text-white hover:bg-blue w-full"
                    onClick={() => handleReturn(item.loanId)}
                  >
                    KEMBALIKAN
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
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
          disabled={currentPage === totalPages || pengembalian.length === 0}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages || pengembalian.length === 0
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

function formatDate(date: Date) {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date: Date) {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
