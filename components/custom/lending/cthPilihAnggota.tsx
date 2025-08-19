'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

type Member = {
  id: number;
  documentId: string;
  name: string;
};

export default function CthPilihAnggota() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        let page = 1;
        let allMembers: Member[] = [];
        let totalPages = 1;

        do {
          const res = await fetch(`${BASE_URL}/api/member/list?page=${page}`, {
            headers: { Authorization: TOKEN, 'x-wihope-name': WIHOPE_NAME },
            cache: 'no-store'
          });
          const data = await res.json();
          allMembers = allMembers.concat(data?.data ?? []);
          totalPages = data?.meta?.pagination?.page_count || 1;
          page++;
        } while (page <= totalPages);

        setMembers(allMembers);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat buku');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  // useEffect(() => {
  //   fetch(`${BASE_URL}/api/member/list`, {
  //     headers: { Authorization: TOKEN, 'x-wihope-name': WIHOPE_NAME },
  //     cache: 'no-store'
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMembers(data?.data ?? []);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (members.length === 0)
    return <p className="p-4">Tidak ada anggota ditemukan</p>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Pilih Anggota</h1>
      <div className="grid gap-4">
        {members.map((member) => (
          <div
            key={member.documentId}
            className="flex items-center justify-between rounded bg-gray-100 p-4 shadow"
          >
            <div>
              <p className="font-semibold">{member.name}</p>
            </div>
            <Link
              href={`/peminjaman/add?documentId_member=${
                member.documentId
              }&member_name=${encodeURIComponent(member.name)}`}
              className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
              Pilih
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
