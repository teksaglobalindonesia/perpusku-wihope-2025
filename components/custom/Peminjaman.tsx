'use client';
import { Card } from './card';
import { useState, useEffect } from 'react';
import { Pagination } from './pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Search, Plus, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const Loan = ({
  initialData,
  initialPage,
  initialQuery
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
  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    const fetchloans = async () => {
      setLoading(true);
      try {
        const url = new URL(`${BASE_URL}/api/loan/list`);
        url.searchParams.append('page', page.toString());
        url.searchParams.append('page_size', '4');
        if (query) url.searchParams.append('search', query);

        const res = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Gagal fetch data anggota', err);
      } finally {
        setLoading(false);
      }
    };

    fetchloans();
  }, [page, query]);
  const loans = data?.data || [];
  const totalPage = data?.meta?.pagination?.page_count || 1;
  const totalItems = data?.meta?.pagination?.total || 0;

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-botanical-50 to-botanical-300/50 p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-botanical-300/40 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="group">
              <h1 className="mb-2 font-vintage text-4xl text-botanical-700 transition-colors duration-300 group-hover:text-botanical-800">
                Peminjaman Buku
              </h1>
              <p className="font-vintage italic text-botanical-600/80 transition-colors duration-300 group-hover:text-botanical-700/90">
                Catatan literatur yang sedang dipinjam oleh anggota
              </p>
            </div>

            <Link
              href="/peminjaman/addPeminjaman"
              className="flex items-center justify-center gap-2 rounded-lg bg-botanical-600 px-5 py-2.5 font-vintage text-white shadow-lg transition-all duration-300 hover:scale-95 hover:bg-botanical-700 hover:shadow-md active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              <span>Tambah Peminjaman</span>
            </Link>
          </div>

          <div className="group relative mt-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-botanical-600 transition-colors duration-300 group-hover:text-botanical-700" />
            </div>
            <input
              type="text"
              placeholder="Cari data peminjaman..."
              className="block w-full rounded-xl border-2 border-botanical-300/50 bg-white/80 py-2.5 pl-10 pr-3 font-vintage text-botanical-800 placeholder-botanical-500/70 transition-all duration-300 hover:border-botanical-400/70 hover:shadow-md focus:border-botanical-600 focus:bg-white/95 focus:outline-none focus:ring-2 focus:ring-botanical-300/30"
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
          ) : loans.length > 0 ? (
            <div className="rounded-2xl border-2 border-terracotta-200/50 bg-white/80 p-6 backdrop-blur-sm transition-all duration-500 hover:border-terracotta-300/70 hover:shadow-xl">
            <Card
              cardItems={loans.map((loanList: any) => ({
                title: loanList?.book.title,
                peminjam: loanList?.member.name,
                peminjaman: loanList?.loan_date,
                pengembalian: loanList?.return_date
              }))}
            />
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-botanical-200/50 bg-white/80 py-12 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-botanical-300/70 hover:shadow-xl">
              <div className="mb-4 inline-block transform transition-transform duration-500 hover:scale-110">
                <BookOpen
                  className="mx-auto h-16 w-16 text-botanical-400/80"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mb-3 font-vintage text-2xl font-semibold text-botanical-700">
                Tidak ada peminjaman
              </h3>
              <p className="mx-auto mb-6 max-w-md text-botanical-600/80">
                {query
                  ? 'Tidak ada data peminjaman yang cocok'
                  : 'Belum ada data peminjaman yang tercatat'}
              </p>
              {!query && (
                <Link href="/book/addBook">
                  <button className="rounded-lg bg-gradient-to-r from-botanical-500 to-botanical-600 px-6 py-2.5 font-vintage text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:from-botanical-600 hover:to-botanical-700 hover:shadow-lg active:scale-95">
                    Tambah Peminjaman Pertama
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPage > 1 &&  (
          <div className="mt-8 transform transition-transform duration-300 hover:scale-[1.01]">
            <Pagination
              currentPage={page}
              totalPage={totalPage}
              onPageChange={setPage}
            />
          </div>
        )}

        {/* Stats Footer */}
        {!loading && loans.length > 0 && (
          <div className="mt-6 text-center font-vintage text-sm text-botanical-600/90 transition-colors duration-300 hover:text-botanical-700">
            Menampilkan <span className="font-bold">{loans.length}</span>{' '}
            peminjaman dari total{' '}
            <span className="font-bold">{loans.length || 0}</span> data
          </div>
        )}
      </div>
    </div>
  );
};
