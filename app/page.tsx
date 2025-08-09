import Header from '@/components/customs/header';
import { StokHabis } from '@/components/customs/bukustokhabis';
import PeminjamanHariIni from '@/components/customs/peminjamanHariIni';
import PengembalianHariIni from '@/components/customs/pengembalianHariini';
import Footer from '@/components/customs/footer';

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
      <StokHabis
        items={[
          {
            img: '/image/images.jpeg',
            judul: '69420',
            genre: 'Anjay',
            penulis: 'Samuel',
            stok: 'Habis'
          },
          {
            img: '/image/images.jpeg',
            judul: 'Bumi Manusia',
            genre: 'Fiksi',
            penulis: 'Pramoedya Ananta Toer',
            stok: 'Habis'
          }
        ]}
      />
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
