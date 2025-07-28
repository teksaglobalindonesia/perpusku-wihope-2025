'use client';
import {
  Header,
  NavLinkHeadeDataTypes
} from '@/components/customs/layouts/header';
import { MembersList } from '@/components/customs/sections/members/membersList';
import { fetcher } from '@/lib/fetcher';

export default async function Members() {
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

  const members = await fetcher({ path: '/api/members' });
  return (
    <div>
      <Header navLinks={NavDatas} title="My Perpus (Gwah)" />
      <div className="px-[50px]">
        <MembersList title="Anggota" data={members} />
      </div>
    </div>
  );
}
