'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Pagination from '../pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

type Lending = {
  documentId: string;
  book: {
    title: string;
    id: number;
  };
  member: {
    name: string;
    id_member: string;
  };
  loan_date: number;
  return_date: number;
  actual_return_date: number;
};

const Pinjam = () => {
  const [loading, setLoading] = useState(true);
  const [lending, setLending] = useState<Lending[]>([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const searchParams = useSearchParams();
  const memberId = searchParams.get('memberId');
  const nameId = searchParams.get('nameId');

  // Fungsi untuk mengembalikan buku
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
            actual_return_date: new Date().toISOString()
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

  // Fetch daftar pinjaman
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/loan/list?status=loaned`,
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

        if (!response.ok) throw new Error('Gagal mengambil data');

        const json = await response.json();
        setLending(json.data || []);
        setError(null);
      } catch (err: any) {
        console.error('❌ Error saat fetch:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Cari nama anggota berdasarkan memberId dari data lending
  const memberName = memberId
    ? lending.find((item) => item.member.id_member === memberId)?.member.name ||
      'Tidak ditemukan'
    : 'Semua anggota';

  const hasilPencarian = lending
    .filter((pinjam) => !memberId || pinjam.member.id_member === memberId)
    .filter(
      (pinjam) =>
        pinjam.book.title.toLowerCase().includes(keyword.toLowerCase()) ||
        pinjam.member.name.toLowerCase().includes(keyword.toLowerCase()) ||
        pinjam.loan_date.toString().includes(keyword) ||
        pinjam.return_date.toString().includes(keyword)
    );

  const totalPages = Math.ceil(hasilPencarian.length / itemsPerPage);
  const paginatedItems = hasilPencarian.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <div className="ml-12 rounded-lg bg-yellow-200 px-3 py-1 text-3xl">
          {'🫂'}
          <span className="font-normal text-yellow-900 underline">
            List Pinjaman Anggota
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="rounded border px-3 py-1"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <h2 className="ml-8">
        <span className="rounded-lg bg-yellow-200 px-3 py-1 text-xl text-black">
          Anggota: {memberName}
        </span>
      </h2>

      {/* Tabel daftar pinjaman */}
      <div className="mx-8 mb-8 rounded-md p-4">
        {loading ? (
          <p className="text-center">Loading data pinjaman...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : paginatedItems.length === 0 ? (
          <p className="text-center">Tidak ada pinjaman yang ditemukan</p>
        ) : (
          <div className="space-y-4">
            {paginatedItems.map((item) => {
              const terlambat =
                item.actual_return_date > item.return_date ? 'Terlambat' : '';
              return (
                <div
                  key={item.documentId}
                  className="flex items-center justify-between rounded border p-4"
                >
                  <div className="mx-4 flex items-center gap-4">
                    <div>
                      <p className="font-semibold">{item.book.title}</p>
                      <p className="text-sm">Peminjam: {item.member.name}</p>
                      <p className="text-sm">
                        Tanggal Peminjaman: {item.loan_date}
                      </p>
                      <p className="text-sm">
                        Jadwal Pengembalian: {item.return_date}
                      </p>
                      <p className="text-sm">
                        Tanggal Pengembalian: {item.actual_return_date}
                      </p>
                      <button
                        onClick={() => handleReturn(item.documentId)}
                        className="my-1 mr-1 rounded bg-yellow-500 px-5 py-2 text-sm font-bold text-white hover:bg-yellow-400"
                      >
                        Kembalikan
                      </button>
                    </div>
                  </div>
                  {terlambat && (
                    <span className="rounded bg-yellow-700 px-6 py-2 text-white">
                      {terlambat}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {paginatedItems.length > 0 && !loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Pinjam;
