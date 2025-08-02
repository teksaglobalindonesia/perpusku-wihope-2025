"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import HapusDialog from "@/components/custom/buku/hapuusbuku";

const dummyBooks = [
  {
    id: 1,
    title: "Pesta Bunuh Diri",
    genre: "Horor",
    author: "Daniel Ahmad",
    stock: 2,
    image: "/images/pesta bunuh diri.jpg",
  },
  {
    id: 2,
    title: "Indigo Tapi Penakut",
    genre: "Fiksi Remaja",
    author: "Angeline Stevanie",
    stock: 1,
    image: "/images/indigo tapi penakut.png",
  },
  {
    id: 3,
    title: "Cantik itu Luka",
    genre: "Historical",
    author: "Eka Kurniawan",
    stock: 0,
    image: "/images/cantik itu luka.jpg",
  },
  {
    id: 4,
    title: "Magma",
    genre: "Romantis",
    author: "Geladis Afira",
    stock: 2,
    image: "/images/magma.jpg",
  },
  {
    id: 5,
    title: "7 Prajurit Bapak",
    genre: "Fiksi Remaja",
    author: "Wulan Nuramalia",
    stock: 1,
    image: "/images/7 prajurit bapak.jpg",
  },
  {
    id: 6,
    title: "Laut Bercerita",
    genre: "Persahabatan",
    author: "Leila Salikha Chudori",
    stock: 0,
    image: "/images/laut bercerita.jpg",
  },
  {
    id: 7,
    title: "Re: dan peRempuan",
    genre: "Kisah Nyata",
    author: "Maman suherman",
    stock: 1,
    image: "/images/re dan perempuan.jpg",
  },
];

const ITEMS_PER_PAGE = 6;

export default function BukuPage({ data }: { data?: any[] }) {
  const [books, setBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://cms-perpusku.widhimp.my.id/api/book/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 41f0305043bf00843f3bc3c04d2201b51347f1bd98a0500248ec9b411fa0ad2dfb49563c46395439627e931db897841ca95f756f34ea8fe229f33641e45123732c362be24550a849bb67379afef4f1b0f9c5a30746cfbaa82825f3f9e9d4b62c14892afd3f520c614e6269404210184628530738a3037e0e246d0bc2cf655e75",
            "x-wihope-name": "nanda", 
          },
          cache: "no-store",
        });

        const json = await response.json();
        const fetchedData = json.data;

        const formatted = fetchedData.map((item: any) => ({
          id: item.id,
          title: item.title ?? "Tanpa Judul",
          genre: item.categories?.length > 0
                ? item.categories.map((cat: { name: any; }) => cat.name).join(", ")
                : "Tanpa Kategori",
          author: item.writer ?? "Tanpa Penulis",
          stock: item.stock ?? 0,
          image: item.cover?.url
    ? `https://cms-perpusku.widhimp.my.id${item.cover.url}`
    : "/images/default.jpg",
        }));

        setBooks(formatted);
      } catch (error) {
        console.error("Gagal mengambil data buku:", error);
      }
    })();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
        {paginatedBooks.map((book) => (
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
