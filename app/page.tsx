import Book from '@/components/custom/book/buku';
import Hero from '@/components/custom/hero';
import Pinjam from '@/components/custom/lending/pinjam';
import Kembali from '@/components/custom/retur/pengembalian';

export default async function Page() {
  return (
    <>
      <Hero />
      <h1 className="m-8 rounded-lg bg-red-200 px-8 py-5 text-3xl">
        📚{' '}
        <span className="font-normal text-red-700 underline">
          ♦️List Buku Habis
        </span>
      </h1>
      <Book filterOutOfStock />
      <Pinjam />
      <Kembali />
    </>
  );
}
