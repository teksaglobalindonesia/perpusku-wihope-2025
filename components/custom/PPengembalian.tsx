'use client';
import Link from 'next/link';
import { Card } from '../custom/card';
import { useState, useEffect } from 'react';
import { Pagination } from './pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Search, Plus, RotateCcw } from 'lucide-react';

export const Return = ({ data }: { data: any[] }) => {
  const [returns, setReturns] = useState<any[]>(data);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.trim() === '') {
        setReturns(data);
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/api/return/list?search=${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });
        const json = await res.json();
        setReturns(json.data || []);
        setPage(1);
      } catch (err) {
        console.error('Gagal fetch data Pengembalian:', err);
      }
    };
    fetchBooks();
  }, [query, data]);

  const totalPage = Math.ceil(returns.length / perPage);
  const sliced = returns.slice((page - 1) * perPage, page * perPage);

  const isLate = (returnDate: string, actualReturnDate: string | null) => {
    if (!actualReturnDate) return false;
    return new Date(actualReturnDate) > new Date(returnDate);
  };

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-terracotta-100 to-terracotta-400/50 p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-terracotta-300/50 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="group">
              <h1 className="mb-2 font-vintage text-4xl text-terracotta-700 group-hover:text-terracotta-800 transition-colors duration-300">
                Riwayat Pengembalian
              </h1>
              <p className="font-vintage italic text-terracotta-600/80 group-hover:text-terracotta-700/90 transition-colors duration-300">
                Catatan literatur yang telah kembali ke rak pengetahuan
              </p>
            </div>

            <Link
              href=""
              className="flex items-center justify-center gap-2 rounded-lg bg-terracotta-600 px-5 py-2.5 font-vintage text-white shadow-lg transition-all duration-300 hover:bg-terracotta-700 hover:shadow-xl hover:scale-[1.02] active:scale-95 mr-2"
            >
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>Tambah Data</span>
            </Link>
          </div>

          <div className="relative mt-6 group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-terracotta-600 group-hover:text-terracotta-700 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Cari riwayat pengembalian..."
              className="block w-full rounded-xl border-2 border-terracotta-300/50 bg-white/80 py-2.5 pl-10 pr-3 font-vintage text-terracotta-800 placeholder-terracotta-500/70 focus:border-terracotta-600 focus:outline-none focus:ring-2 focus:ring-terracotta-300/30 focus:bg-white/95 transition-all duration-300 hover:border-terracotta-400/70 hover:shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
          {sliced.length > 0 ? (
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-terracotta-200/50  hover:shadow-xl hover:border-terracotta-300/70 transition-all duration-500 p-6">
              <Card
                cardItems={sliced.map((returnList) => {
                  const actualReturnDate = returnList.return?.actual_return_date;
                  const isReturned = !!actualReturnDate;
                  const isLateReturn =
                    isReturned && isLate(returnList.return_date, actualReturnDate);

                  return {
                    title: returnList?.book.title,
                    peminjam: returnList?.member.name,
                    peminjaman: returnList?.loan_date,
                    pengembalian: returnList?.return_date,
                    dikembalikan: actualReturnDate,
                    label: isLateReturn ? 'terlambat' : undefined,
                    showButton: false
                  };
                })}
              />
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-terracotta-200/50 shadow-lg hover:shadow-xl hover:border-terracotta-300/70 transition-all duration-500">
              <div className="mb-4 transform hover:scale-110 transition-transform duration-500 inline-block">
                <RotateCcw className="w-16 h-16 mx-auto text-terracotta-400/80" strokeWidth={1.5} />
              </div>
              <h3 className="font-vintage text-2xl font-semibold text-terracotta-700 mb-3">
                Tidak ada riwayat
              </h3>
              <p className="text-terracotta-600/80 mb-6 max-w-md mx-auto">
                {query ? 'Tidak ada riwayat yang cocok dengan pencarian' : 'Belum ada riwayat pengembalian'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="mt-8 transform hover:scale-[1.01] transition-transform duration-300">
            <Pagination
              currentPage={page}
              totalPage={totalPage}
              onPageChange={setPage}
            />
          </div>
        )}

        {/* Stats Footer */}
        {sliced.length > 0 && (
          <div className="mt-6 text-center text-sm text-terracotta-600/90 font-vintage hover:text-terracotta-700 transition-colors duration-300">
            Menampilkan <span className="font-bold">{sliced.length}</span> riwayat dari total <span className="font-bold">{returns.length || 0}</span> data
          </div>
        )}
      </div>
    </div>
  );
};