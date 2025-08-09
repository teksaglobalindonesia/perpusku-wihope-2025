'use client';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  // ⛔ Jika halaman kurang dari atau sama dengan 1, tidak perlu render pagination
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }

    return pages;
  };

  const handleClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-6 flex justify-center space-x-2 text-sm text-gray-700">
      {/* Tombol sebelumnya */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="rounded-md border px-3 py-1 hover:bg-gray-200"
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      {/* Halaman */}
      {generatePageNumbers().map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item)}
          className={`rounded-md border px-3 py-1 ${
            item === currentPage
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-200'
          }`}
          disabled={item === '...'}
        >
          {item}
        </button>
      ))}

      {/* Tombol berikutnya */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        className="rounded-md border px-3 py-1 hover:bg-gray-200"
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
