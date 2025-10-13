'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Pagination from '../pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

type Lending = {
  documentId: string;
  id: number; // tambahkan id supaya bisa dipakai buat return
  book: {
    title: string;
    id: number;
  };
  member: {
    name: string;
  };
  loan_date: number;
  return_date: number;
  actual_return_date: number;
};

const Pinjam = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [lending, setLending] = useState<Lending[]>([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleReturn = async (loanId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/return/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify({
          data: {
            loan: loanId,
            actual_return_date: new Date().toISOString() // catat tanggal kembalinya
          }
        })
      });

      if (!response.ok) {
        throw new Error('Gagal mengembalikan buku');
      }

      // refresh list setelah pengembalian
      setLending((prev) => prev.filter((loan) => loan.documentId !== loanId));
      alert('✅ Buku berhasil dikembalikan!');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Terjadi kesalahan saat mengembalikan');
    }
  };

  useEffect(() => {
    const fetchAllLoans = async () => {
      try {
        setLoading(true);
        let page = 1;
        let allLoans: Lending[] = [];
        let totalPages = 1;

        do {
          const response = await fetch(
            `${BASE_URL}/api/loan/list?status=loaned&page=${page}`,
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
            throw new Error('Gagal mengambil data peminjaman');
          }

          const json = await response.json();
          allLoans = allLoans.concat(json.data || []);
          totalPages = json.meta?.pagination?.page_count || 1;
          page++;
        } while (page <= totalPages);

        setLending(allLoans);
      } catch (err: any) {
        console.error('❌ Error saat fetch:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllLoans();
  }, []);

  const hasilPencarian = lending.filter(
    (pinjam) =>
      (pinjam.book?.title?.toLowerCase() || '').includes(
        keyword.toLowerCase()
      ) ||
      (pinjam.member?.name?.toLowerCase() || '').includes(
        keyword.toLowerCase()
      ) ||
      pinjam.loan_date?.toString().includes(keyword) ||
      pinjam.return_date?.toString().includes(keyword)
  );

  const totalPages = Math.ceil(hasilPencarian.length / itemsPerPage);
  const paginatedItems = hasilPencarian.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-[540px] w-full">
      <h1 className="ml-10 mt-10 text-3xl">
        <span className="rounded-lg bg-purple-200 px-5 py-3 font-normal text-purple-900 underline">
          🛒 List Peminjaman
        </span>
      </h1>

      <div className="mt-6 flex flex-col items-center justify-between p-4 px-9 font-light md:flex-row">
        <input
          type="text"
          placeholder="Search by title, name, or date"
          className="w-64 rounded border px-3 py-1 text-black"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Link href="/peminjaman/add">
          <button className="text-md rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
            Tambah Peminjaman
          </button>
        </Link>
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
            <p>Memuat data peminjaman dari server...</p>
          </div>
        </div>
      ) : (
        <div className="mx-8 mb-8 space-y-4 rounded-md p-4">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((pinjam) => (
              <div
                key={pinjam.id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div className="mx-4 flex items-center gap-4">
                  <div>
                    {/* <p className="font-semibold">{pinjam.book.title}</p> */}
                    <p className="font-semibold">
                      {pinjam.book?.title || '📚 Judul tidak tersedia'}
                    </p>
                    <p className="text-sm">
                      Peminjam: {pinjam.member?.name || '❓ Tidak diketahui'}
                    </p>
                    {/* <p className="text-sm">Peminjam: {pinjam.member.name}</p> */}
                    <p className="text-sm">
                      Tanggal Peminjaman: {pinjam.loan_date}
                    </p>
                    <p className="text-sm">
                      Tanggal Pengembalian: {pinjam.return_date}
                    </p>
                    <button
                      onClick={() => handleReturn(pinjam.documentId)}
                      className="my-1 mr-1 rounded bg-purple-500 px-5 py-2 text-sm font-bold text-white"
                    >
                      Kembalikan
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p className="text-lg font-medium">
                {keyword
                  ? 'Tidak ada hasil ditemukan'
                  : 'Belum ada data peminjaman'}
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

export default Pinjam;
