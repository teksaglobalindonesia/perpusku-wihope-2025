'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '../pagination';
import { usePathname } from 'next/navigation';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

type Kembali = {
  book: {
    title: string;
    id: number;
  };
  member: {
    name: string;
  };
  loan_date: number;
  return_date: number;
  return: {
    actual_return_date: number;
  };
};
const Kembali = () => {
  // const pathname = usePathname();
  const [retur, setRetur] = useState<Kembali[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/return/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }

        const json = await response.json();
        setRetur(json.data || []);
      } catch (err: any) {
        // console.error('❌ Error saat fetch:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const hasilPencarian = retur.filter(
    (balik) =>
      balik.book.title.toLowerCase().includes(keyword.toLowerCase()) ||
      balik.member.name.toLowerCase().includes(keyword.toLowerCase()) ||
      balik.return_date.toString().includes(keyword) ||
      balik.return.actual_return_date.toString().includes(keyword)
  );

  const totalPages = Math.ceil(hasilPencarian.length / itemsPerPage);
  const paginatedItems = hasilPencarian.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            placeholder="Search by title, name, or date"
            className="mb-3 w-64 rounded border px-3 py-1"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      {/* Tabel */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {paginatedItems.map((Kembali) => {
            const Terlambat =
              Kembali.return_date > Kembali.return.actual_return_date
                ? ''
                : 'Terlambat';
            return (
              <div
                key={Kembali.book.id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div className="mx-4 flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{Kembali.book.title}</p>
                    <p className="text-sm">Peminjam: {Kembali.member.name}</p>
                    <p className="text-sm">
                      Tanggal Peminjaman: {Kembali.loan_date}
                    </p>
                    <p className="text-sm">
                      Jadwal Kembali: {Kembali.return_date}
                    </p>
                    <p className="text-sm">
                      Tanggal Pengembalian:{' '}
                      {Kembali.return.actual_return_date || 'Belum Tersedia'}
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Kembali;
