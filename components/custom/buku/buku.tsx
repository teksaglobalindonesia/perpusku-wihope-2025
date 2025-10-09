"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import HapusBukuDialog from "@/components/custom/buku/hapuusbuku";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import gsap from "gsap";

const itemsPerPage = 6;

export default function BukuPage({ data }: { data: any[] }) {
  const [books, setBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const fetchBooks = async () => {
    try {
      // Fade out sebelum ambil data baru
      await gsap.to(".book-card", {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.05,
      });

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
        documentId: item.documentId,
        title: item.title ?? "Tanpa Judul",
        genre:
          item.categories?.length > 0
            ? item.categories.map((cat: { name: any }) => cat.name).join(", ")
            : "Tanpa Kategori",
        author: item.writer ?? "Tanpa Penulis",
        stock: item.stock ?? 0,
        image: item.cover?.url
          ? `https://cms-perpusku.widhimp.my.id${item.cover.url}`
          : "",
      }));

      setBooks(formatted);

      if (json.meta?.pagination?.total) {
        setTotalPages(Math.ceil(json.meta.pagination.total / itemsPerPage));
      }
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const handler = () => fetchBooks();
    window.addEventListener("books-updated", handler);
    return () => window.removeEventListener("books-updated", handler);
  }, []);

  // Animasi masuk setelah data di-set
  useEffect(() => {
    if (books.length > 0) {
      gsap.fromTo(
        ".book-card",
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    }
  }, [books]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="font-sans font-bold text-navy text-2xl">Buku</h1>

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
          <Button
            className="bg-navy text-white hover:bg-blue font-sans font-semibold px-4 py-2 rounded-lg w-full md:w-auto"
            onClick={() => router.push("/buku/tambah")}
          >
            + TAMBAH
          </Button>
        </div>
      </div>

      {/* Grid Buku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card border rounded-lg shadow-sm bg-white p-3 flex flex-col transition hover:shadow-md hover:scale-[1.01]"
          >
            {/* Gambar */}
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover rounded-md shadow-sm transition-transform duration-200 hover:scale-105"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded-md text-gray-500 text-xs">
                No Cover
              </div>
            )}

            {/* Detail */}
            <h2 className="font-semibold text-navy text-base truncate mt-2">
              {book.title}
            </h2>
            <p className="text-xs text-gray-600">By: {book.author}</p>

            {/* Genre */}
            <div className="flex flex-wrap gap-1 mt-1">
              {book.genre !== "Tanpa Kategori" ? (
                book.genre.split(", ").map((g: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded"
                  >
                    {g}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-gray-500">Tanpa Kategori</span>
              )}
            </div>

            {/* Stok */}
            <div className="mt-1">
              {book.stock > 0 ? (
                <span className="text-xs font-semibold text-gray-800">
                  Stok: {book.stock}
                </span>
              ) : (
                <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                  HABIS
                </span>
              )}
            </div>

            {/* Aksi */}
            <div className="flex gap-2 mt-2">
              <Button
                className="bg-yellow-300 text-black hover:bg-yellow-400 text-xs px-2 py-1"
                onClick={() => router.push(`/buku/edit/${book.documentId}`)}
              >
                EDIT
              </Button>
              <HapusBukuDialog
                documentId={book.documentId}
                onConfirm={() => {
                  const updated = books.filter(
                    (b) => b.documentId !== book.documentId
                  );
                  setBooks(updated);
                  window.dispatchEvent(new Event("books-updated"));
                }}
              />
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
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
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
