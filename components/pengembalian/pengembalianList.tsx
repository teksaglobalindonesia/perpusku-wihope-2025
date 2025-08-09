'use client';

import { useState } from 'react';

export default function PengembalianList() {
  const [pengembalian, setPengembalian] = useState([
    {
      judul: 'Judul Buku 1',
      peminjam: 'Abi',
      tanggalPinjam: '2025-07-17T08:00:00',
      tanggalKembali: '2025-07-24',
      tanggalDikembalikan: '2025-07-24',
    },
    {
      judul: 'Judul Buku 2',
      peminjam: 'Abu',
      tanggalPinjam: '2025-07-10T08:00:00',
      tanggalKembali: '2025-07-17',
      tanggalDikembalikan: '2025-07-18', // Terlambat
    },
    {
      judul: 'Judul Buku 1',
      peminjam: 'Abi',
      tanggalPinjam: '2025-07-17T08:00:00',
      tanggalKembali: '2025-07-24',
      tanggalDikembalikan: '2025-07-24',
    },
    {
      judul: 'Judul Buku 2',
      peminjam: 'Abu',
      tanggalPinjam: '2025-07-10T08:00:00',
      tanggalKembali: '2025-07-17',
      tanggalDikembalikan: '2025-07-24', // Terlambat
    },
    {
      judul: 'Judul Buku 1',
      peminjam: 'Abi',
      tanggalPinjam: '2025-07-17T08:00:00',
      tanggalKembali: '2025-07-24',
      tanggalDikembalikan: '2025-07-24',
    },
    {
      judul: 'Judul Buku 2',
      peminjam: 'Abu',
      tanggalPinjam: '2025-07-10T08:00:00',
      tanggalKembali: '2025-07-17',
      tanggalDikembalikan: '2025-07-24', // Terlambat
    },
  ]);

  return (
    <div className="m-8 text-[#DFD0B8]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Pengembalian</h2>
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-lg border border-[#393E46] bg-[#DFD0B8] px-4 py-2 text-black"
          />
        </div>
      </div>

      <div className="space-y-4">
        {pengembalian.map((item, index) => {
          const kembali = new Date(item.tanggalKembali);
          const dikembalikan = new Date(item.tanggalDikembalikan);
          const terlambat = dikembalikan > kembali;

          return (
            <div
              key={index}
              className="relative rounded border border-[#393E46] p-4 text-black bg-[#DFD0B8]"
            >
              <h3 className="font-semibold text-lg">{item.judul}</h3>
              <p>Peminjam: {item.peminjam}</p>
              <p>
                Peminjaman:{' '}
                {new Date(item.tanggalPinjam).toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p>
                Pengembalian:{' '}
                {kembali.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p>
                Dikembalikan:{' '}
                {dikembalikan.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>

              {terlambat && (
                <div className="absolute right-4 top-4">
                  <span className="rounded bg-red-600 px-4 py-1 text-sm text-white">
                    TERLAMBAT
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-6 text-center text-white">
        &lt; <span className="underline">1</span> 2 3 … 20 &gt;
      </div>
    </div>
  );
}
