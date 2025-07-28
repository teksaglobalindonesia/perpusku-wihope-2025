'use client';

import React, { useState } from 'react';
import Pagination from '../pagination';
import { usePathname } from 'next/navigation';

const Pengembalian = [
  {
    judulBuku: 'Buku A',
    peminjam: 'Gw',
    tanggal: 1,
    waktu: '07-2025',
    targetKembali: 14,
    tanggalKembali: 12,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Bumi',
    peminjam: 'John Doe',
    tanggal: 20,
    waktu: '07-2025',
    targetKembali: 27,
    tanggalKembali: 25,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Laskar Pelangi',
    peminjam: 'Jane Smith',
    tanggal: 18,
    waktu: '07-2025',
    targetKembali: 20,
    tanggalKembali: 25,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Hujan',
    peminjam: 'Dimas Saputra',
    tanggal: 21,
    waktu: '07-2025',
    targetKembali: 28,
    tanggalKembali: 28,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Rindu',
    peminjam: 'Alya Rahma',
    tanggal: 22,
    waktu: '07-2025',
    targetKembali: 30,
    tanggalKembali: 29,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Negeri 5 Menara',
    peminjam: 'Andi Pratama',
    tanggal: 5,
    waktu: '07-2025',
    targetKembali: 12,
    tanggalKembali: 15,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Perahu Kertas',
    peminjam: 'Siti Aminah',
    tanggal: 10,
    waktu: '07-2025',
    targetKembali: 18,
    tanggalKembali: 17,
    waktuKembali: '07-2025'
  },
  {
    judulBuku: 'Ayah',
    peminjam: 'Raka Nugroho',
    tanggal: 8,
    waktu: '07-2025',
    targetKembali: 14,
    tanggalKembali: 14,
    waktuKembali: '07-2025'
  }
];

const Kembali = () => {
  const pathname = usePathname();
  const [retur, setRetur] = useState(Pengembalian);

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-teal-400 px-3 py-1 text-3xl">
          {'✨'}
          <span className="font-normal text-teal-900 underline">
            List Pengembalian
          </span>
        </h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="rounded border px-3 py-1"
          />
          {/* <Link href="/peminjaman/add">
            <button className="text-md mx-2 rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
              Tambah Peminjaman
            </button>
          </Link> */}
        </div>
      </div>

      {/* Tabel */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {retur.map((item) => {
            const Terlambat =
              item.targetKembali > item.tanggalKembali ? '' : 'Terlambat';
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
                      Jadwal Kembali: {item.targetKembali}-{item.waktu}
                    </p>
                    <p className="text-sm">
                      Tanggal Pengembalian: {item.tanggalKembali}-
                      {item.waktuKembali}
                    </p>
                    {/* <button className="my-1 mr-1 rounded bg-purple-500 px-5 py-2 text-sm font-bold text-white">
                      Kembalikan
                    </button> */}
                  </div>
                </div>
                {Terlambat && (
                  <span className="rounded bg-red-500 px-6 py-2 text-white">
                    {Terlambat}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Kembali;
