'use client';
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
  const totalPages = Math.ceil(data?.data?.data?.length / maxData);

  const [page, setPage] = useState<number>(1);

  const paginatedData = data?.data?.data?.slice(
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
        {/*  */}

        <div className="grid gap-[15px]">
          {paginatedData?.map((data: any, i: number) => (
            <div
              className="flex justify-between rounded-[10px] bg-neutral-silver px-4 py-2 "
              key={i}
            >
              <div className="">
                <div className="flex flex-col justify-center gap-[5px]">
                  <p className="text-2xl font-semibold">{data?.book?.judul}</p>
                  <p>Peminjam: {data?.user?.nama}</p>
                  <p>Peminjaman: {data.tanggalPinjam}</p>
                  <p>Pengembalian: {data?.tanggalPengembalian}</p>
                </div>
              </div>
              <div className="flex items-center">
                {data.stock == 0 ? (
                  <button className="rounded-[5px] bg-action-error px-4 py-1 text-white">
                    habis
                  </button>
                ) : (
                  <p>stock: {data?.book?.stock}</p>
                )}
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
