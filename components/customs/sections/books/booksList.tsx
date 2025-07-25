'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export type BooksOutOfStockProps = {
  data: any;
  title: string;
};

export const BooksList = ({ data, title }: BooksOutOfStockProps) => {
  const maxData = 5;
  const totalPages = Math.ceil(data?.data?.data?.length / maxData);

  const [page, setPage] = useState<number>(1);
  const [showDialog, setShowDialog] = useState<{
    isShow: boolean;
    bookId: string;
  }>({ bookId: '', isShow: false });

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

  const handleDelete = () => {
    setShowDialog({
      ...showDialog,
      bookId: '',
      isShow: false
    });
    alert(`buku dengan Id: ${showDialog.bookId} dihapus`);
  };

  useEffect(() => {
    if (showDialog.bookId) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'auto';
    }
  }, [showDialog]);

  return (
    <>
      <div className="mt-[20px] py-[20px]">
        <div className="mb-[20px] flex justify-between">
          <h1 className="text-[25px] font-bold">{title}</h1>
          <div className="flex gap-[20px]">
            <input
              type="text"
              className="rounded-[5px] border-2 border-neutral-silver px-4 py-1 outline-none"
              placeholder="Search..."
            />
            <Link
              href={`/books/new`}
              className="rounded-sm bg-brand-primary px-4 py-1 text-white"
            >
              TAMBAH
            </Link>
          </div>
        </div>
        {/*  */}

        <div className="grid gap-[15px]">
          {paginatedData.map((data: any, i: number) => (
            <div
              className="flex justify-between rounded-[10px] bg-neutral-silver px-4 py-2"
              key={i}
            >
              <div>
                <div className="flex gap-[15px]">
                  <div>
                    <img
                      src={data?.image}
                      alt=""
                      className="aspect-square w-[150px] rounded-[10px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-[5px]">
                    <p className="text-bold text-2xl font-semibold">
                      {data.judul}
                    </p>
                    <p>{data.genre}</p>
                    <p>{data.penulis}</p>
                  </div>
                </div>
                <div className="mt-[10px] flex gap-[10px]">
                  <Link
                    href={`/books/${data.id}/edit`}
                    className="rounded-sm bg-brand-blue px-4 py-1 text-white"
                  >
                    EDIT
                  </Link>
                  <button
                    className="rounded-sm bg-action-error px-4 py-1 text-white"
                    onClick={() =>
                      setShowDialog({
                        ...showDialog,
                        bookId: data.id,
                        isShow: true
                      })
                    }
                  >
                    HAPUS
                  </button>
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

      {/*  */}
      {showDialog.isShow && showDialog.bookId && (
        <div className="absolute left-1/2 top-1/2 flex h-[250px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-[20px] rounded-xl bg-white shadow-2xl">
          <h1>Apakah yakin menghapus buku ini?</h1>

          <div className="flex gap-[20px]">
            <button
              className="bg-action-error px-3 py-1 text-white"
              onClick={handleDelete}
            >
              Hapus
            </button>
            <button
              className="bg-brand-primary px-3 py-1 text-white"
              onClick={() =>
                setShowDialog({
                  ...showDialog,
                  bookId: '',
                  isShow: false
                })
              }
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  );
};
