import { Header } from '@/components/customs/layouts/header';
import { ListPeminjamanSection } from '@/components/customs/sections/peminjaman/listPeminjaman';
import { fetcher } from '@/lib/fetcher';

export default async function Peminjaman() {
  const response = await fetcher({ path: '/api/peminjaman' });

  const NavDatas = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Buku',
      href: '/books'
    },
    {
      label: 'Anggota',
      href: '/members'
    },
    {
      label: 'Peminjaman',
      href: '/borrows'
    },
    {
      label: 'Pengembalian',
      href: '/returns'
    }
  ];

  return (
    <div>
      <Header navLinks={NavDatas} title="" />
      <div className="px-[50px]">
        <ListPeminjamanSection data={response} />
      </div>
    </div>
  );
}
