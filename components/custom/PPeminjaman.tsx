'use client'
import { Card } from "./card";
import { useState } from "react";
import { Pagination } from "./pagination";


export const Loan = ({data} : {data: any[]}) => {
  const [page, setPage] = useState(1)
  const perPage = 4
  const totalPage = Math.ceil(data.length/perPage);
  const sliced = data.slice((page - 1 ) * perPage, page * perPage)

  return (
    <> 
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
      <Card cardItems={sliced.map((loanList: any, index)=> ({
        title: loanList?.book.title,
        peminjam: loanList?.member.name,
        peminjaman: loanList?.loan_date,
        pengembalian: loanList?.return_date,
        
      }))}/>
      </div>
      <Pagination currentPage={page} totalPage={totalPage} onPageChange={setPage}/>
    </div>
    </>
  )
};
