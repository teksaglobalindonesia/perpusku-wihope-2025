'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Pagination from '../pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { date } from 'zod';

type Lending = {
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

        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }

        const json = await response.json();
        setLending(json.data || []);
      } catch (err: any) {
        console.error('❌ Error saat fetch:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const hasilPencarian = lending.filter(
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
        <h1 className="ml-12 rounded-lg bg-purple-200 px-3 py-1 text-3xl">
          {'🛒'}
          <span className="font-normal text-purple-900 underline">
            List Peminjaman
          </span>
        </h1>
        <div className="ml-12">
          <input
            type="text"
            placeholder="Search by title, name, or date"
            className="mb-3 w-64 rounded border px-3 py-1"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Link href="/peminjaman/add">
            <button className="text-md mx-2 rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
              Tambah Peminjaman
            </button>
          </Link>
        </div>
      </div>

      {/* Tabel */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {paginatedItems.map((Lending) => {
            // const Terlambat =
            // > Lending.return_date
            //     ? ''
            //     : 'Terlambat';
            return (
              <div
                key={Lending.book.id}
                className="flex items-center justify-between rounded border p-4"
              >
                <div className="mx-4 flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{Lending.book.title}</p>
                    <p className="text-sm">Peminjam: {Lending.member.name}</p>
                    <p className="text-sm">
                      Tanggal Peminjaman: {Lending.loan_date}
                    </p>
                    <p className="text-sm">
                      Tanggal Pengembalian: {Lending.return_date}
                    </p>
                    <button className="my-1 mr-1 rounded bg-purple-500 px-5 py-2 text-sm font-bold text-white">
                      Kembalikan
                    </button>
                  </div>
                </div>
                {/* {Terlambat && (
                  <span className="rounded bg-red-500 px-6 py-2 text-white">
                    {Terlambat}
                  </span>
                )} */}
              </div>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Pinjam;
