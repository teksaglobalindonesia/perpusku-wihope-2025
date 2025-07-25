"use client";


import { id } from 'date-fns/locale';
import Link from 'next/link';
import { useState } from 'react';

export const PeminjamanHero = () => {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const peminjam = [
    {
      id: 1,
      title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
      peminjam: 'Widhi',
      waktu: '17 Juli 2025, 08.00',
      pengembalian: '24 Juli 2025'
    },
    {
      id: 2,
      title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
      peminjam: 'Widhi',
      waktu: '17 Juli 2025, 08.00',
      pengembalian: '24 Juli 2025',
      label: 'Terlambat'
    },
    {
      id: 3,
      title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
      peminjam: 'Widhi',
      waktu: '17 Juli 2025, 08.00',
      pengembalian: '24 Juli 2025'
    },
    {
      id: 4,
      title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
      peminjam: 'Widhi',
      waktu: '17 Juli 2025, 08.00',
      pengembalian: '24 Juli 2025',
      label: 'terlambat'
    },
    {
      id: 5,
      title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
      peminjam: 'Widhi',
      waktu: '17 Juli 2025, 08.00',
      pengembalian: '24 Juli 2025'
    },
    {
      id: 6,
      title: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
      peminjam: 'Widhi',
      waktu: '17 Juli 2025, 08.00',
      pengembalian: '24 Juli 2025',
      label: 'Terlambat'
    }
  ];
  return (
    <>
      <div className="h-[550px] w-full gap-4 p-6">
        <div className="w-full rounded p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-[25px] font-semibold">Peminjaman</h1>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
              />
              <Link href="/buku/tambah">
                <button className="rounded-md bg-green-400 px-4 py-2">
                  TAMBAH
                </button>
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {peminjam.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm"
              >
                <div className="flex flex-1 flex-col">
                  <strong className="font-semibold">{item.title}</strong>
                  <span>{item.peminjam}</span>
                  <span>{item.waktu}</span>
                  <span>{item.pengembalian}</span>
                  <div>
                    <button className="rounded bg-green-500 px-4 py-2 text-white">
                      KEMBALIKAN
                    </button>
                  </div>
                </div>
                {item.label && (
                  <span className="rounded bg-red-500 px-2 py-1 text-white">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-2 text-sm text-gray-700">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="rounded border px-3 py-1 hover:bg-gray-200 disabled:opacity-50"
            >
              &lt;
            </button>

            <span className="rounded border px-3 py-1">{page}</span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="rounded border px-3 py-1 hover:bg-gray-200 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
