'use client';
import { Card } from './card';
import { useState, useEffect } from 'react';
import { Pagination } from './pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Search, Plus, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const Loan = ({ data }: { data: any[] }) => {
  const [loans, setLoans] = useState<any[]>(data);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    const fetchLoans = async () => {
      if (query.trim() === '') {
        setLoans(data);
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/api/loan/list?search=${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });
        const json = await res.json();
        setLoans(json.data || []);
        setPage(1);
      } catch (err) {
        console.error('Gagal fetch data peminjaman', err);
      }
    };
    fetchLoans();
  }, [query, data]);

  const totalPage = Math.ceil(loans.length / perPage);
  const sliced = loans.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-botanical-50 to-botanical-300/50 p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-botanical-300/40 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="group">
              <h1 className="mb-2 font-vintage text-4xl text-botanical-700 group-hover:text-botanical-800 transition-colors duration-300">
                Peminjaman Buku
              </h1>
              <p className="font-vintage italic text-botanical-600/80 group-hover:text-botanical-700/90 transition-colors duration-300">
                Catatan literatur yang sedang dipinjam oleh anggota
              </p>
            </div>

            <Link
              href="/book/addBook"
              className="flex items-center justify-center gap-2 rounded-lg bg-botanical-600 px-5 py-2.5 font-vintage text-white shadow-lg transition-all duration-300 hover:bg-botanical-700 hover:shadow-md hover:scale-95 active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>Tambah Peminjaman</span>
            </Link>
          </div>

          <div className="relative mt-6 group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-botanical-600 group-hover:text-botanical-700 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Cari data peminjaman..."
              className="block w-full rounded-xl border-2 border-botanical-300/50 bg-white/80 py-2.5 pl-10 pr-3 font-vintage text-botanical-800 placeholder-botanical-500/70 focus:border-botanical-600 focus:outline-none focus:ring-2 focus:ring-botanical-300/30 focus:bg-white/95 transition-all duration-300 hover:border-botanical-400/70 hover:shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
          {sliced.length > 0 ? (
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-botanical-200/50 shadow-lg hover:shadow-xl hover:border-botanical-300/70 transition-all duration-500 p-6">
              <Card
                cardItems={sliced.map((loanList: any, index) => ({
                  title: loanList?.book.title,
                  peminjam: loanList?.member.name,
                  peminjaman: loanList?.loan_date,
                  pengembalian: loanList?.return_date
                }))}
              />
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-botanical-200/50 shadow-lg hover:shadow-xl hover:border-botanical-300/70 transition-all duration-500">
              <div className="mb-4 transform hover:scale-110 transition-transform duration-500">
                <BookOpen className="w-16 h-16 mx-auto text-botanical-400/80" strokeWidth={1.5} />
              </div>
              <h3 className="font-vintage text-2xl font-semibold text-botanical-700 mb-3">
                Tidak ada peminjaman
              </h3>
              <p className="text-botanical-600/80 mb-6 max-w-md mx-auto">
                {query ? 'Tidak ada data peminjaman yang cocok' : 'Belum ada data peminjaman yang tercatat'}
              </p>
              {!query && (
                <Link href="/book/addBook">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-botanical-500 to-botanical-600 text-white font-vintage rounded-lg shadow-md hover:from-botanical-600 hover:to-botanical-700 hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-300">
                    Tambah Peminjaman Pertama
                  </button>
                </Link>
              )}
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
          <div className="mt-6 text-center text-sm text-botanical-600/90 font-vintage hover:text-botanical-700 transition-colors duration-300">
            Menampilkan <span className="font-bold">{sliced.length}</span> peminjaman dari total <span className="font-bold">{loans.length || 0}</span> data
          </div>
        )}
      </div>
    </div>
  );
};