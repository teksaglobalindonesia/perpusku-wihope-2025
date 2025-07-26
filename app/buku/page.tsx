"use client";

import { useState } from "react";
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

export default function BukuPage() {
  const [books, setBooks] = useState(dummyBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between border rounded p-4 bg-white shadow-sm"
          >
            {/* gambar */}
            <img
              src={book.image}
              alt={book.title}
              className="w-16 h-20 object-cover rounded mr-4"
            />

            {/* info buku */}
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

            {/*  Stok */}
            <div className="ml-4 text-right w-20">
              {book.stock > 0 ? (
                <span className="text-gray-800 font-semibold">Stok: {book.stock}</span>
              ) : (
                <span className="bg-red-500 text-white px-2 py-1 rounded-r-lg text-sm font-bold">
                  HABIS
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* nomor di bawah card */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Prev</button>
        <button className="px-3 py-1 rounded bg-navy text-white">1</button>
        <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">2</button>
        <button className="px-3 py-1 rounded bg-white text-navy border border-navy hover:bg-blue-100">3</button>
        <span className="px-2 text-gray-500">...</span>
        <button className="px-3 py-1 rounded bg-navy text-white hover:bg-blue-700">Next</button>
      </div>
    </div>
  );
}
