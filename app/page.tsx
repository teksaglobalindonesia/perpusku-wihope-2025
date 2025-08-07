import { Dashboard } from '@/components/custom/dashboard';
import { DPinjaman } from '@/components/custom/DPinjaman';
import { DPengembalian } from '@/components/custom/DPengembalian';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import React from 'react';

export default async function Page() {
        const bukus = await fetch(`${BASE_URL}/api/book/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            TOKEN,
          'x-wihope-name':WIHOPE_NAME
        },
        cache:'no-store'
      });
      const result = await bukus.json()
  return (
    <>
      <div className="px-8">
        <Dashboard data = {result.data} />
        <DPinjaman />
        <DPengembalian />
        <div className="my-10"></div>
      </div>
    </>
  );
}
