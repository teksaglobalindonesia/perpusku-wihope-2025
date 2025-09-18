import Book from '@/components/custom/book/buku';
import Hero from '@/components/custom/hero';
import Pinjam from '@/components/custom/lending/pinjam';
import Kembali from '@/components/custom/retur/pengembalian';
import HeroTest from './pengembalian/test';

export default async function Page() {
  return (
    <>
      <Hero />
      <HeroTest />
      <h1 className="ml-10 mt-10 pl-6 text-3xl text-foreground">
        {' '}
        <span className="rounded-lg bg-red-300 dark:bg-red-800 px-5 py-3 font-normal text-red-950 dark:text-red-200 underline">
          ❌ List Buku Habis
        </span>
      </h1>

      <Book filterOutOfStock />
      <Pinjam />
      <Kembali />
    </>
  );
}
