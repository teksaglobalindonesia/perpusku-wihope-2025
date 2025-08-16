  "use client";

  import Header from '@/components/customs/header';
  import Footer from '@/components/customs/footer';
  import AnggotaList from '@/components/anggota/anggotaList';
  import { useEffect, useState } from 'react';
  import { BASE_URL, WIHOPE_NAME, TOKEN } from '@/lib/constant';

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
        <AnggotaList/>
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
