import { BooksList } from '@/components/customs/sections/books/booksList';
import {
  Header,
  NavLinkHeadeDataTypes
} from '@/components/customs/layouts/header';
import { fetcher } from '@/lib/fetcher';

export default async function BukuPage() {
  const NavDatas: Array<NavLinkHeadeDataTypes> = [
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

  const books: any = await fetcher({ path: '/book/list' });
  return (
    <div className="min-h-screen ">
      <Header title="My Perpus Gwah" navLinks={NavDatas} />
      <div className="px-[50px]">
        <BooksList title="Buku" data={books} />
      </div>
    </div>
  );
}
