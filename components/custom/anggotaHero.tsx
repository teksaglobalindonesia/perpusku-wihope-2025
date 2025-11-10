'use client';

import { id } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { title } from 'process';
import { useState } from 'react';

export const AnggotaHero = () => {
  const anggotaList = [
    {
      id: 1,
      title: 'Anggota 1',
      angka: '111111',
      gmail: 'anggota@gmail.com'
    },
    {
      id: 2,
      title: 'Anggota 2',
      angka: '222222',
      gmail: 'anggota@gmail.com'
    },
    {
      id: 3,
      title: 'Anggota 3',
      angka: '333333',
      gmail: 'anggota@gmail.com'
    },
    {
      id: 4,
      title: 'Anggota 4',
      angka: '444444',
      gmail: 'anggota@gmail.com'
    }
  ];

  const [show, setShow] = useState(false);

  return (
    <div className="h-[550px] w-full gap-4 p-6">
      <div className="w-full rounded p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[25px] font-semibold">Anggota</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-md border border-gray-400 px-4 py-2 focus:outline-none"
            />
            <Link href="/anggota/tambah">
              <button className="rounded-md bg-green-400 px-4 py-2 ">
                TAMBAH
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {anggotaList.map((anggota) => (
            <div
              key={anggota.id}
              className="flex items-center gap-4 rounded border bg-white p-4 shadow-sm"
            >
              <div className="flex flex-1 flex-col">
                <strong className="font-semibold">{anggota.title}</strong>
                <span>{anggota.angka}</span>
                <span>{anggota.gmail}</span>
                <div className="flex gap-2">
                  <Link href="/anggota/pinjam">
                  <button className="rounded bg-green-300 px-4 py-1">
                    Peminjaman
                  </button>
                  </Link>
                  <Link href="/anggota/edit">
                    <button className="rounded bg-yellow-400 px-4 py-1 ">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="rounded bg-red-500 px-4 py-1"
                    onClick={() => setShow(true)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          {show && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Konfirmasi Hapus</h2>
                <p>Apakah Yakin menghapus anggota ini?</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="rounded bg-gray-300 px-4 py-2"
                    onClick={() => setShow(false)}
                  >
                    Batal
                  </button>
                  <button className="rounded bg-red-500 px-4 py-2 text-white">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
