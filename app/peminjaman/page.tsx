'use client'
import Header from '@/components/customs/header';
import Footer from '@/components/customs/footer';
import PeminjamanList from '@/components/peminjaman/peminjamanList';
import { useEffect, useState } from 'react';
import { BASE_URL, WIHOPE_NAME, TOKEN } from '@/lib/constant';

export default function Page() {
  const [loanState, setLoanState] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/loan/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });
        if (!res.ok) {
          setError('Gagal memuat data buku');
          setLoading(false);
          return;
        }
        const json = await res.json();
        setLoanState(json?.data ?? []);
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data member');
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
      <PeminjamanList loans={loanState}/>
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
