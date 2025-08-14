'use client';
import { useState, useEffect } from 'react';
import { CardGambar } from './cardGambar';
import { Pagination } from './pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Search, Plus, Bookmark } from 'lucide-react';
import Link from 'next/link';

export const BCard = ({
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

  // Fetch buku dari API
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const url = new URL(`${BASE_URL}/api/book/list`);
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
      console.error('Gagal fetch data buku:', err);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (index: number) => {
  const books = data?.data || [];
  const itemToDelete = books[index];
  
  if (!itemToDelete) {
    alert('Data buku tidak ditemukan');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/book/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME,
      },
      body: JSON.stringify({
        documentId: itemToDelete.documentId,
      }),
      cache: 'no-store',
    });

    if (response.ok) {
      // Refresh data setelah delete berhasil
      await fetchBooks();
    } else {
      const errorText = await response.text(); // Coba dapatkan pesan error
      console.error('Error response:', errorText);
      alert(`Gagal menghapus: ${response.status} - ${errorText}`);
    }
  } catch (err) {
    console.error('Error saat menghapus buku:', err);
    alert('Terjadi kesalahan saat menghapus buku');
  }
};

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    fetchBooks();
  }, [page, query]);

  // Ekstrak data buku dan info pagination
  const books = data?.data || [];
  const totalPage = data?.meta?.pagination?.page_count || 1;
  const totalItems = data?.meta?.pagination?.total || 0;

  return (
    <div className="to-navyBlue-100/30 min-h-screen bg-gradient-to-br from-navyBlue p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="border-navyBlue-300/40 mb-8 border-b pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="group">
              <h1 className="group-hover:text-navyBlue-800 mb-2 font-vintage text-4xl text-white/80 transition-colors duration-300">
                Koleksi Buku
              </h1>
              <p className="group-hover:text-navyBlue-700/90 font-vintage italic text-white/80 transition-colors duration-300">
                Katalog literatur pengetahuan perpustakaan
              </p>
            </div>

            <Link
              href="/book/addBook"
              className="flex items-center justify-center gap-2 rounded-lg bg-navyBlue px-5 py-2.5 font-vintage text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-DNavy hover:shadow-xl active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              <span>Tambah Buku</span>
            </Link>
          </div>

          <div className="group relative mt-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-navyBlue-600 group-hover:text-navyBlue-700 h-5 w-5 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Cari buku..."
              className="border-navyBlue-300/50 text-navyBlue-800 placeholder-navyBlue-500/70 focus:border-navyBlue-600 focus:ring-navyBlue-300/30 hover:border-navyBlue-400/70 block w-full rounded-xl border-2 bg-white/80 py-2.5 pl-10 pr-3 font-vintage transition-all duration-300 hover:shadow-md focus:bg-white/95 focus:outline-none focus:ring-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-32 animate-pulse rounded-lg bg-white/60"></div>
              <div className="h-32 animate-pulse rounded-lg bg-white/60"></div>
              <div className="h-32 animate-pulse rounded-lg bg-white/60"></div>
            </div>
          ) : books.length > 0 ? (
            <div className="border-navyBlue-200/50 hover:border-navyBlue-300/70 rounded-2xl border-2 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl">
              <CardGambar
                cardItems={books.map((bookData: any) => ({
                  documentId: bookData?.documentId,
                  imageSrc: `${BASE_URL}${bookData?.cover?.url}`,
                  title: bookData?.title,
                  genre: bookData?.categories
                    ?.map((c: any) => c.name)
                    .join(', '),
                  author: bookData?.writer,
                  stock: bookData?.stock,
                  buttons: ['edit', 'delete']
                }))}
                onDelete={handleDelete}
              />
            </div>
          ) : (
            <div className="border-navyBlue-200/50 hover:border-navyBlue-300/70 rounded-2xl border-2 bg-white/80 py-12 text-center shadow-lg backdrop-blur-sm transition-all duration-500 hover:shadow-xl">
              <div className="mb-4 transform transition-transform duration-500 hover:scale-110">
                <Bookmark
                  className="text-navyBlue-400/80 mx-auto h-16 w-16"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-navyBlue-700 mb-3 font-vintage text-2xl font-semibold">
                Tidak ada buku
              </h3>
              <p className="text-navyBlue-600/80 mx-auto mb-6 max-w-md">
                {query
                  ? 'Tidak ada buku yang cocok dengan pencarian Anda'
                  : 'Belum ada buku dalam koleksi'}
              </p>
              {!query && (
                <Link href="/book/addBook">
                  <button className="from-navyBlue-500 to-navyBlue-600 hover:from-navyBlue-600 hover:to-navyBlue-700 rounded-lg bg-gradient-to-r px-6 py-2.5 font-vintage text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95">
                    Tambah Buku Pertama
                  </button>
                </Link>
              )}
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
        {!loading && books.length > 0 && (
          <div className="text-navyBlue-600/90 hover:text-navyBlue-700 mt-6 text-center font-vintage text-sm transition-colors duration-300">
            Menampilkan <span className="font-bold">{books.length}</span> buku
            dari total <span className="font-bold">{totalItems || 0}</span>{' '}
            koleksi
          </div>
        )}
      </div>
    </div>
  );
};
