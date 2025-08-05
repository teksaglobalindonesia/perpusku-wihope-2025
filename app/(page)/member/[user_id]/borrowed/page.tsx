import { Header } from '@/components/customs/layouts/header';
import { BorrowedBooksSection } from '@/components/customs/sections/members/borrowedBookSection';
import { fetcher } from '@/lib/fetcher';

export default async function UserBorrowedBooksPage({
  params
}: {
  params: any;
}) {
  const response = await fetcher({
    path: `/api/members/${params.user_id}/borrow`
  });

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
      <Header navLinks={NavDatas} title="yaudah" />
      <div className="px-[50px]">
        <BorrowedBooksSection data={response?.data?.data} />
      </div>
    </div>
  );
}
