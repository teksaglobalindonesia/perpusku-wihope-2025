import Footer from '@/components/customs/footer';
import Header from '@/components/customs/header';
import EditBook from '@/components/buku/editBook';

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
      <EditBook/>
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
