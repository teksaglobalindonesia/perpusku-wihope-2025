'use client';

import { useState, useEffect } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

export default function PengembalianList() {
  const [pengembalian, setPengembalian] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/return/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });

        if (!res.ok) {
          setError('Gagal memuat data pengembalian');
          setLoading(false);
          return;
        }

        const json = await res.json();
        setPengembalian(json?.data ?? []);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data pengembalian');
        setLoading(false);
      }
    })();
  }, []);

  // Filter berdasarkan pencarian
  const filteredData = pengembalian.filter((item) =>
    item.judul?.toLowerCase().includes(search.toLowerCase()) ||
    item.peminjam?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="m-4 sm:m-8 text-[#DFD0B8]">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-white">Pengembalian</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset ke halaman pertama saat search
          }}
          className="w-full sm:w-64 rounded-lg border border-[#393E46] bg-[#DFD0B8] px-4 py-2 text-black"
        />
      </div>

      <div className="space-y-4">
        {currentData.map((item, index) => {
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
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center flex-wrap gap-2 text-white">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-[#393E46] text-white'
                  : 'bg-[#DFD0B8] text-black hover:bg-[#cbbf9d]'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
