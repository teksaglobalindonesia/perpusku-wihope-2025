'use client';
import Link from 'next/link';
import { Card } from '../custom/card';
import { useState, useEffect } from 'react';
import { Pagination } from './pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Search, Plus, RotateCcw } from 'lucide-react';

export const Return = ({
  initialData,
  initialPage,
  initialQuery,
}: {
  initialData: any;
  initialPage: number;
  initialQuery: string;
}) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialPage);
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Fungsi untuk cek keterlambatan
  const isLate = (returnDate: string, actualReturnDate: string) => {
    return new Date(actualReturnDate) > new Date(returnDate);
  };

  // Fetch data pengembalian
  const fetchReturns = async () => {
    setLoading(true);
    try {
      const url = new URL(`${BASE_URL}/api/return/list`);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('page_size', '4');
      if (query) url.searchParams.append('search', query);

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME,
        },
        cache: 'no-store',
      });

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Gagal fetch data Pengembalian:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ulang saat page atau query berubah (setelah initial render)
  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    fetchReturns();
  }, [page, query]);

  // Ekstrak data dari API
  const returns = data?.data || [];
  const totalPage = data?.meta?.pagination?.page_count || 1;
  const totalItems = data?.meta?.pagination?.total || 0;

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-terracotta-100 to-terracotta-400/50 p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-terracotta-300/50 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="group">
              <h1 className="mb-2 font-vintage text-4xl text-terracotta-700 transition-colors duration-300 group-hover:text-terracotta-800">
                Riwayat Pengembalian
              </h1>
              <p className="font-vintage italic text-terracotta-600/80 transition-colors duration-300 group-hover:text-terracotta-700/90">
                Catatan literatur yang telah kembali ke rak pengetahuan
              </p>
            </div>

            <Link
              href=""
              className="flex items-center justify-center gap-2 rounded-lg bg-terracotta-600 px-5 py-2.5 font-vintage text-white shadow-lg transition-all duration-300 hover:bg-terracotta-700 hover:scale-[1.02] hover:shadow-xl active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              <span>Tambah Data</span>
            </Link>
          </div>

          <div className="relative mt-6 group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-terracotta-600 transition-colors duration-300 group-hover:text-terracotta-700" />
            </div>
            <input
              type="text"
              placeholder="Cari riwayat pengembalian..."
              className="block w-full rounded-xl border-2 border-terracotta-300/50 bg-white/80 py-2.5 pl-10 pr-3 font-vintage text-terracotta-800 placeholder-terracotta-500/70 transition-all duration-300 focus:border-terracotta-600 focus:bg-white/95 focus:outline-none focus:ring-2 focus:ring-terracotta-300/30 hover:border-terracotta-400/70 hover:shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-16 animate-pulse rounded-lg bg-white/60"></div>
              <div className="h-16 animate-pulse rounded-lg bg-white/60"></div>
              <div className="h-16 animate-pulse rounded-lg bg-white/60"></div>
            </div>
          ) : returns.length > 0 ? (
            <div className="rounded-2xl border-2 border-terracotta-200/50 bg-white/80 p-6 backdrop-blur-sm shadow-lg transition-all duration-500 hover:border-terracotta-300/70 hover:shadow-xl">
              <Card
                cardItems={returns.map((returnList: any) => {
                  const actualReturnDate = returnList.return?.actual_return_date;
                  const isReturned = !!actualReturnDate;
                  const isLateReturn = isReturned && isLate(returnList.return_date, actualReturnDate);

                  return {
                    title: returnList?.book?.title || 'Buku tidak ditemukan',
                    peminjam: returnList?.member?.name || 'Anggota tidak ditemukan',
                    peminjaman: returnList?.loan_date,
                    pengembalian: returnList?.return_date,
                    dikembalikan: actualReturnDate,
                    label: isLateReturn ? 'terlambat' : undefined,
                    showButton: false,
                  };
                })}
              />
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-terracotta-200/50 bg-white/80 py-12 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-terracotta-300/70 hover:shadow-xl">
              <div className="mb-4 transform transition-transform duration-500 hover:scale-110">
                <RotateCcw
                  className="mx-auto h-16 w-16 text-terracotta-400/80"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mb-3 font-vintage text-2xl font-semibold text-terracotta-700">
                Tidak ada riwayat
              </h3>
              <p className="mx-auto mb-6 max-w-md text-terracotta-600/80">
                {query
                  ? 'Tidak ada riwayat yang cocok dengan pencarian Anda'
                  : 'Belum ada riwayat pengembalian'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPage > 1 && !loading && (
          <div className="mt-8 transform transition-transform duration-300 hover:scale-[1.01]">
            <Pagination
              currentPage={page}
              totalPage={totalPage}
              onPageChange={setPage}
            />
          </div>
        )}

        {/* Stats Footer */}
        {!loading && returns.length > 0 && (
          <div className="mt-6 text-center font-vintage text-sm text-terracotta-600/90 transition-colors duration-300 hover:text-terracotta-700">
            Menampilkan{' '}
            <span className="font-bold">{returns.length}</span> riwayat dari total{' '}
            <span className="font-bold">{totalItems || 0}</span> data
          </div>
        )}
      </div>
    </div>
  );
};