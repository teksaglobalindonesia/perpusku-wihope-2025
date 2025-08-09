"use client";

import { useEffect, useState } from 'react';
import { BookList } from '@/components/buku/booklist';
import Footer from '@/components/customs/footer';
import Header from '@/components/customs/header';
import { BASE_URL, WIHOPE_NAME, TOKEN } from '@/lib/constant';

export default function Page() {
  const [bukuState, setBukuState] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/book/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME,
        },
        cache: 'no-store',
      });
      if (!res.ok) {
        setError('Gagal memuat data buku');
        setLoading(false);
        return;
      }
      const json = await res.json();
      setBukuState(json?.data ?? []);
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat data buku');
      setLoading(false);
    }
  })();
}, []);


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
      <BookList books={bukuState} />
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
