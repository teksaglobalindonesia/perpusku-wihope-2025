import { Header } from '@/components/customs/layouts/header';
import { ReturningListSection } from '@/components/customs/sections/returning/returningList';
import { fetcher } from '@/lib/fetcher';

export default async function ReturningPage() {
  const data = await fetcher({ path: '/api/peminjaman' });

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
      href: '/returning'
    }
  ];

  return (
    <>
      <Header navLinks={NavDatas} title="" />
      <div className="px-[50px]">
        <ReturningListSection data={data?.data?.data} />
      </div>
    </>
  );
}
