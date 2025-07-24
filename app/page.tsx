'use client';
import { Header } from '@/components/custom/header';
import { Dashboard } from '@/components/custom/dashboard';
import { DPinjaman } from '@/components/custom/DPinjaman';
import { DPengembalian } from '@/components/custom/DPengembalian';
import React from 'react';

export default function Page() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPage = 10;
  return (
    <>
      <div className="px-8">
        <Dashboard />
        {/* <CardGambar /> */}
        <DPinjaman />
        <DPengembalian />
        <div className="my-10">
          
        </div>
      </div>
    </>
  );
}
