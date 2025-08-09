'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

type BookCategory = {
  id: number;
  name: string;
};

type Item = {
  id: number;
  title: string;
  writer: string;
  stock: number;
  gambar: string;
  publisher: string;
  categories?: BookCategory[];
  book_categories?: BookCategory;
};

const CthPilihBuku = () => {
  const [books, setBooks] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book/list`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });
        const data = await res.json();
        setBooks(data?.data || []);
      } catch (error) {
        console.error('Gagal fetch data buku:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-purple-500 px-3 py-1 text-3xl">
          <span className="font-normal text-blue-950 underline">
            Pilih Buku
          </span>
        </h1>
        <input
          type="text"
          placeholder="Search by title, name, or date"
          className="mb-3 w-64 rounded border px-3 py-1"
        />
      </div>

      <div className="mx-8 mb-8 rounded-md p-4">
        {loading ? (
          <p className="text-center">Memuat data buku...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada buku ditemukan.</p>
        ) : (
          <div className="space-y-4">
            {books.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                    <img
                      src={item.gambar}
                      alt={item.title}
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    {/* <p className="text-sm">{item.categories}</p> */}
                    <p className="text-sm">{item.writer}</p>
                    <button className="my-1 rounded bg-purple-500 px-3 py-1 text-sm font-bold text-white">
                      Pilih
                    </button>
                  </div>
                </div>

                {item.stock > 0 ? (
                  <p>Stok: {item.stock}</p>
                ) : (
                  <span className="rounded bg-red-500 px-2 py-1 text-sm text-white">
                    HABIS
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CthPilihBuku;
