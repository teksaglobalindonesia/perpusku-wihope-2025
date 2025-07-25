"use client";
import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/custom/navbar";
import { BukuHero } from "@/components/custom/bukuHero";
import { Footer } from "@/components/custom/footer";
import Link from "next/link";

const dummyData = [
  {
    img: "/aset/Aroma Karsa.jpg",
    title: "Aroma Karsa",
    genre: "Adventure, romance, mystery",
    author: "Dee Lestari",
    stock: 2,
  },
  {
    img: "/aset/Bumi Manusia.jpg",
    title: "Bumi Manusia",
    genre: "Romance, historical",
    author: "Pramoedya Ananta Toer",
    stock: 1,
  },
  {
    img: "/aset/Laut Bercerita.jpeg",
    title: "Laut Bercerita",
    genre: "historical, drama",
    author: "Leila S. Chudori",
    stock: 0,
  },
  {
    img: "/aset/Negeri 5 Menara.jpg",
    title: "Negeri 5 Menara",
    genre: "Inspirational",
    author: "A. Fuadi",
    stock: 2,
  },
  {
    img: "/aset/Gadis Kretek.jpg",
    title: "Gadis Kretek",
    genre: "Romance, drama",
    author: "Ratih Kumala",
    stock: 1,
  },
  {
    img: "/aset/Pulang.jpeg",
    title: "Pulang",
    genre: "Drama, romance",
    author: "Tere Liye",
    stock: 0,
  },
];

export default function BukuPage() {
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const handleClickDelete = (index: number) => {
  setSelectedBook(index);
  setShowConfirm(true);
};

const confirmDelete = () => {
  if (selectedBook !== null) {
    const deletedBook = dummyData[selectedBook].title;
    alert(`Buku "${deletedBook}" berhasil dihapus!`);
    setShowConfirm(false);
  }
};

  const filteredBooks = dummyData.filter((buku) =>
    buku.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <BukuHero/>
      <div className="p-6 bg-tint-4 min-h-screen">
        <div className="flex justify-center items-center mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Link href="/Buku/tambah">
              <button className="bg-action-success text-neutral-white px-4 py-1 rounded text-sm">TAMBAH</button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              className="bg-neutral-white flex justify-between items-center rounded-md shadow px-6 py-4 border"
            >
              <div className="flex gap-4 items-start">
                <Image
                  src={book.img}
                  alt={book.title}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <h3 className="text-neutral-dbrown font-semibold text-[14px] font-inter">
                    {book.title}
                  </h3>
                  <p className="text-[12px] text-neutral-mbrown">
                    {book.genre} <br />
                    {book.author}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Link href="/Buku/Edit">
                      <button className="bg-neutral-beige text-neutral-dbrown text-[12px] px-2 py-1 rounded">
                        EDIT
                      </button>
                    </Link>
                    <button onClick={() => handleClickDelete(index)} className="bg-brand-secondary text-neutral-white text-[12px] px-2 py-1 rounded">
                      HAPUS
                    </button>
                    {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div className="bg-tint-4 rounded-md p-6 w-[350px] shadow-lg text-center">
                        <p className="text-sm text-neutral-dbrown mb-4">Apakah yakin menghapus buku ini?</p>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={confirmDelete}
                            className="bg-action-error hover:bg-red-500 text-neutral-white px-4 py-1 rounded text-sm"
                          >
                            Hapus
                          </button>
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="bg-brand-info hover:bg-gray-400 text-neutral-white px-4 py-1 rounded text-sm"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>

              <div>
                {book.stock === 0 ? (
                  <span className="bg-red-500 text-white text-[12px] px-3 py-1 rounded font-bold">
                    HABIS
                  </span>
                ) : (
                  <span className="text-[12px] text-neutral-dbrown">
                    Stok: {book.stock}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items items-center justify-center space-x-2 my-8">
            <a href="#" className="px-4 py-2 border rounded-md">&laquo;</a>
            <a href="#" className="px-2 py-2 border rounded-md bg-neutral-mbrown text-neutral-white">1</a>
            <a href="#" className="px-2 py-2 text-neutral-dbrown">2</a>
            <a href="#" className="px-2 py-2 text-neutral-dbrown">3</a>
            <a href="#" className="px-2 py-2 text-neutral-dbrown">...</a>
            <a href="#" className="px-4 py-2 border rounded-md">&raquo;</a>
        </div>
      </div>
      <Footer />
    </>
  );
}
