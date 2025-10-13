'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

type Book = {
  id: number;
  documentId: string;
  title: string;
  stock: number;
};

export default function CthPilihBuku() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        let page = 1;
        let allBooks: Book[] = [];
        let totalPages = 1;

        do {
          const res = await fetch(`${BASE_URL}/api/book/list?page=${page}`, {
            headers: { Authorization: TOKEN, 'x-wihope-name': WIHOPE_NAME },
            cache: 'no-store'
          });
          const data = await res.json();
          allBooks = allBooks.concat(data?.data ?? []);
          totalPages = data?.meta?.pagination?.page_count || 1;
          page++;
        } while (page <= totalPages);

        setBooks(allBooks);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat buku');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">⚠️ {error}</p>;
  if (books.length === 0)
    return <p className="p-4">Tidak ada buku ditemukan</p>;

  return (
    <div className="p-6">
      <div className="p-6">.</div>
      <h1 className="mb-4 mt-2 text-xl font-bold">Pilih Buku</h1>
      <div className="grid gap-4">
        {books.map((book) => {
          const isOutOfStock = book.stock === 0;

          return (
            <div
              key={book.documentId}
              className="flex items-center justify-between rounded bg-gray-100 p-4 shadow dark:bg-slate-800"
            >
              <div>
                <p className="font-semibold">{book.title}</p>
                <p className="text-sm text-gray-600">Stock: {book.stock}</p>
                {isOutOfStock && (
                  <p className="text-sm font-semibold text-red-500">Habis</p>
                )}
              </div>
              <Link
                href={
                  !isOutOfStock
                    ? `/peminjaman/add?documentId_buku=${
                        book.documentId
                      }&book_name=${encodeURIComponent(book.title)}`
                    : '#'
                }
                className={`rounded px-3 py-1 text-white ${
                  isOutOfStock
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={(e) => isOutOfStock && e.preventDefault()}
              >
                Pilih
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
