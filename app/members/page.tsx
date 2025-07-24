'use client';
import { MembersCard } from '@/components/custom/MCard';
import Link from 'next/link';
import { useState } from 'react';

// Simple dummy data
const dummyMembers = [
  { name: 'John Doe', UID: 1001, email: 'john@example.com' },
  { name: 'Jane Smith', UID: 1002, email: 'jane@example.com' },
  { name: 'Bob Johnson', UID: 1003, email: 'bob@example.com' },
  { name: 'Alice Brown', UID: 1004, email: 'alice@example.com' },
  { name: 'Charlie Wilson', UID: 1005, email: 'charlie@example.com' },
  { name: 'Diana Lee', UID: 1006, email: 'diana@example.com' },
  { name: 'Eva Green', UID: 1007, email: 'eva@example.com' },
  { name: 'Frank White', UID: 1008, email: 'frank@example.com' },
  { name: 'John Doe', UID: 1001, email: 'john@example.com' },
  { name: 'Jane Smith', UID: 1002, email: 'jane@example.com' },
  { name: 'Bob Johnson', UID: 1003, email: 'bob@example.com' },
  { name: 'Alice Brown', UID: 1004, email: 'alice@example.com' },
  { name: 'Charlie Wilson', UID: 1005, email: 'charlie@example.com' },
  { name: 'Diana Lee', UID: 1006, email: 'diana@example.com' },
  { name: 'Eva Green', UID: 1007, email: 'eva@example.com' },
  { name: 'Frank White', UID: 1008, email: 'frank@example.com' }
];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 6;

  // Calculate members to show
  const lastIndex = currentPage * membersPerPage;
  const firstIndex = lastIndex - membersPerPage;
  const currentMembers = dummyMembers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(dummyMembers.length / membersPerPage);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 1; // Number of pages to show around current page

    // Always show first page
    pages.push(1);

    // Add ellipsis if current page is far from start
    if (currentPage > maxVisible + 1) {
      pages.push('...');
    }

    // Calculate range of pages to show around current page
    const start = Math.max(2, currentPage - maxVisible);
    const end = Math.min(totalPages - 1, currentPage + maxVisible);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if current page is far from end
    if (currentPage < totalPages - maxVisible) {
      pages.push('...');
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className=" min-h-screen bg-beige-100 p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-vintage text-3xl font-bold text-vintage-brown">
          Anggota
        </h1>
        <Link href="/members/addMember">
          <button className="rounded bg-vintage-sage px-4 py-2 font-vintage text-beige-100 transition-colors hover:bg-vintage-sage/90">
            Tambah Anggota
          </button>
        </Link>
      </div>

      {/* Members Card */}
      <div className="rounded-xl bg-beige-200 p-4 shadow-xl">
        <MembersCard
          cardItems={currentMembers.map((member) => ({
            ...member,
            buttons: ['peminjaman', 'edit', 'delete']
          }))}
        />
        {/* Vintage Pagination with Page Numbers */}
        <div className="mt-6 flex items-center justify-center gap-2 font-vintage">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="rounded border border-beige-400 px-3 py-1 text-beige-800 transition-colors hover:bg-beige-200 disabled:opacity-40"
          >
            Prev
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              className={`h-8 w-8 rounded border ${
                page === currentPage
                  ? 'border-vintage-sage bg-vintage-sage/20 text-vintage-sage'
                  : 'border-beige-300 text-beige-700 hover:bg-beige-200'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded border border-beige-400 px-3 py-1 text-beige-800 transition-colors hover:bg-beige-200 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
