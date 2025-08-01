'use client';
import { BASE_URL } from '@/lib/constant';
import Link from 'next/link';
import { useState } from 'react';

export type BooksOutOfStockProps = {
  data: any;
  title: string;
};

export const BooksOutOfStock = ({ data, title }: BooksOutOfStockProps) => {
  const maxData = 5;

  const filteredData = data?.filter((data: any) => data.stock == 0);
  const totalPages = Math.ceil(filteredData?.length / maxData);

  const [page, setPage] = useState<number>(1);

  const paginatedData = filteredData?.slice(
    (page - 1) * maxData,
    page * maxData
  );

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="mt-[20px]  py-[20px]">
        <div className="mb-[20px] flex justify-between">
          <h1 className="text-[25px] font-bold">{title}</h1>
          <div className="flex gap-[20px]">
            <input
              type="text"
              className="rounded-[5px] border-2 border-neutral-silver px-4 py-1 outline-none"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="grid gap-[15px]">
          {paginatedData?.length == 0 ? (
            <div>
              <h1 className="text-action-error">
                Tidak ada buku yang stocknya habis
              </h1>
            </div>
          ) : (
            paginatedData?.map((data: any, i: number) => (
              <div
                className="flex justify-between rounded-[10px] bg-neutral-silver px-4 py-2 "
                key={i}
              >
                <div className="flex gap-[15px]">
                  <div>
                    <img
                      src={`${BASE_URL}${data?.cover?.url}`}
                      alt=""
                      className="h-[200px] rounded-[10px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-[5px]">
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
                    <p>{data?.writer}</p>
                    <p>{data?.published_year}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {data.stock == 0 ? (
                    <button className="rounded-[5px] bg-action-error px-4 py-1 text-white">
                      habis
                    </button>
                  ) : (
                    <p>stock: {data.stock}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {paginatedData?.length >= 0 && (
          <div className="mt-4 flex justify-center gap-4 text-white">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="rounded bg-gray-600 px-3 py-1 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-black">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="rounded bg-gray-600 px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};
