'use client';

import { useState } from 'react';

export default function PeminjamanList({ loans }: { loans: any[] }) {
  const today = new Date();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(loans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLoans = loans.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="m-4 text-[#DFD0B8] sm:m-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          🏠 Peminjaman
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-[#393E46] bg-[#DFD0B8] px-3 py-2 text-black sm:w-auto"
          />
          <button className="w-full rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 sm:w-auto">
            TAMBAH
          </button>
        </div>
      </div>

      {/* List Peminjaman */}
      <div className="space-y-4">
        {currentLoans.map((item) => {
          const tanggalKembali = new Date(item.return_date);
          const terlambat = !item.sudahKembali && tanggalKembali < today;

          return (
            <div
              key={item.id}
              className="relative rounded border border-[#393E46] bg-[#DFD0B8] p-4 text-black"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>Peminjam: {item.member?.name}</p>
              <p>
                Peminjaman:{' '}
                {new Date(item.loan_date).toLocaleString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p>
                Pengembalian:{' '}
                {new Date(item.return_date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>

              {!item.sudahKembali && (
                <div className="mt-4">
                  <button className="rounded bg-green-600 px-4 py-1 text-sm text-white hover:bg-green-700">
                    KEMBALIKAN
                  </button>
                </div>
              )}

              {terlambat && (
                <div className="absolute right-4 top-4">
                  <span className="rounded bg-red-600 px-4 py-1 text-sm text-white">
                    TERLAMBAT
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination Prev/Next */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-white">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base ${
            currentPage === 1
              ? 'cursor-not-allowed bg-gray-600 text-gray-300'
              : 'bg-[#393E46] hover:bg-[#4e545d]'
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`rounded px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base ${
              currentPage === page
                ? 'bg-[#DFD0B8] font-bold text-black'
                : 'bg-[#948979] hover:bg-[#a89e8e]'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`rounded px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base ${
            currentPage === totalPages
              ? 'cursor-not-allowed bg-gray-600 text-gray-300'
              : 'bg-[#393E46] hover:bg-[#4e545d]'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
