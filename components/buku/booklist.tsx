'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

export function BookList() {
  const API = BASE_URL;

  // State
  const [books, setBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch books
  const fetchBooks = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API}/api/book/list?search=${search}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME,
          },
          cache: 'no-store',
        }
      );

      if (!res.ok) {
        setError('Gagal memuat data buku');
        setLoading(false);
        return;
      }

      const json = await res.json();
      setBooks(json?.data ?? []);
      setTotalPages(json?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
    } catch (err) {
      setError('Terjadi kesalahan koneksi');
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBooks(currentPage, searchTerm);
  }, [currentPage]);

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // reset ke halaman pertama
    fetchBooks(1, searchTerm);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus data ini?');
    if (confirmDelete) {
      alert(`Buku dengan ID ${id} berhasil dihapus`);
    }
  };

  return (
    <div className="m-4 text-[#DFD0B8] sm:m-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold sm:text-2xl">📚 Daftar Buku</h2>
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-2 sm:flex-row sm:gap-4"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari buku..."
            className="w-full rounded-lg border border-[#393E46] bg-[#DFD0B8] px-4 py-2 text-black sm:w-auto"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#948979] px-5 py-2 text-center text-white hover:bg-[#a69984]"
          >
            Cari
          </button>
          <Link
            href="/buku/add"
            className="rounded-lg bg-[#948979] px-5 py-2 text-center text-white hover:bg-[#a69984]"
          >
            + Tambah
          </Link>
        </form>
      </div>

      {/* Loading & Error */}
      {loading && <p className="mt-6 text-center">Loading...</p>}
      {error && <p className="mt-6 text-center text-red-500">{error}</p>}

      {/* Book List */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        {!loading && books.length === 0 && (
          <p className="text-center text-gray-400">Tidak ada buku ditemukan.</p>
        )}

        {books.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-xl bg-[#393E46] p-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4"
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              {/* Cover */}
              <div className="h-40 w-28 flex-shrink-0 overflow-hidden rounded-lg bg-[#222831] sm:h-24 sm:w-16">
                <Image
                  src={item.cover ? API + item.cover.url : '/default-cover.jpg'}
                  alt={item.cover?.alternativeText || 'Cover Buku'}
                  width={64}
                  height={96}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>

              {/* Detail */}
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-sm italic">
                  {item.categories?.[0]?.name ?? '-'}
                </div>
                <div className="text-sm">{item.writer}</div>
                <div className="text-xs text-gray-400">
                  {item.publisher} • {item.published_year}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-2 pt-2 sm:justify-start">
                  <Link
                    href={`/buku/edit`}
                    className="rounded bg-blue-600 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>
                    <span className="rounded bg-red-600 px-3 py-1 text-sm font-bold text-white hover:bg-red-700">
                      Hapus
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <span
              className={`mt-3 self-center rounded px-3 py-1 text-sm font-bold sm:mt-0 sm:self-auto
              ${item.stock === 0 ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}
            >
              {item.stock === 0 ? 'STOK HABIS' : `Stok: ${item.stock}`}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded bg-[#948979] px-3 py-1 text-white disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded px-3 py-1 ${
                currentPage === index + 1
                  ? 'bg-[#DFD0B8] font-bold text-black'
                  : 'bg-[#393E46] text-white hover:bg-[#4a4f55]'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded bg-[#948979] px-3 py-1 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
