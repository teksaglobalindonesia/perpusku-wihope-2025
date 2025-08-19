'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '../pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

type ReturnItem = {
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
    actual_return_date: number | null;
  };
};

const Kembali = () => {
  const [retur, setRetur] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAllReturns = async () => {
      try {
        setLoading(true);
        let page = 1;
        let allReturns: ReturnItem[] = [];
        let totalPages = 1;

        do {
          const response = await fetch(
            `${BASE_URL}/api/return/list?page=${page}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
                'x-wihope-name': WIHOPE_NAME
              },
              cache: 'no-store'
            }
          );

          if (!response.ok) {
            throw new Error('Gagal mengambil data pengembalian');
          }

          const json = await response.json();
          allReturns = allReturns.concat(json.data || []);
          totalPages = json.meta?.pagination?.page_count || 1;
          page++;
        } while (page <= totalPages);

        setRetur(allReturns);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllReturns();
  }, []);

  const hasilPencarian = retur.filter(
    (balik) =>
      (balik.book?.title?.toLowerCase() || '').includes(
        keyword.toLowerCase()
      ) ||
      (balik.member?.name?.toLowerCase() || '').includes(
        keyword.toLowerCase()
      ) ||
      balik.return_date.toString().includes(keyword) ||
      (balik.return.actual_return_date?.toString().includes(keyword) ?? false)
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
          ✨
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

      {error && (
        <div className="mx-8 mb-4 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="mx-8 mb-4 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <p>Memuat data pengembalian dari server...</p>
          </div>
        </div>
      ) : (
        <div className="mx-8 mb-8 space-y-4 rounded-md p-4">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((KembaliItem) => {
              const Terlambat =
                KembaliItem.return_date <
                (KembaliItem.return.actual_return_date || 0)
                  ? 'Terlambat'
                  : '';
              return (
                <div
                  key={KembaliItem.book?.id}
                  className="flex items-center justify-between rounded border p-4"
                >
                  <div className="mx-4 flex items-center gap-4">
                    <div>
                      <p className="font-semibold">
                        {KembaliItem.book?.title || '📚 Judul tidak tersedia'}
                      </p>
                      <p className="text-sm">
                        Peminjam:{' '}
                        {KembaliItem.member?.name || '❓ Tidak diketahui'}
                      </p>
                      <p className="text-sm">
                        Tanggal Peminjaman: {KembaliItem.loan_date}
                      </p>
                      <p className="text-sm">
                        Jadwal Kembali: {KembaliItem.return_date}
                      </p>
                      <p className="text-sm">
                        Tanggal Pengembalian:{' '}
                        {KembaliItem.return.actual_return_date ??
                          'Belum Tersedia'}
                      </p>
                    </div>
                  </div>
                  {Terlambat && (
                    <span className="rounded bg-red-500 px-6 py-2 text-white">
                      {Terlambat}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p className="text-lg font-medium">
                {keyword
                  ? 'Tidak ada hasil ditemukan'
                  : 'Belum ada data pengembalian'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {paginatedItems.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Kembali;
