import Image from 'next/image';
import Link from 'next/link'; 

export const Header = () => {
  return (
    <div className="flex h-[75px] w-full items-center bg-white px-20 shadow-lg">
      <div className="flex-1">
        <h1 className='text-[30px] font-bold'>
          Perpus<span className='text-green-500'>Ku</span>
        </h1>
      </div>

      <div className="flex flex-row gap-[40px]">
        <button className="rounded px-4 py-2 ring-2 ring-orange-500 transition hover:bg-orange-400">
          Dashboard
        </button>

        <Link href="/buku">
          <button className="rounded px-4 py-2 ring-2 ring-gray-500">
            Buku
          </button>
        </Link>

        <Link href="/anggota">
          <button className="rounded px-4 py-2 ring-2 ring-gray-500">
            Anggota
          </button>
        </Link>
        <Link href="/peminjaman">
        <button className="rounded px-4 py-2 ring-2 ring-gray-500">Peminjaman</button>
        </Link>
        <button className="rounded px-4 py-2 ring-2 ring-gray-500">Pengembalian</button>
      </div>
    </div>
  );
};
