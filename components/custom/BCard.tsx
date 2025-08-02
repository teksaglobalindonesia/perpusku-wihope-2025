'use client'
import { BASE_URL } from '@/lib/constant';
import { CardGambar } from './cardGambar';
import { useState } from 'react';
import { Pagination } from './pagination';

export const BCard = ({ data }: { data: any[] }) => {
  const [page, setPage] = useState(1)
  const perPage = 4
  const totalPage = Math.ceil(data.length/perPage);
  const sliced = data.slice((page -1 ) * perPage, page * perPage)
  
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 ">
        <CardGambar
          cardItems={sliced.map((bookData: any, index) => ({
            imageSrc: `${BASE_URL}` + bookData?.cover?.url,
            title: bookData?.title,
            genre: bookData?.categories?.map((c:any)=> c.name).join(', '),
            author: bookData?.writer,
            stock: bookData?.stock
          }))}
        />
      </div>
      <Pagination currentPage={page} totalPage={totalPage} onPageChange={setPage}/>
    </div>
  );
};
