'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Pagination from '../pagination';

type BookCategory = {
  id: number;
  name: string;
};

type Item = {
  id: number;
  title: string;
  writer: string;
  stock: number;
  cover?: {
    url: string;
    name: string;
    width: number;
    height: number;
  };
  publisher: string;
  categories?: BookCategory[];
  book_categories?: BookCategory;
};

type BookProps = {
  filterOutOfStock?: boolean; // kontrol tampilan buku habis
};

const Book: React.FC<BookProps> = ({ filterOutOfStock = false }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, bookRes] = await Promise.all([
          fetch(`${BASE_URL}/api/book-category/list`, {
            headers: {
              Authorization: TOKEN,
              'Content-Type': 'application/json',
              'x-wihope-name': WIHOPE_NAME
            }
          }),
          fetch(`${BASE_URL}/api/book/list`, {
            headers: {
              Authorization: TOKEN,
              'Content-Type': 'application/json',
              'x-wihope-name': WIHOPE_NAME
            }
          })
        ]);

        const catData = await catRes.json();
        const bookData = await bookRes.json();

        setCategories(catData.data || []);
        setItems(bookData.data || []);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (buku: Item) => {
    const category = buku.categories?.[0] || buku.book_categories;
    return category?.name || 'Belum dikategorikan';
  };

  const filteredItems = items.filter((buku) => {
    const q = keyword.toLowerCase();
    const matchesKeyword =
      buku.title.toLowerCase().includes(q) ||
      buku.writer.toLowerCase().includes(q) ||
      getCategoryName(buku).toLowerCase().includes(q);
    const matchesStock = filterOutOfStock ? buku.stock === 0 : true;
    return matchesKeyword && matchesStock;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <div className="ml-12">
          <input
            type="text"
            placeholder="Search by title, writer, or category..."
            className="mb-2 w-64 rounded border px-3 py-1"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {!filterOutOfStock && (
            <Link href="/book/add">
              <button className="text-md ml-4 rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
                Tambahkan Buku
              </button>
            </Link>
          )}
        </div>
      </div>

      {error && (
        <div className="mx-8 mb-4 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="mx-8 mb-4 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <p>Memuat data buku dan kategori dari server...</p>
          </div>
        </div>
      ) : (
        <div className="mx-8 mb-8 rounded-md p-4">
          {paginatedItems.length > 0 ? (
            <div className="space-y-4">
              {paginatedItems.map((buku) => (
                <div
                  key={buku.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                      {buku.cover?.url && (
                        <Image
                          src={`${BASE_URL}${buku.cover.url}`}
                          alt={buku.title}
                          width={100}
                          height={150}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        {buku.title}
                      </h3>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {(buku.categories || [buku.book_categories]).map(
                          (cat, i) =>
                            cat ? (
                              <span
                                key={cat.id || i}
                                className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                              >
                                📂 {cat.name}
                              </span>
                            ) : null
                        )}
                      </div>
                      <p className="mb-1 text-sm text-gray-600">
                        <span className="font-medium">Penulis:</span>{' '}
                        {buku.writer}
                      </p>
                      <p className="mb-3 text-sm text-gray-600">
                        <span className="font-medium">Penerbit:</span>{' '}
                        {buku.publisher}
                      </p>
                      <button className="rounded-lg bg-blue-600 px-3 py-1 text-white">
                        ✏️Edit
                      </button>
                      <button className="ml-2 rounded-lg bg-red-600 px-3 py-1 text-white">
                        🗑️Hapus
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    {buku.stock > 0 ? (
                      <div className="text-green-600">
                        <p className="text-lg font-semibold">{buku.stock}</p>
                        <p className="text-sm">tersedia</p>
                      </div>
                    ) : (
                      <span className="rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white">
                        HABIS
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <div className="mb-4 text-6xl">📚</div>
              <p className="mb-2 text-lg font-medium">
                {keyword || filterOutOfStock
                  ? 'Tidak ada hasil ditemukan'
                  : 'Belum ada data buku'}
              </p>
              {!keyword && !filterOutOfStock && (
                <Link href="/book/add">
                  <button className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                    Tambahkan Buku Pertama
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Book;
