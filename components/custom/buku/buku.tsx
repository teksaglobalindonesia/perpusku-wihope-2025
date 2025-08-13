"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import HapusDialog from "@/components/custom/buku/hapuusbuku";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

const itemsPerPage = 6;

export default function BukuPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/book/list?page=${currentPage}&page_size=${itemsPerPage}&search=${searchTerm}`,
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
          title: item.title ?? "Tanpa Judul",
          genre:
            item.categories?.length > 0
              ? item.categories.map((cat: { name: any }) => cat.name).join(", ")
              : "Tanpa Kategori",
          author: item.writer ?? "Tanpa Penulis",
          stock: item.stock ?? 0,
          image: item.cover?.url
            ? `https://cms-perpusku.widhimp.my.id${item.cover.url}`
            : "/images/default.jpg",
        }));

        setBooks(formatted);

        if (json.meta?.pagination?.total) {
          setTotalPages(Math.ceil(json.meta.pagination.total / itemsPerPage));
        }
      } catch (error) {
        console.error("Gagal mengambil data buku:", error);
      }
    };

    fetchBooks();
  }, [searchTerm, currentPage]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Buku</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded text-gray-700 w-48"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Button
            className="bg-navy hover:bg-blue text-white px-4"
            onClick={() => router.push("/buku/tambah")}
          >
            + TAMBAH
          </Button>
        </div>
      </div>

      {/* List Buku */}
      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between border rounded p-4 bg-white shadow-sm"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-16 h-20 object-cover rounded mr-4"
            />
            <div className="flex-1 space-y-1">
              <p className="font-bold">{book.title}</p>
              <p className="text-sm text-gray-600">Genre: {book.genre}</p>
              <p className="text-sm text-gray-600">By: {book.author}</p>
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-yellow-300 text-black hover:bg-yellow-400"
                  onClick={() => router.push(`/buku/edit/${book.id}`)}
                >
                  EDIT
                </Button>
                <HapusDialog
                  onConfirm={() => {
                    const updated = books.filter((b) => b.id !== book.id);
                    setBooks(updated);
                  }}
                />
              </div>
            </div>
            <div className="ml-4 text-right w-20">
              {book.stock > 0 ? (
                <span className="text-gray-800 font-semibold">
                  Stok: {book.stock}
                </span>
              ) : (
                <span className="bg-red-500 text-white px-2 py-1 rounded-r-lg text-sm font-bold">
                  HABIS
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-navy text-white hover:bg-blue-700"
          }`}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
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
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
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
