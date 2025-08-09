'use client';

import { useState } from 'react';

export default function PeminjamanList({loans} : {loans:any[]} ) {
  const today = new Date();

  // const [peminjaman, setPeminjaman] = useState([
  //   {
  //     judul: 'Judul Buku 1',
  //     nama: 'Anggota A',
  //     tanggalPinjam: '2025-07-17T08:00:00',
  //     tanggalKembali: '2025-08-12',
  //     sudahKembali: false,
  //   },
  //   {
  //     judul: 'Judul Buku 2',
  //     nama: 'Anggota B',
  //     tanggalPinjam: '2025-07-10T08:00:00',
  //     tanggalKembali: '2025-07-17',
  //     sudahKembali: false,  
  //   },
  //   {
  //     judul: 'Judul Buku 3',
  //     nama: 'Anggota C',
  //     tanggalPinjam: '2025-07-17T08:00:00',
  //     tanggalKembali: '2025-07-24',
  //     sudahKembali: false,
  //   },
  //   {
  //     judul: 'Judul Buku 4',
  //     nama: 'Anggota D',
  //     tanggalPinjam: '2025-07-10T08:00:00',
  //     tanggalKembali: '2025-07-17',
  //     sudahKembali: false,
  //   },
  //   {
  //     judul: 'Judul Buku 5',
  //     nama: 'Anggota E',
  //     tanggalPinjam: '2025-07-16T08:00:00',
  //     tanggalKembali: '2025-07-23',
  //     sudahKembali: false,
  //   },
  //   {
  //     judul: 'Judul Buku 6',
  //     nama: 'Anggota F',
  //     tanggalPinjam: '2025-07-16T08:00:00',
  //     tanggalKembali: '2025-07-17',
  //     sudahKembali: false,
  //   },
  // ]);

  // const handleKembalikan = (index: number) => {
  //   const updated = [...peminjaman];
  //   updated[index].sudahKembali = true;
  //   setPeminjaman(updated);
  // };

  return (
    <div className="m-8 text-[#DFD0B8]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Peminjaman</h2>
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-lg border border-[#393E46] bg-[#DFD0B8] px-4 py-2 text-black"
          />
          <button className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700">
            TAMBAH
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loans.map((item) => {
          const tanggalKembali = new Date(item.tanggalKembali);
          const terlambat = !item.sudahKembali && tanggalKembali < today;

          return (
            <div
              key={item.id}
              className="relative rounded border border-[#393E46] p-4 text-black bg-[#DFD0B8]"
            >
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p>Peminjam: {item.name}</p>
              <p>
                Peminjaman:{' '}
                {new Date(item.loan_date).toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p>
                Pengembalian:{' '}
                { new Date(item.return_date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              
              {!item.sudahKembali && (
                <div className="mt-4">
                  <button
                    // onClick={() => handleKembalikan(index)}
                    className="rounded bg-green-600 px-4 py-1 text-sm text-white hover:bg-green-700"
                  >
                    KEMBALIKAN
                  </button>
                </div>
              )}

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

      <div className="mt-6 text-center text-white">
        &lt; <span className="underline">1</span> 2 3 … 20 &gt;
      </div>
    </div>
  );
}
