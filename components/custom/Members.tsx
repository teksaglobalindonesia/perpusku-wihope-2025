'use client';
import { MembersCard } from './MCard';
import { useEffect, useState } from 'react';
import { Pagination } from './pagination';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Search, Plus, Users } from 'lucide-react';
import Link from 'next/link';

export const Members = ({ data }: { data: any[] }) => {
  const [members, setMembers] = useState<any[]>(data);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 4;

  useEffect(() => {
    const fetchMembers = async () => {
      if (query.trim() === '') {
        setMembers(data);
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/api/member/list?search=${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });
        const json = await res.json();
        setMembers(json.data || []);
        setPage(1);
      } catch (err) {
        console.error('Gagal fetch data anggota', err);
      }
    };
    fetchMembers();
  }, [query, data]);

  const totalItems = members.length;
  const totalPage = Math.ceil(totalItems / perPage);
  const sliced = members.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-dusty-100 to-dusty-300 p-8">
      <div className="flex flex-col">
        {/* Header Section */}
        <div className="mb-8 border-b border-terracotta-300/50 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="group">
              <h1 className="mb-2 font-vintage text-4xl text-terracotta-600 group-hover:text-terracotta-700 transition-colors duration-300">
                Anggota Perpustakaan
              </h1>
              <p className="font-vintage italic text-terracotta-500/80 group-hover:text-terracotta-600/90 transition-colors duration-300">
                Kelola data anggota perpustakaan
              </p>
            </div>

            <Link
              href="/members/addMember"
              className="flex items-center justify-center gap-2 rounded-lg bg-terracotta-500 px-5 py-2.5 font-vintage text-white shadow-lg transition-all duration-300 hover:bg-terracotta-600 hover:shadow-xl hover:scale-[1.02] active:scale-95"
            >
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>Tambah Anggota</span>
            </Link>
          </div>

          <div className="relative mt-6 group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-terracotta-500 group-hover:text-terracotta-600 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Cari anggota..."
              className="block w-full rounded-xl border-2 border-terracotta-300/50 bg-white/80 py-2.5 pl-10 pr-3 font-vintage text-terracotta-700 placeholder-terracotta-400/70 focus:border-terracotta-500 focus:outline-none focus:ring-2 focus:ring-terracotta-300/30 focus:bg-white/95 transition-all duration-300 hover:border-terracotta-400/70 hover:shadow-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Card Container */}
        <div className="space-y-6">
          {sliced.length > 0 ? (
            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-terracotta-200/50  hover:shadow-xl hover:border-terracotta-300/70 transition-all duration-500 p-6">
            <MembersCard
              cardItems={sliced.map((anggotaData) => ({
                name: anggotaData?.name,
                UID: anggotaData?.id_member,
                email: anggotaData?.email,
                buttons: ['peminjaman', 'edit', 'delete']
              }))}
            />
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-terracotta-200/50 shadow-lg hover:shadow-xl hover:border-terracotta-300/70 transition-all duration-500">
              <div className="mb-4 transform hover:scale-110 transition-transform duration-500">
                <Users className="w-16 h-16 mx-auto text-terracotta-400/80" strokeWidth={1.5} />
              </div>
              <h3 className="font-vintage text-2xl font-semibold text-terracotta-700 mb-3">
                Belum ada anggota
              </h3>
              <p className="text-terracotta-600/80 mb-6 max-w-md mx-auto">
                {query ? 'Tidak ada anggota yang cocok dengan pencarian Anda' : 'Mulai dengan menambahkan anggota baru'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="mt-8 transform hover:scale-[1.01] transition-transform duration-300">
            <Pagination
              currentPage={page}
              totalPage={totalPage}
              onPageChange={setPage}
            />
          </div>
        )}

        {/* Stats Footer */}
        {sliced.length > 0 && (
          <div className="mt-6 text-center text-sm text-terracotta-600/90 font-vintage hover:text-terracotta-700 transition-colors duration-300">
            Menampilkan <span className="font-bold">{sliced.length}</span> anggota dari total <span className="font-bold">{totalItems || 0}</span> anggota
          </div>
        )}
      </div>
    </div>
  );
};