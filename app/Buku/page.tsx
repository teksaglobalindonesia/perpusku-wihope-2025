"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/custom/navbar";
import { BukuHero } from "@/components/custom/bukuHero";
import { Footer } from "@/components/custom/footer";
import Pagination from "@/components/custom/pagination";
import Link from "next/link";
import { TOKEN, WIHOPE_NAME, BASE_URL } from "@/lib/constant";

export default function BukuPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [totalBooks, setTotalBooks] = useState(0);

  const itemsPerPage = 3;

useEffect(() => {
  const fetchBooks = async () => {
    try {
      const url = `${BASE_URL}/api/book/list?page=${currentPage}&page_size=${itemsPerPage}&search=${encodeURIComponent(search)}`;
      const book = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        cache: "no-store",
      });

      const dataBukus = await book.json();
      // const estimatedTotal = dataBukus.data.length === itemsPerPage
      //   ? (currentPage * itemsPerPage) + 1
      //   : currentPage * itemsPerPage;
      // console.log('Total buku dari API:', dataBukus.total);
      // console.log('Data yang diterima:', dataBukus.data.length);

      const formatted = dataBukus.data.map((item: any) => ({
        id: item.id,
        img: item.cover?.url ? `${BASE_URL}${item.cover.url}` : "/fallback.jpg",
        title: item.title,
        writer: item.writer,
        publisher: item.publisher,
        published_year: item.year,
        categories: item.categories?.map((k: any) => k.name).join(", ") || "-",
        stock: parseInt(item.stock) || 0,
      }));

      setBooks(formatted);
      setTotalBooks(dataBukus.total);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    }
  };

  fetchBooks();
}, [search, currentPage]);

  // console.log('Total Books:', totalBooks); 

  const totalPages = Math.ceil(totalBooks / itemsPerPage);
  // console.log('Total Pages:', totalPages);

  const handleClickDelete = (index: number) => {
    setSelectedBook(index);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedBook !== null) {
      const deletedBook = books[selectedBook].title;
      alert(`Buku "${deletedBook}" berhasil dihapus!`);
      setShowConfirm(false);
      setSelectedBook(null);
    }
  };

  return (
    <>
      <Navbar />
      <BukuHero />
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
              <button className="bg-action-success text-neutral-white px-4 py-1 rounded text-sm">
                TAMBAH
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {books.map((item: any, index) => (
            <div
              key={index}
              className="bg-neutral-white flex justify-between items-center rounded-md shadow px-6 py-4 border"
            >
              <div className="flex gap-4 items-start">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={90}
                  height={90}
                  className="rounded-md"
                  unoptimized
                />
                <div>
                  <h3 className="text-neutral-dbrown font-semibold text-[14px] font-inter">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-neutral-mbrown">
                    Penulis: <span className="font-bold">{item.writer}</span> <br />
                    Penerbit: <span className="font-bold">{item.publisher}</span> <br />
                    Kategori: <span className="font-bold">{item.categories}</span>
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Link href="/Buku/Edit">
                      <button className="bg-neutral-beige text-neutral-dbrown text-[12px] px-2 py-1 rounded">
                        EDIT
                      </button>
                    </Link>
                    <button
                      onClick={() => handleClickDelete(index)}
                      className="bg-brand-secondary text-neutral-white text-[12px] px-2 py-1 rounded"
                    >
                      HAPUS
                    </button>
                    {showConfirm && selectedBook === index && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-tint-4 rounded-md p-6 w-[350px] shadow-lg text-center">
                          <p className="text-sm text-neutral-dbrown mb-4">
                            Apakah yakin menghapus buku ini?
                          </p>
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
                {item.stock === 0 ? (
                  <span className="bg-red-500 text-white text-[12px] px-3 py-1 rounded font-bold">
                    HABIS
                  </span>
                ) : (
                  <span className="text-[12px] text-neutral-dbrown">
                    Stok: <span className="font-medium italic">{item.stock}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => setCurrentPage(page)} 
        />
      </div>
      <Footer />
    </>
  );
};
