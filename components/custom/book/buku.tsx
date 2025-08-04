'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Pagination from '../pagination';

type BookCategory = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
};

type Item = {
  id: number;
  title: string;
  book_categories?:
    | {
        name: string;
        id: number;
      }
    | BookCategory;
  categories?: BookCategory[];
  writer: string;
  stock: number;
  gambar: string;
  publisher: string;
};

const Book = () => {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/book-category/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        cache: 'no-store'
      });

      if (response.ok) {
        const json = await response.json();
        console.log('📚 Categories dari API:', json.data);
        setCategories(json.data || []);
      }
    } catch (err) {
      console.error('❌ Error fetch categories:', err);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/book/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }

      const json = await response.json();
      console.log('📖 Books dari API:', json.data);
      console.log('📖 Sample book:', json.data?.[0]);
      setItems(json.data || []);
    } catch (err: any) {
      console.error('❌ Error saat fetch books:', err);
      setError(err.message || 'Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCategories(), fetchBooks()]);
    };
    fetchData();
  }, []);

  const getCategoryName = (book: Item): string => {
    console.log(`🔍 Debug book ${book.id}:`, {
      book_categories: book.book_categories,
      categories: (book as any).categories,
      all_book_fields: Object.keys(book)
    });

    const bookData = book as any;

    if (
      bookData.categories &&
      Array.isArray(bookData.categories) &&
      bookData.categories.length > 0
    ) {
      const firstCategory = bookData.categories[0];
      if (firstCategory.name) {
        console.log(`✅ Found category in array: ${firstCategory.name}`);
        return firstCategory.name;
      }
    }

    if (book.book_categories?.name) {
      console.log(
        `✅ Found category name directly: ${book.book_categories.name}`
      );
      return book.book_categories.name;
    }

    if (book.book_categories?.id) {
      const category = categories.find(
        (cat) => cat.id === book.book_categories?.id
      );
      console.log(
        `🔍 Looking for category ID ${book.book_categories.id}, found:`,
        category
      );
      return category?.name || `ID ${book.book_categories.id} tidak ditemukan`;
    }

    if (bookData.category_id) {
      const category = categories.find(
        (cat) => cat.id === bookData.category_id
      );
      console.log(
        `🔍 Looking for category_id ${bookData.category_id}, found:`,
        category
      );
      return (
        category?.name || `Category ID ${bookData.category_id} tidak ditemukan`
      );
    }

    console.log(`❌ No category found for book ${book.id}`);
    return 'Belum dikategorikan';
  };

  const hasilPencarian = items.filter((buku) => {
    const titleMatch = buku.title.toLowerCase().includes(keyword.toLowerCase());
    const writerMatch = buku.writer
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const categoryMatch = getCategoryName(buku)
      .toLowerCase()
      .includes(keyword.toLowerCase());

    return titleMatch || writerMatch || categoryMatch;
  });

  return (
    <div className="min-h-[540px] w-full">
      {/* Header dan search */}
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-blue-200 px-3 py-1 text-3xl">
          📚
          <span className="font-normal text-blue-950 underline">
            List Buku Perpusku
          </span>
        </h1>
        <div className="ml-12">
          <input
            type="text"
            placeholder="Search by title, writer, or category..."
            className="mb-3 w-64 rounded border px-3 py-1"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Link href="/book/add">
            <button className="text-md mx-2 rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
              Tambahkan Buku
            </button>
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-8 mb-4 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mx-8 mb-4 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <p>Memuat data buku dan kategori dari server...</p>
          </div>
        </div>
      )}

      {/* Daftar Buku */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {hasilPencarian.map((buku) => (
            <div
              key={buku.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                  <img
                    src={buku.gambar}
                    alt={buku.title}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-book.png';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    {buku.title}
                  </h3>

                  {/* Kategori - FIXED untuk array categories */}
                  <div className="mb-2">
                    {/* Jika ada multiple categories, tampilkan semua */}
                    {(buku as any).categories &&
                    Array.isArray((buku as any).categories) ? (
                      <div className="flex flex-wrap gap-1">
                        {(buku as any).categories.map(
                          (category: BookCategory, index: number) => (
                            <span
                              key={category.id || index}
                              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                            >
                              📂 {category.name}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        📂 {getCategoryName(buku)}
                      </span>
                    )}
                  </div>

                  <p className="mb-1 text-sm text-gray-600">
                    <span className="font-medium">Penulis:</span> {buku.writer}
                  </p>

                  <p className="mb-3 text-sm text-gray-600">
                    <span className="font-medium">Penerbit:</span>{' '}
                    {buku.publisher}
                  </p>

                  <div className="flex gap-2">
                    <Link href={`/book/edit?id=${buku.id}`}>
                      <button className="rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white transition-colors hover:bg-blue-600">
                        ✏️ Edit
                      </button>
                    </Link>
                    <button className="rounded bg-red-500 px-3 py-1 text-sm font-bold text-white transition-colors hover:bg-red-600">
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Stok */}
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
        </div>

        {/* Empty State */}
        {hasilPencarian.length === 0 && !loading && (
          <div className="py-12 text-center text-gray-500">
            <div className="mb-4 text-6xl">📚</div>
            {keyword ? (
              <div>
                <p className="mb-2 text-lg font-medium">
                  Tidak ada hasil pencarian
                </p>
                <p>Coba kata kunci yang berbeda untuk "{keyword}"</p>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-lg font-medium">Belum ada data buku</p>
                <Link href="/book/add">
                  <button className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                    Tambahkan Buku Pertama
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {hasilPencarian.length > 0 && <Pagination />}
      </div>
    </div>
  );
};

export default Book;
