'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Pagination from '../pagination';

type Item = {
  id: number;
  title: string;
  genre: string;
  writer: string;
  stock: number;
  gambar: string;
};

const Book = () => {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
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
        setItems(json.data || []);
      } catch (err: any) {
        console.error('❌ Error saat fetch:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-[540px] w-full">
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
            placeholder="Search..."
            className="mb-3 rounded border px-3 py-1"
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
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mx-8 mb-4 py-4 text-center">
          <p>Memuat data buku dari server...</p>
        </div>
      )}

      {/* Tabel Buku */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                  <img
                    src={item.gambar}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm">{item.genre}</p>
                  <p className="text-sm">{item.writer}</p>
                  <Link href={`/book/edit?id=${item.id}`}>
                    <button className="my-1 rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="mx-2 my-1 rounded bg-red-500 px-3 py-1 text-sm font-bold text-white"
                    disabled
                  >
                    Hapus
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

        <Pagination />
      </div>
    </div>
  );
};

export default Book;
