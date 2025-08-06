'use client';
import { dateFormat } from '@/lib/dateFormat';
import { useState } from 'react';
type ReturningListSectionProps = {
  data: any;
};

export const ReturningListSection = ({ data }: ReturningListSectionProps) => {
  const maxData = 5;
  const totalPages = Math.ceil(data?.length / maxData);

  const [page, setPage] = useState<number>(1);

  const paginatedData = data?.slice((page - 1) * maxData, page * maxData);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const isLate = (returnDate: string, returnData: any) => {
    if (
      new Date(returnDate) > new Date() &&
      typeof returnData === 'undefined'
    ) {
      return true;
    }

    if (new Date(returnData?.actual_return_date) > new Date(returnDate)) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className="mt-[20px]  py-[20px]">
        <div className="mb-[20px] flex justify-between">
          <h1 className="text-[25px] font-bold">Pengembalian</h1>
          <div className="flex gap-[20px]">
            <input
              type="text"
              className="rounded-[5px] border-2 border-neutral-silver px-4 py-1 outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
        {/*  */}

        <div className="grid gap-[15px]">
          {paginatedData.map((data: any, i: number) => (
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
                  <p>Peminjaman: {dateFormat(data?.loan_date)}</p>
                  <p>Pengembalian: {dateFormat(data?.return_date)}</p>
                  <p>
                    Dikembalikan: {dateFormat(data?.return?.actual_return_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {/* {isLate(data?.return_date, data?.return) && (
                  <p className="rounded-[5px] bg-action-error px-4 py-2 text-white">
                    Terlambat
                  </p>
                  )} */}
                <p
                  className={`rounded-[5px] px-4 py-2 text-white ${
                    isLate(data?.return_date, data?.return)
                      ? 'bg-action-error'
                      : 'bg-action-green'
                  }`}
                >
                  {isLate(data?.return_date, data?.return)
                    ? 'Terlambar'
                    : 'Dipinjam'}
                </p>
              </div>
            </div>
          ))}
        </div>
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
    </>
  );
};
