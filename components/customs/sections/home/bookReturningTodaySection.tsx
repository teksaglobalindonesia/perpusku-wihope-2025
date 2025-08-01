'use client';
import { DateValidation } from '@/lib/dateValidation';
import { useState, useEffect } from 'react';

export type BooksBowrrowedProps = {
  data: any;
  title: string;
};

export const BookReturningTodaySection = ({
  data,
  title
}: BooksBowrrowedProps) => {
  const maxData = 5;
  const totalPages = Math.ceil(data?.data || 1 / maxData);

  const [page, setPage] = useState<number>(1);
  const paginatedData =
    data !== null
      ? data
          ?.filter((data: any) => DateValidation(data?.return_date))
          ?.slice((page - 1) * maxData, page * maxData)
      : [];

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
          {paginatedData?.length !== 0 && (
            <div className="flex gap-[20px]">
              <input
                type="text"
                className="rounded-[5px] border-2 border-neutral-silver px-4 py-1 outline-none"
                placeholder="Search..."
              />
            </div>
          )}
        </div>

        <div className="grid gap-[15px]">
          {paginatedData?.length === 0 ? (
            <div>
              <p className="text-red-500">Tidak ada pengembalian hari ini</p>
            </div>
          ) : (
            paginatedData?.map((data: any, i: number) => (
              <div
                className="flex justify-between rounded-[10px] bg-neutral-silver px-4 py-2 "
                key={i}
              >
                <div className="">
                  <div className="flex flex-col justify-center gap-[5px]">
                    <p className="text-bold text-2xl font-semibold">
                      {data?.book?.title}
                    </p>
                    <p>Peminjam: {data?.member?.name}</p>
                    <p>Peminjaman: {data.loan_date}</p>
                    <p>Pengembalian: {data?.return_date}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {paginatedData?.length != 0 && (
          <div>
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
          </div>
        )}
      </div>
    </>
  );
};
