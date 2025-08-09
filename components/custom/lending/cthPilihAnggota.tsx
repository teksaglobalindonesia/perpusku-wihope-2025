'use client';

import React, { useEffect, useState } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Pagination from '../pagination';

type Members = {
  name: string;
  email: string;
  address: string;
  id_member: string;
};

const CthPilihAnggota = () => {
  const [members, setMembers] = useState<Members[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/member/list`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });

        const data = await res.json();
        console.log('Data anggota:', data);
        console.log('TOKEN yang dikirim:', TOKEN);

        if (res.ok && Array.isArray(data.data)) {
          setMembers(data.data);
        } else {
          console.warn('Data anggota tidak valid:', data);
          setMembers([]);
        }
      } catch (err) {
        console.error('Gagal mengambil data anggota:', err);
        setMembers([]);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="min-h-[540px] w-full">
      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <h1 className="ml-12 rounded-lg bg-purple-400 px-3 py-1 text-3xl">
          <span className="font-normal text-yellow-900 underline">
            Pilih Anggota
          </span>
        </h1>
        <input
          type="text"
          placeholder="Search by name, email, or id"
          className="mb-3 w-64 rounded border px-3 py-1"
        />
      </div>

      {/* Tabel */}
      <div className="mx-8 mb-8 rounded-md p-4">
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id_member}
              className="flex items-center justify-between rounded border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                  <img src="/next.svg" alt="Profile" />
                </div>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm">{member.id_member}</p>
                  <p className="text-sm">{member.email}</p>

                  <button className="my-1 mr-1 rounded bg-purple-500 px-3 py-1 text-sm font-bold text-white">
                    Pilih
                  </button>
                </div>
              </div>
            </div>
          ))}

          {members.length === 0 && (
            <p className="text-center text-gray-500">
              Tidak ada anggota ditemukan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CthPilihAnggota;
