"use client";

import {BookList} from '@/components/buku/booklist';
import Footer from '@/components/customs/footer';
import Header from '@/components/customs/header';

export default function Page() {

  return (
    <>
      <Header
        items={[
          { text: 'Dashboard', link: '/' },
          { text: 'Buku', link: '/buku' },
          { text: 'Anggota', link: '/anggota' },
          { text: 'Peminjaman', link: '/peminjaman' },
          { text: 'Pengembalian', link: '/pengembalian' }
        ]}
      />
      <BookList />
      <Footer
        items={[
          { text: 'Dashboard', link: '/' },
          { text: 'Buku', link: '/buku' },
          { text: 'Anggota', link: '/anggota' },
          { text: 'Peminjaman', link: '/peminjaman' },
          { text: 'Pengembalian', link: '/pengembalian' }
        ]}
      />
    </>
  );
}
