'use client'

import Header from '@/components/customs/header';
import { StokHabis } from '@/components/customs/bukustokhabis';
import PeminjamanHariIni from '@/components/customs/peminjamanHariIni';
import PengembalianHariIni from '@/components/customs/pengembalianHariini';
import Footer from '@/components/customs/footer';
import { useEffect,useState } from 'react';
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
      <StokHabis books={bukuState}/>
      <PeminjamanHariIni
        items={[
          {
            judul: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
            peminjam: 'Widhi',
            tanggalPinjam: '17 Juli 2025',
            jamPinjam: '08.00',
            tanggalKembali: '24 Juli 2025'
          },
          {
            judul: 'Cara Menghasilkan Dollar dari Youtube',
            peminjam: 'Samsul',
            tanggalPinjam: '17 Juli 2025',
            jamPinjam: '09.00',
            tanggalKembali: '31 Juli 2025'
          }
        ]}
      />
      <PengembalianHariIni
        items={[
          {
            judul: 'Buku Cara Jadi Fullstack Dalam 1 Hari',
            peminjam: 'Widhi',
            tanggalPinjam: '17 Juli 2025',
            jamPinjam: '08.00',
            tanggalKembali: '24 Juli 2025'
          },
          {
            judul: 'Cara Menghasilkan Dollar dari Youtube',
            peminjam: 'Samsul',
            tanggalPinjam: '17 Juli 2025',
            jamPinjam: '09.00',
            tanggalKembali: '31 Juli 2025'
          }
        ]}
      />
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
