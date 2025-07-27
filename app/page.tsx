import {
  Header,
  NavLinkHeadeDataTypes
} from '@/components/customs/layouts/header';
import { BookBorrowedSection } from '@/components/customs/sections/home/bookBorrowedSection';
import { BookReturningTodaySection } from '@/components/customs/sections/home/bookReturningTodaySection';
import { BooksOutOfStock } from '@/components/customs/sections/home/booskOutOfStockSection';
import { fetcher } from '@/lib/fetcher';

export default async function Page() {
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
      href: '/returns'
    }
  ];

  const books: any = await fetcher({ path: '/api/books' });
  const peminjaman = await fetcher({ path: '/api/peminjaman' });
  console.log('trigger');
  // console.log({ data: peminjaman?.data?.data?. });

  return (
    <div className="w-full">
      <Header title="Perpus Ku" navLinks={NavDatas} />
      <div className="mx-auto mt-[30px] flex  flex-col items-center gap-[10px] px-[50px] py-[20px]">
        <div className="w-full">
          <h1 className="text-2xl">Dashboard</h1>
        </div>
        <div className="flex w-full flex-col gap-[30px] ">
          <BooksOutOfStock title="Buku Stock Habis" data={books} />
          <BookBorrowedSection title="Peminjaman Hari Ini" data={peminjaman} />
          <BookReturningTodaySection
            title="Pengembalian Hari Ini"
            data={peminjaman}
          />
        </div>
      </div>
    </div>
  );
}
