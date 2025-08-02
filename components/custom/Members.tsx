'use client';
import { MembersCard } from './MCard';
import { useState } from 'react';
import { Pagination } from './pagination';
export const Members = ({ data }: { data: any[] }) => {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const totalPage = Math.ceil(data.length / perPage);
  const sliced = data.slice((page - 1) * perPage, page * perPage);
  return (
      <> 
      <div className="rounded-xl bg-beige-200 p-4 shadow-xl flex flex-col">
        <MembersCard
          cardItems={sliced.map((anggotaData: any) => ({
            name: anggotaData?.name,
            UID: anggotaData?.id_member,
            email: anggotaData?.email,
            buttons: ['peminjaman', 'edit', 'delete']
          }))}
        />
        <Pagination currentPage={page} totalPage={totalPage} onPageChange={setPage}/>
      </div>
      

      </>
  );
};
