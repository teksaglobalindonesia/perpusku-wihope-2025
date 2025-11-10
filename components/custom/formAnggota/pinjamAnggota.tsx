"use client";

import { Button } from '@/components/ui/button';
import { title } from 'process';
import { useState } from 'react';

export type PinjamAnggotaProps = {
  id?: number;
  title?: string;
  peminjaman?: string;
  pengembalian?: string;
  buku?: 'Dikembalikan' | 'Terlambat' | 'DiPinjam';
};

export const PinjamAnggota = ({ ...props }: PinjamAnggotaProps) => {
  const [page, setPage] = useState(1);
  const totalPages = 5;
  const pinjam = [
    {
      id: 1,
      title: 'Buku Pinjaman 1',
      peminjaman: '12 Juli 2025, 08.00',
      pengembalian: '19 Juli 2025',
      buku: 'Dikembalikan' as const
    },
    {
      id: 2,
      title: 'Buku Pinjaman 2',
      peminjaman: '15 Juli 2025, 08.00',
      pengembalian: '15 Juli 2025',
      buku: 'Terlambat' as const
    },
    {
      id: 3,
      title: 'Buku Pinjaman 3',
      peminjaman: '16 Juli 2025, 08.00',
      pengembalian: '16 Juli 2025',
      buku: 'DiPinjam' as const
    }
  ];
  return (
    <>
      <div className="mt-10 w-full rounded p-6 shadow-lg">
        <h1 className="mb-4 text-lg font-bold">Pengembalian Hari Ini</h1>

        <div className="mb-4 space-y-3">
          <h2 className="text-lg font-bold">Anggota 1</h2>
          {pinjam.map((pinjaman) => (
            <div
              key={pinjaman.id}
              className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm"
            >
              <div className="flex flex-1 flex-col">
                <strong className="font-semibold">{pinjaman.title}</strong>
                <span>{pinjaman.peminjaman}</span>
                <span>{pinjaman.pengembalian}</span>
                {/* {pinjaman.buku === 'Terlambat' ? (
                  <Button className="w-fit">Kembalikan</Button>
                ) : pinjaman.buku === 'DiPinjam' ? (
                  <Button className="w-fit">Kembalikan</Button>
                ) : (
                  ''
                )} */}
                {pinjaman.buku === 'Dikembalikan' ? (
                  ''
                ) : (
                  <Button className="w-fit">Kembalikan</Button>
                )}
              </div>
              <div>
                {pinjaman.buku === 'Dikembalikan' ? (
                  <span className="rounded bg-green-600 px-6 py-3 text-sm text-white">
                    Dikembalikan
                  </span>
                ) : pinjaman.buku === 'Terlambat' ? (
                  <span className="rounded bg-red-600 px-6 py-3 text-sm text-white">
                    Terlambat
                  </span>
                ) : (
                  <span className="rounded bg-yellow-600 px-6 py-3 text-sm text-white">
                    DiPinjam
                  </span>
                )}
              </div>
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
    </>
  );
};
