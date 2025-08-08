'use client';
import { isToday } from '@/lib/isToday';
import { fetcher } from '@/lib/fetcher';
import { useState, useEffect } from 'react';
import { ExternalPaginationControll } from '@/components/customs/common/ExternalPaginationControll';
import { dateFormat } from '@/lib/dateFormat';
import { format } from 'date-fns';
import { useDebaunce } from '@/hooks/custom/useDebaunce';
import { isLate } from '@/lib/isLate';
type ReturnListPropsType = {
  today?: boolean;
  layout: {
    title: string;
    searchBar?: boolean;
  };
  data: any;
  pageSize?: number;
};

export const ReturnList = ({
  layout,
  data,
  today,
  pageSize
}: ReturnListPropsType) => {
  const [loanDatas, setLoanDatas] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const debaunceSearchValue = useDebaunce(searchValue, 500);

  useEffect(() => {
    if (currentPage == 1 && debaunceSearchValue?.trim() === '') {
      const filteredToday = today
        ? data?.data?.filter((item: any) => isToday(item?.return_date))
        : data?.data;
      setLoanDatas(filteredToday);
      setTotalPage(data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
      return;
    }

    (async () => {
      const queryUrl =
        debaunceSearchValue?.trim() !== ''
          ? `&search=${debaunceSearchValue}`
          : null;

      const response = await fetcher({
        path: '/return/list',
        query: `${queryUrl}`,
        pagination: { page: currentPage, pageSize }
      });

      setLoanDatas(response.data?.data || []);
      setTotalPage(response.data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
    })();
    return;
  }, [currentPage, debaunceSearchValue]);

  const handleSearch = (e: any) => {
    //
  };

  return (
    <div className="my-[50px] px-[50px]">
      <div className="mb-[15px] flex flex-col justify-between gap-[15px] sm:flex-row">
        <h1 className="text-2xl font-semibold">{layout.title ?? 'Buku'}</h1>
        {layout.searchBar !== false && (
          <input
            type="text"
            placeholder="Search"
            className="rounded-sm border-2 border-neutral-dgray px-3 py-1 outline-none ring-0"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-[20px]">
        {loanDatas?.length > 0 ? (
          loanDatas?.map((data: any, i: number) => (
            <div
              className="flex w-full items-center justify-between rounded-[10px] bg-neutral-silver px-4 py-2"
              key={i}
            >
              <div className="rounded-[10px]" key={i}>
                <h1 className="py-2 text-[18px] font-semibold sm:text-xl">
                  {data?.book?.title}
                </h1>
                <p className="py-1 text-[14px] font-semibold sm:text-lg">
                  {data?.member?.name}
                </p>
                <p className="text-[14px] sm:text-lg">
                  Peminjaman:{' '}
                  <span className="font-bold">
                    {' '}
                    {dateFormat(data?.loan_date)}
                  </span>
                </p>
                <p className="text-[14px] sm:text-lg">
                  Pengembalian:{' '}
                  <span className="font-bold">
                    {dateFormat(data?.return_date)}
                  </span>
                </p>
                <p className="text-[14px] sm:text-lg">
                  Dikembalikan:{' '}
                  <span className="font-bold">
                    {dateFormat(data?.return?.actual_return_date)}
                  </span>
                </p>
                {!today && (
                  <button className="my-2 rounded-sm bg-action-green px-3 py-1 text-neutral-white">
                    KEMBALIKAN
                  </button>
                )}
              </div>
              {isLate(data?.return_date, data?.return) && (
                <h1 className="rounded-sm bg-action-error px-3 py-1 text-neutral-white">
                  Terlambat
                </h1>
              )}
            </div>
          ))
        ) : (
          <p className="text-action-error">*Tidak ada peminjaman hari ini</p>
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
