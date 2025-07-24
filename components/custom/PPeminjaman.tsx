'use client';
import { useState } from 'react';
import { Card } from './card';

export const DummyPeminjaman = [
  {
    title: 'Buku Sejarah Indonesia',
    peminjam: 'Ahmad Santoso',
    peminjaman: '16 Agustus 2023',
    pengembalian: '20 Agustus 2023',
    label: 'dikembalikan' as const
  },
  {
    title: 'Pengantar Pemrograman Python',
    peminjam: 'Budi Setiawan',
    peminjaman: '10 September 2023',
    pengembalian: '15 September 2023',
    label: 'dipinjam' as const
  },
  {
    title: 'Desain Grafis Modern',
    peminjam: 'Citra Lestari',
    peminjaman: '1 Oktober 2023',
    pengembalian: '12 Oktober 2023',
    label: 'terlambat' as const
  },
  {
    title: 'Kalkulus Dasar Edisi 5',
    peminjam: 'Dewi Anggraeni',
    peminjaman: '20 September 2023',
    pengembalian: '25 September 2023',
    label: 'dikembalikan' as const
  },
  {
    title: 'Machine Learning untuk Pemula',
    peminjam: 'Eko Prasetyo',
    peminjaman: '5 Oktober 2023',
    pengembalian: '15 Oktober 2023',
    label: 'dipinjam' as const
  },
  {
    title: 'Sistem Basis Data',
    peminjam: 'Fitriani Wulandari',
    peminjaman: '12 Agustus 2023',
    pengembalian: '17 Agustus 2023',
    label: 'dikembalikan' as const
  },
  {
    title: 'Algoritma dan Struktur Data',
    peminjam: 'Guntur Wijaya',
    peminjaman: '3 September 2023',
    pengembalian: '20 September 2023',
    label: 'dipinjam' as const
  },
  {
    title: 'Jaringan Komputer',
    peminjam: 'Hana Melati',
    peminjaman: '15 September 2023',
    pengembalian: '20 September 2023',
    label: 'terlambat' as const
  },
  {
    title: 'Pemrograman Web Modern',
    peminjam: 'Irfan Maulana',
    peminjaman: '22 Agustus 2023',
    pengembalian: '30 Agustus 2023',
    label: 'dikembalikan' as const
  },
  {
    title: 'Kecerdasan Buatan Tingkat Lanjut',
    peminjam: 'Joko Susilo',
    peminjaman: '7 Oktober 2023',
    pengembalian: '14 Oktober 2023',
    label: 'dipinjam' as const
  },
  {
    title: 'Analisis Data dengan R',
    peminjam: 'Kartika Sari',
    peminjaman: '18 September 2023',
    pengembalian: '23 September 2023',
    label: 'dikembalikan' as const
  },
  {
    title: 'Keamanan Siber',
    peminjam: 'Lukman Hakim',
    peminjaman: '9 Agustus 2023',
    pengembalian: '14 Agustus 2023',
    label: 'terlambat' as const
  },
  {
    title: 'Pengembangan Aplikasi Mobile',
    peminjam: 'Maya Indah',
    peminjaman: '25 September 2023',
    pengembalian: '30 September 2023',
    label: 'dipinjam' as const
  },
  {
    title: 'Internet of Things',
    peminjam: 'Nugroho Pratama',
    peminjaman: '14 Oktober 2023',
    pengembalian: '19 Oktober 2023',
    label: 'dikembalikan' as const
  },
  {
    title: 'Cloud Computing',
    peminjam: 'Oki Sanjaya',
    peminjaman: '28 Agustus 2023',
    pengembalian: '2 September 2023',
    label: 'terlambat' as const
  }
];

export const PPeminjaman = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  // Calculate members to show
  const lastIndex = currentPage * membersPerPage;
  const firstIndex = lastIndex - membersPerPage;
  const currentPeminjamans = DummyPeminjaman.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(DummyPeminjaman.length / membersPerPage);

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
    return pages
  };

  return (
    <> 
    <Card cardItems={currentPeminjamans.map ((Peminjaman)=> ({
      ...Peminjaman
    }))} />
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
    </>
  )
};
