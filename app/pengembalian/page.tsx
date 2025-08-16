  import Header from '@/components/customs/header';
  import Footer from '@/components/customs/footer';
import PengembalianList from '@/components/pengembalian/pengembalianList';

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
        <PengembalianList/>
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
