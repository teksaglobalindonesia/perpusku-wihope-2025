'use client';

import React from 'react';
import Link from 'next/link';
import { books } from '@/app/bukuDummy/data';

const CthPilihBuku = () => {
  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-purple-500 px-3 py-1 text-3xl">
          <span className="font-normal text-blue-950 underline">
            Pilih Buku
          </span>
        </h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="rounded border px-3 py-1"
          />
          <Link href="/book/add">
            <button className="text-md mx-2 rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
              Tambahkan Buku
            </button>
          </Link>
        </div>
      </div>

      {/* Tabel Buku */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {books.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                  <img src={item.gambar} alt={item.judul} />
                </div>
                <div>
                  <p className="font-semibold">{item.judul}</p>
                  <p className="text-sm">{item.genre}</p>
                  <p className="text-sm">{item.penulis}</p>
                  <button className="my-1 rounded bg-purple-500 px-3 py-1 text-sm font-bold text-white">
                    Pilih
                  </button>
                </div>
              </div>

              {item.stok > 0 ? (
                <p>Stok: {item.stok}</p>
              ) : (
                <span className="rounded bg-red-500 px-2 py-1 text-sm text-white">
                  HABIS
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center space-x-2 text-sm text-gray-700">
          {['<', 1, 2, '...', 20, '>'].map((item, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-200"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CthPilihBuku;
