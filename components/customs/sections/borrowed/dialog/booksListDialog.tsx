'use client';
import { useState, useEffect } from 'react';

type MemberListDialogProps = {
  show: {
    bookId: string;
    isShow: boolean;
    bookDatas: any;
  };
  setShow: Function;
};

export const BooksListDialog = ({ show, setShow }: MemberListDialogProps) => {
  const maxData = 3;
  const totalPages = Math.ceil(show?.bookDatas?.length / maxData);

  const [page, setPage] = useState<number>(1);

  const paginatedData = show?.bookDatas?.slice(
    (page - 1) * maxData,
    page * maxData
  );

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const hanldeSelectUser = (id: string) => {
    setShow({ ...show, bookId: id, isShow: false });
  };

  useEffect(() => {
    if (show.isShow) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'auto';
    }
  }, [show]);
  return (
    <div className="absolute left-1/2 top-1/2  w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white px-[20px] shadow-2xl">
      <div className="flex justify-between py-5">
        <h1>Pilih Anggota</h1>
        <button
          className="text-xl font-bold"
          onClick={() => setShow({ ...show, isShow: false })}
        >
          X
        </button>
      </div>
      <div className="grid grid-cols-1 gap-[10px]">
        {paginatedData?.map((data: any, i: number) => (
          <div
            className="flex w-full justify-between rounded-lg bg-neutral-silver px-[10px] py-2"
            key={i}
          >
            <div className="flex gap-[10px]">
              <div className="flex items-center">
                <img
                  src={data?.image}
                  alt="...."
                  className="aspect-square w-[100px] bg-red-500"
                />
              </div>
              <div>
                <h1 className="py-1 text-lg font-bold">{data?.judul}</h1>
                <p>{data?.genre}</p>
                <p>{data?.penulis}</p>
                <button
                  className="mt-1 rounded-sm bg-brand-primary px-4 py-1 text-white"
                  onClick={() => hanldeSelectUser(data?.judul)}
                >
                  Pilih
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4 pb-3 text-white">
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
  );
};
