'use client';

import Image from 'next/image';
import { useState } from 'react';

export const Dashboard = () => {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  return (
    <div className=" h-[550px] w-full gap-4 p-6 ">
      <h1 className="text-[25px] not-italic ">Dashboard</h1>
      {/* Card 1 */}
      <div className="w-full rounded p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Buku Stok Habis</h1>

          <div className="relative w-[250px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"></button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm">
            <div className="overflow-hidden rounded">
              <Image
                src="/asset/Kekasih-impian.jpg"
                alt="Kekasih Impian"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <strong className="font-semibold">Judul Buku</strong>
              <span>Genre</span>
              <span>Penulis</span>
            </div>
            <div>
              <span className="rounded bg-red-600 px-6 py-3 text-sm text-white">
                HABIS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm">
            <div className="overflow-hidden rounded">
              <Image
                src="/asset/Kekasih-impian.jpg"
                alt="Kekasih Impian"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <strong className="font-semibold">Judul Buku</strong>
              <span>Genre</span>
              <span>Penulis</span>
            </div>
            <div>
              <span className="rounded bg-red-600 px-6 py-3 text-sm text-white">
                HABIS
              </span>
            </div>
          </div>
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

      {/* Card 2 */}
      <div className="mt-10 w-full rounded p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Pinjamanan Hari Ini</h1>

          <div className="relative w-[250px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"></button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm">
            <div className="flex flex-1 flex-col">
              <strong className="font-semibold">
                Buku Cara Jadi Fullstack Dalam 1 Hari
              </strong>
              <span>Peminjam: Widhi</span>
              <span>Peminjaman: 17 Juli 2025, 08.00</span>
              <span>Pengembalian: 24 Juli 2025</span>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm">
            <div className="flex flex-1 flex-col">
              <strong className="font-semibold">
                Cara Menghasilkan Dollar dari Youtube
              </strong>
              <span>Peminjam: Samsul</span>
              <span>Peminjaman: 17 Juli 2025, 09.00</span>
              <span>Pengembalian: 31 Juli 2025</span>
            </div>
          </div>
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
      {/* Card 3 */}
      <div className="mt-10 w-full rounded p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Pengembalian Hari Ini</h1>

          <div className="relative w-[250px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"></button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm">
            <div className="flex flex-1 flex-col">
              <strong className="font-semibold">Kisi Kisi Frontend</strong>
              <span>Peminjam: Dev1</span>
              <span>Peminjaman: 10 Juli 2025, 08.00</span>
              <span>Pengembalian: 17 Juli 2025</span>
            </div>
            <div>
              <span className="rounded bg-green-600 px-6 py-3 text-sm text-white">
                Dikembalikan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm">
            <div className="flex flex-1 flex-col">
              <strong className="font-semibold">Kisi Kisi Backend</strong>
              <span>Peminjam: Dev2</span>
              <span>Peminjaman: 10 Juli 2025, 08.00</span>
              <span>Pengembalian: 17 Juli 2025</span>
            </div>
            <div>
              <span className="rounded bg-green-600 px-6 py-3 text-sm text-white">
                Dikembalikan
              </span>
            </div>
          </div>
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
  );
};
