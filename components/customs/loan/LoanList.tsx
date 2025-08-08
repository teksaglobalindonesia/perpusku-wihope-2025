'use client';
import { isToday } from '@/lib/isToday';
import { isLate } from '@/lib/isLate';
import { fetcher } from '@/lib/fetcher';
import { useState, useEffect } from 'react';
import { ExternalPaginationControll } from '@/components/customs/common/ExternalPaginationControll';
import { dateFormat } from '@/lib/dateFormat';
import { useDebaunce } from '@/hooks/custom/useDebaunce';
import { format } from 'date-fns';
import { StatusBadge } from '@/components/customs/loan/StatusBadge';
import { getLoanStatus } from '@/lib/getLoanStatus';
import Link from 'next/link';
type LoanListPropsType = {
  today?: boolean;
  layout: {
    title: string;
    searchBar?: boolean;
  };
  data: any;
  pageSize?: number;
};

export const LoanList = ({
  layout,
  data,
  today,
  pageSize
}: LoanListPropsType) => {
  const [loanDatas, setLoanDatas] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const debaunceSearchValue = useDebaunce(searchValue, 500);

  useEffect(() => {
    setLoading(true);

    if (currentPage === 1 && debaunceSearchValue.trim() === '') {
      const filteredToday = today
        ? data?.data?.filter((item: any) => isToday(item?.loan_date))
        : data?.data;

      setLoanDatas(filteredToday);
      setTotalPage(data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
      return;
    }

    (async () => {
      const queryParams = [];

      if (today) queryParams.push('status=loaned');
      if (debaunceSearchValue.trim() !== '') {
        queryParams.push(`search=${debaunceSearchValue}`);
      }

      const query = queryParams.join('&');

      const response = await fetcher({
        path: '/loan/list',
        query,
        pagination: { page: currentPage, pageSize }
      });

      setLoanDatas(response.data?.data || []);
      setTotalPage(response.data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
    })();
  }, [currentPage, debaunceSearchValue]);

  const handleSearch = (e: any) => {
    //
  };

  return (
    <div className="my-[50px] px-[50px]">
      <div className="mb-[15px] flex flex-col justify-between gap-[15px] sm:flex-row">
        <h1 className="text-2xl font-semibold">{layout.title ?? 'Buku'}</h1>
        <div className="flex gap-[10px]">
          {layout.searchBar !== false && (
            <input
              type="text"
              placeholder="Search"
              className="rounded-sm border-2 border-neutral-dgray px-3 py-1 outline-none ring-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
          {!today && (
            <Link
              href={`/loan/new`}
              className="rounded-sm bg-brand-primary px-4 py-1 text-white"
            >
              Tambah
            </Link>
          )}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-[20px]">
        {loanDatas?.length > 0 ? (
          loanDatas?.map((data: any, i: number) => (
            <div
              className="flex w-full items-center justify-between rounded-[10px] bg-neutral-silver px-4 py-4"
              key={i}
            >
              <div className="rounded-[10px]" key={i}>
                <h1 className="pb-2 font-semibold text-[] sm:text-xl">
                  {data?.book?.title}
                </h1>
                <p className="py-1 text-lg font-semibold">
                  {data?.member?.name}
                </p>
                <p>
                  Peminjaman:{' '}
                  <span className="font-bold">
                    {' '}
                    {dateFormat(data?.loan_date)}
                  </span>
                </p>
                <p>
                  Pengembalian:{' '}
                  <span className="font-bold">
                    {dateFormat(data?.return_date)}
                  </span>
                </p>
                {data?.return && (
                  <p>
                    Dikembalikan:{' '}
                    <span>{dateFormat(data?.return?.actual_return_date)}</span>
                  </p>
                )}
                {!today && data?.return && (
                  <button className="my-2 rounded-sm bg-action-green px-3 py-1 text-neutral-white">
                    KEMBALIKAN
                  </button>
                )}
              </div>

              {/* juara code paling berantakan XD */}
              <div>
                <StatusBadge status={getLoanStatus(data)} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-action-error">*Tidak ada peminjaman</p>
        )}
      </div>
      {loanDatas?.length > 0 && (
        <ExternalPaginationControll
          onChangePage={setCurrentPage}
          page={currentPage}
          totalPages={totalPage}
        />
      )}
    </div>
  );
};
