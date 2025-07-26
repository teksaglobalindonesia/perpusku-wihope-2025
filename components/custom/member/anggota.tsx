'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const initialMember = [
  { nama: 'Joh', noAnggota: '12345', email: 'john@yahodie.com' },
  { nama: 'Jane', noAnggota: '67890', email: 'jennie@gmail.com' },
  { nama: 'Doe', noAnggota: '54321', email: 'dodo@gmail.com' }
];

const Anggota = () => {
  const pathname = usePathname();
  const [members, setMembers] = useState(initialMember);

  const handleHapusClick = (noAnggota: string) => {
    const konfirmasi = confirm(`Yakin ingin menghapus anggota ${noAnggota}?`);
    if (konfirmasi) {
      setMembers((prev) => prev.filter((m) => m.noAnggota !== noAnggota));
    }
  };

  const navItems = [{ path: '/anggota/add', label: 'Tambah Anggota' }];

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-yellow-200 px-3 py-1 text-3xl">
          🫂{' '}
          <span className="font-normal text-yellow-900 underline">
            List Anggota Perpusku
          </span>
        </h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="rounded border px-3 py-1"
          />
          <Link href={navItems[0].path}>
            <button className="text-md mx-2 rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
              {navItems[0].label}
            </button>
          </Link>
        </div>
      </div>

      {/* Tabel */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {members.map((item) => (
            <div
              key={item.noAnggota}
              className="flex items-center justify-between rounded border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                  <img src="/next.svg" alt="" />
                </div>
                <div>
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm">{item.noAnggota}</p>
                  <p className="text-sm">{item.email}</p>

                  <Link href={`/anggota/anggotaPinjam`}>
                    <button className="my-1 mr-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
                      Peminjaman
                    </button>
                  </Link>

                  <Link href={`/anggota/edit?id=${item.noAnggota}`}>
                    <button className="my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="mx-2 my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white"
                    onClick={() => handleHapusClick(item.noAnggota)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-2 text-sm text-gray-700">
          {['<', 1, 2, '...', 20, '>'].map((item, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-200"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Anggota;
