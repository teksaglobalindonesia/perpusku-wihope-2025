'use client';
import { useState, useEffect } from 'react';
import { CardGambar } from './cardGambar';
import { Pagination } from './pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Search, Plus, Bookmark } from 'lucide-react';
import Link from 'next/link';

export const BCard = ({ data }: { data: any[] }) => {
  const [books, setBooks] = useState<any[]>(data);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.trim() === '') {
        setBooks(data);
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/api/book/list?search=${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });
        const json = await res.json();
        setBooks(json.data || []);
        setPage(1);
      } catch (err) {
        console.error('Gagal fetch data buku:', err);
      }
    };
    fetchBooks();
  }, [query, data]);

  const totalPage = Math.ceil(books.length / perPage);
  const sliced = books.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-navyBlue to-navyBlue-100/30 p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-navyBlue-300/40 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="group">
              <h1 className="mb-2 font-vintage text-4xl text-white/80 group-hover:text-navyBlue-800 transition-colors duration-300">
                Koleksi Buku
              </h1>
              <p className="font-vintage italic text-white/80 group-hover:text-navyBlue-700/90 transition-colors duration-300">
                Katalog literatur pengetahuan perpustakaan
              </p>
            </div>

            <Link
              href="/book/addBook"
              className="flex items-center justify-center gap-2 rounded-lg bg-navyBlue px-5 py-2.5 font-vintage text-white shadow-lg transition-all duration-300 hover:bg-DNavy hover:shadow-xl hover:scale-[1.02] active:scale-95 mr-2"
            >
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>Tambah Buku</span>
            </Link>
          </div>

          <div className="relative mt-6 group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-navyBlue-600 group-hover:text-navyBlue-700 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Cari buku..."
              className="block w-full rounded-xl border-2 border-navyBlue-300/50 bg-white/80 py-2.5 pl-10 pr-3 font-vintage text-navyBlue-800 placeholder-navyBlue-500/70 focus:border-navyBlue-600 focus:outline-none focus:ring-2 focus:ring-navyBlue-300/30 focus:bg-white/95 transition-all duration-300 hover:border-navyBlue-400/70 hover:shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
          {sliced.length > 0 ? (
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-navyBlue-200/50 shadow-lg hover:shadow-xl hover:border-navyBlue-300/70 transition-all duration-500 p-6">
              <CardGambar
                cardItems={sliced.map((bookData: any) => ({
                  imageSrc: `${BASE_URL}${bookData?.cover?.url}`,
                  title: bookData?.title,
                  genre: bookData?.categories?.map((c: any) => c.name).join(', '),
                  author: bookData?.writer,
                  stock: bookData?.stock,
                  buttons:['delete', 'edit']
                }))}
                
              />
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-navyBlue-200/50 shadow-lg hover:shadow-xl hover:border-navyBlue-300/70 transition-all duration-500">
              <div className="mb-4 transform hover:scale-110 transition-transform duration-500 inline-block">
                <Bookmark className="w-16 h-16 mx-auto text-navyBlue-400/80" strokeWidth={1.5} />
              </div>
              <h3 className="font-vintage text-2xl font-semibold text-navyBlue-700 mb-3">
                Tidak ada buku
              </h3>
              <p className="text-navyBlue-600/80 mb-6 max-w-md mx-auto">
                {query ? 'Tidak ada buku yang cocok dengan pencarian' : 'Belum ada buku dalam koleksi'}
              </p>
              {!query && (
                <Link href="/book/addBook">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-navyBlue-500 to-navyBlue-600 text-white font-vintage rounded-lg shadow-md hover:from-navyBlue-600 hover:to-navyBlue-700 hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-300">
                    Tambah Buku Pertama
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
          <div className="mt-6 text-center text-sm text-navyBlue-600/90 font-vintage hover:text-navyBlue-700 transition-colors duration-300">
            Menampilkan <span className="font-bold">{sliced.length}</span> buku dari total <span className="font-bold">{books.length || 0}</span> koleksi
          </div>
        )}
      </div>
    </div>
  );
};