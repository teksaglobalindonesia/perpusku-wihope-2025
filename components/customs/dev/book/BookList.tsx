'use client';
import React from 'react';
import { fetcher } from '@/lib/dev/fetcher';
import { useState, useEffect } from 'react';
import { ExternalPaginationControll } from '../common/ExternalPaginationControll';
import { BASE_URL } from '@/lib/constant';
import { useDebounce } from '@/hooks/use-debounce';

type BookListPropTypes = {
  type: 'out of stock' | 'all';
  layout: {
    title: string;
    searchBar?: boolean;
    stock?: boolean;
  };
  data: any;
};

export const BookList = ({ type, data, layout }: BookListPropTypes) => {
  const [bookDatas, setBookDatas] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const debaunceSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setLoading(true);
    // if (searchValue.trim() !== '') {
    //   (async () => {
    //     const bookSearch = await fetcher({
    //       path: '/book/list',
    //       query: `search=${debaunceSearchValue}`
    //     });
    //     setBookDatas(bookSearch?.data?.data || []);
    //     setTotalPage(data?.meta?.pagination?.page_count ?? 1);
    //     setLoading(false);
    //   })();

    //   return;
    // }

    if (currentPage == 1 && debaunceSearchValue.trim() == '') {
      setBookDatas(data?.data || []);
      setTotalPage(data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
      return;
    }
    let queryUrl = '';

    const isSearch = debaunceSearchValue?.trim() !== '';

    if (type === 'all' && isSearch) {
      queryUrl = `filters[stock][$eq]=0&search=${debaunceSearchValue}`;
    } else if (type === 'out of stock') {
      queryUrl = 'filters[stock][$eq]=0';
      if (isSearch) queryUrl += `&search=${debaunceSearchValue}`;
    } else if (isSearch) {
      queryUrl = `search=${debaunceSearchValue}`;
    }

    (async () => {
      const response = await fetcher({
        path: '/book/list',
        query: queryUrl,
        pagination: { page: currentPage }
      });

      setBookDatas(response.data?.data || []);
      setTotalPage(response.data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
    })();
    return;
  }, [currentPage, debaunceSearchValue]);

  return (
    <div className="px-[50px]">
      {/* headerList */}
      <div className="mb-2 flex flex-col justify-between gap-[15px] px-5 py-5 sm:flex-row">
        <h1 className="text-2xl font-semibold">{layout.title ?? 'Buku'}</h1>
        <div className="flex gap-[10px]">
          <input
            type="text"
            placeholder="Search"
            className="rounded-sm border-2 border-neutral-dgray px-3 py-1 outline-none ring-0"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {type == 'all' && (
            <button className="rounded-sm bg-brand-primary px-4 py-1 text-white">
              Tambah
            </button>
          )}
        </div>
      </div>
      {/* list */}
      <div className="grid grid-cols-1 gap-[20px]">
        {bookDatas.length === 0 ? (
          <h1 className="text-center text-action-error">
            *Buku tidak ditemukan
          </h1>
        ) : (
          bookDatas?.map((data: any, i: number) => (
            <div
              className="flex flex-col justify-center rounded-[10px] bg-neutral-silver px-4 py-2 sm:flex-row sm:justify-between"
              key={i}
            >
              <div className="w-full gap-[15px] sm:flex sm:w-auto">
                <div className="flex w-full justify-center sm:w-auto">
                  <img
                    src={`${BASE_URL}${data?.cover?.url}`}
                    alt=""
                    className="h-[300px] rounded-[10px] sm:h-[200px]"
                  />
                </div>
                <div className="mt-5 flex flex-col justify-center gap-[5px]">
                  <p className="text-bold text-2xl font-semibold">
                    {data?.title}
                  </p>
                  <div className="mt-2 flex gap-2">
                    {data?.categories?.map((data: any, i: number) => (
                      <p
                        key={i}
                        className="rounded-md border-2 border-neutral-gray px-2 py-[2px] text-sm text-neutral-gray"
                      >
                        {data.name}
                      </p>
                    ))}
                  </div>
                  <p className="my-2 font-semibold">{data?.writer}</p>
                  {type === 'all' && (
                    <div className="my-2 flex gap-[10px]">
                      <button className="rounded-sm bg-action-green px-5 py-1 text-neutral-white">
                        Edit
                      </button>
                      <button className="rounded-sm bg-action-error px-5 py-1 text-neutral-white">
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <p
                  className={`${
                    data.stock == 0 ? 'text-action-error' : 'text-neutral-dgray'
                  }`}
                >
                  {data.stock == 0 ? 'Habis' : ` Stock :${data.stock}`}
                </p>
              </div>
            </div>
          ))
        )}

        <ExternalPaginationControll
          onChangePage={setCurrentPage}
          page={currentPage}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};
