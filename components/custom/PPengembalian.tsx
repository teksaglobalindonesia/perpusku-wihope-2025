'use client';
import Link from 'next/link';
import { Card } from '../custom/card';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from './pagination';

export const Return = ({ data }: { data: any[] }) => {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const totalPage = Math.ceil(data.length / perPage);
  const sliced = data.slice((page - 1) * perPage, page * perPage);

  const isLate = (returnDate: string, actualReturnDate: string | null) => {
    if (!actualReturnDate) return false;
    return new Date(actualReturnDate) > new Date(returnDate);
  };

  return (
    <div className="min-h-screen rounded-lg bg-dusty-200 p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-vintage-terracotta pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 font-vintage text-4xl text-vintage-brown">
                Riwayat Pengembalian
              </h1>
              <p className="font-vintage italic text-vintage-slate">
                Catatan literatur yang telah kembali ke rak pengetahuan
              </p>
            </div>

            <Link
              href=""
              className="flex items-center justify-center gap-2 rounded-md bg-vintage-sage px-4 py-2 font-vintage text-white shadow-md transition-colors hover:bg-vintage-sage/90 hover:shadow-lg"
            >
              <span className="text-lg">+</span>
              Tambah Data
            </Link>
          </div>

          <div className="relative mt-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-vintage-terracotta" />
            </div>
            <input
              type="text"
              placeholder="Cari riwayat pengembalian..."
              className="block w-full rounded-md border border-vintage-parchment bg-white bg-opacity-70 py-2 pl-10 pr-3 font-vintage text-vintage-brown placeholder-vintage-slate/70 focus:border-vintage-sage focus:outline-none focus:ring-1 focus:ring-vintage-sage"
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
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
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
