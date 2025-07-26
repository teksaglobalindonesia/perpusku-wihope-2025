'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TambahPinjam = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="mb-6 rounded bg-purple-700 px-6 py-2 text-3xl font-bold text-white underline">
        Tambahkan Peminjaman
      </h1>

      <form className="w-full max-w-2xl rounded border border-black p-6">
        <div className="mb-4 grid grid-cols-3 items-center gap-4">
          <label className="text-right font-medium">Buku</label>
          <div className="col-span-2">
            <Link href="/peminjaman/bukuTest">
              <button
                type="button"
                className="w-full rounded bg-gray-200 p-2 hover:bg-gray-300"
              >
                Pilih Buku
              </button>
            </Link>
          </div>

          <label className="text-right font-medium">Peminjam</label>
          <div className="col-span-2">
            <Link href="/peminjaman/anggotaTest">
              <button
                type="button"
                className="w-full rounded bg-gray-200 p-2 hover:bg-gray-300"
              >
                Pilih Anggota
              </button>
            </Link>
          </div>

          <label className="text-right font-medium">Tanggal</label>
          <input type="date" className="col-span-2 rounded bg-gray-200 p-2" />

          <label className="text-right font-medium">Waktu</label>
          <input
            type="text"
            placeholder="Waktu (misal: 07-2025)"
            className="col-span-2 rounded bg-gray-200 p-2"
          />

          <label className="text-right font-medium">Tanggal Kembali</label>
          <input type="date" className="col-span-2 rounded bg-gray-200 p-2" />

          <label className="text-right font-medium">Waktu Kembali</label>
          <input
            type="text"
            placeholder="Waktu Kembali (misal: 07-2025)"
            className="col-span-2 rounded bg-gray-200 p-2"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahPinjam;
