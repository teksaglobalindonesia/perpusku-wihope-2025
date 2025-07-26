'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { books } from '@/app/bukuDummy/data';

type Item = {
  id: number;
  judul: string;
  genre: string;
  penulis: string;
  stok: number;
  gambar: string;
};

const Book = () => {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>(books);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNama, setSelectedNama] = useState<string | null>(null);

  const handleHapusClick = (nama: string) => {
    setSelectedNama(nama);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedNama !== null) {
      setItems((prev) => prev.filter((item) => item.judul !== selectedNama));
      setSelectedNama(null);
      setShowConfirm(false);
    }
  };

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-blue-200 px-3 py-1 text-3xl">
          📚
          <span className="font-normal text-blue-950 underline">
            List Buku Perpusku
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
          {items.map((item) => (
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
                  <Link href={`/book/edit?id=${item.id}`}>
                    <button className="my-1 rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="mx-2 my-1 rounded bg-red-500 px-3 py-1 text-sm font-bold text-white"
                    onClick={() => handleHapusClick(item.judul)}
                  >
                    Hapus
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

      {/* Popup Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-md bg-white p-6 text-center shadow-lg">
            <p>
              Apakah kamu yakin ingin menghapus <strong>{selectedNama}</strong>?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="rounded bg-gray-300 px-4 py-2"
                onClick={() => setShowConfirm(false)}
              >
                Tidak
              </button>
              <button
                className="rounded bg-red-600 px-4 py-2 text-white"
                onClick={confirmDelete}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
