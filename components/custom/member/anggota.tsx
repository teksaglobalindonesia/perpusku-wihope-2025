'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
// import { useSearchParams } from 'next/navigation';
import Pagination from '../pagination';

type Members = {
  name: string;
  email: string;
  address: string;
  id_member: string;
};

const Anggota = () => {
  const pathname = usePathname();
  const [members, setMembers] = useState<Members[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/member/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }

        const json = await response.json();
        setMembers(json.data || []);
      } catch (err: any) {
        console.error('❌ Error saat fetch:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const navItems = [{ path: '/anggota/add', label: 'Tambah Anggota' }];

  const hasilPencarian = members.filter(
    (anggota) =>
      anggota.name.toLowerCase().includes(keyword.toLowerCase()) ||
      anggota.email.toLowerCase().includes(keyword.toLowerCase()) ||
      anggota.id_member.toLowerCase().includes(keyword.toLowerCase())
  );

  // const [members, setMembers] = useState(initialMember);

  // const handleHapusClick = (noAnggota: string) => {
  //   const konfirmasi = confirm(`Yakin ingin menghapus anggota ${noAnggota}?`);
  //   if (konfirmasi) {
  //     setMembers((prev) => prev.filter((m) => m.noAnggota !== noAnggota));
  //   }
  // };

  const totalPages = Math.ceil(hasilPencarian.length / itemsPerPage);
  const paginatedItems = hasilPencarian.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-yellow-200 px-3 py-1 text-3xl">
          🫂{' '}
          <span className="font-normal text-yellow-900 underline">
            List Anggota Perpusku
          </span>
        </h1>
        <div className="ml-12">
          <input
            type="text"
            placeholder="Search by name, email, or id"
            className="mb-3 w-64 rounded border px-3 py-1"
            onChange={(e) => setKeyword(e.target.value)}
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
          {paginatedItems.map((Members) => (
            <div
              key={Members.id_member}
              className="flex items-center justify-between rounded border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                  <img src="" alt={Members.name} />
                </div>
                <div>
                  <p className="font-semibold">{Members.name}</p>
                  <p className="text-sm">{Members.id_member}</p>
                  <p className="text-sm">{Members.email}</p>

                  <Link href={`/anggota/anggotaPinjam`}>
                    <button className="my-1 mr-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
                      Peminjaman
                    </button>
                  </Link>

                  <Link href={`/anggota/edit?id=${Members.id_member}`}>
                    <button className="my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="mx-2 my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white"
                    // onClick={() => handleHapusClick(Members.id_member)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Anggota;
