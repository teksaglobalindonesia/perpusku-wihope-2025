'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Member = [
  { nama: 'Joh', noAnggota: '12345', email: 'john@yahodie.com' },
  { nama: 'Jane', noAnggota: '67890', email: 'jennie@gmail.com' },
  { nama: 'Doe', noAnggota: '54321', email: 'dodo@gmail.com' }
];

const Peminjaman = [
  {
    judulBuku: 'Buku A',
    peminjam: 'Gw',
    tanggal: 1,
    waktu: '07-2025',
    tanggalKembali: 2,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Bumi',
    peminjam: 'John Doe',
    tanggal: 20,
    waktu: '07-2025',
    tanggalKembali: 25,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Laskar Pelangi',
    peminjam: 'Jane Smith',
    tanggal: 18,
    waktu: '07-2025',
    tanggalKembali: 25,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Hujan',
    peminjam: 'Dimas Saputra',
    tanggal: 21,
    waktu: '07-2025',
    tanggalKembali: 28,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Rindu',
    peminjam: 'Alya Rahma',
    tanggal: 22,
    waktu: '07-2025',
    tanggalKembali: 29,
    waktuKembali: '07-2025'
  }
];

const Pinjam = () => {
  const pathname = usePathname();
  const [lending, setLending] = useState(Peminjaman);

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <div className="ml-12 rounded-lg bg-yellow-200 px-3 py-1 text-3xl">
          {'🫂'}
          <span className="font-normal text-yellow-900 underline">
            List Pinjaman Anggota
          </span>
          <h2 className="text-start text-xl">Anggota : {Member[2].nama}</h2>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="rounded border px-3 py-1"
          />
          <Link href="/peminjaman/add">
            <button className="text-md mx-2 rounded-md bg-yellow-400 px-2 py-1 font-bold text-gray-800 hover:bg-yellow-300">
              Tambah Peminjaman
            </button>
          </Link>
        </div>
      </div>

      {/* Tabel */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {lending.map((item) => {
            const Terlambat =
              item.tanggal + 7 > item.tanggalKembali ? '' : 'Terlambat';
            return (
              <div
                key={item.judulBuku}
                className="flex items-center justify-between rounded border p-4"
              >
                <div className="mx-4 flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{item.judulBuku}</p>
                    <p className="text-sm">Peminjam: {item.peminjam}</p>
                    <p className="text-sm">
                      Tanggal Peminjaman: {item.tanggal}-{item.waktu}
                    </p>
                    <p className="text-sm">
                      Tanggal Pengembalian: {item.tanggalKembali}-
                      {item.waktuKembali}
                    </p>
                    <button className="my-1 mr-1 rounded bg-yellow-500 px-5 py-2 text-sm font-bold text-white hover:bg-yellow-400">
                      Kembalikan
                    </button>
                  </div>
                </div>
                {Terlambat && (
                  <span className="rounded bg-yellow-700 px-6 py-2 text-white">
                    {Terlambat}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center space-x-2 text-sm text-gray-700">
          {['<', 1, 2, '...', 20, '>'].map((item, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md border px-3 py-1 hover:bg-yellow-100"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pinjam;
