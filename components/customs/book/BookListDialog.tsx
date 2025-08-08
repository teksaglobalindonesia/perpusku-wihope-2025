'use client';
import React, { useEffect, useState } from 'react';
import { ExternalPaginationControll } from '@/components/customs/common/ExternalPaginationControll';
import { fetcher } from '@/lib/fetcher';
import { BASE_URL } from '@/lib/constant';
import Image from 'next/image';

export type SelectedDataType = {
  book: {
    isShow: boolean;
    indentifier: string;
  };
  member: {
    isShow: boolean;
    indentifier: string;
  };
};

type BookListDialog = {
  pageSize: number;
  data: any;
  setSelectedData?: React.Dispatch<React.SetStateAction<SelectedDataType>>;
};

export const BookListDialog = ({
  pageSize,
  data,
  setSelectedData
}: BookListDialog) => {
  const [memberList, setMemberList] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (currentPage === 1) {
      setMemberList(data?.data);
      setTotalPage(data?.meta?.pagination?.page_count ?? 1);
      return;
    }

    (async () => {
      const response = await fetcher({
        path: '/book/list',
        pagination: { page: currentPage, pageSize: pageSize }
      });

      setMemberList(response.data?.data || []);
      setTotalPage(response.data?.meta?.pagination?.page_count ?? 1);
    })();
  }, [currentPage]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Pilih Buku</h2>
          <Image
            src={`/public/icons/close.svg`}
            width={25}
            height={25}
            alt=""
            className="w-[25px] cursor-pointer"
            onClick={() =>
              setSelectedData?.((prev: SelectedDataType) => ({
                ...prev,
                book: { ...prev.book, isShow: false }
              }))
            }
          />
        </div>

        {/* Content */}
        <div className="max-h-[400px] space-y-4 overflow-y-auto px-6 py-4">
          {memberList?.map((data: any, i: number) => (
            <div
              key={i}
              className="flex justify-between rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm"
            >
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <img
                    src={`${BASE_URL}${data?.cover?.url}`}
                    alt=""
                    className="w-[120px]"
                  />
                  <div className="grid grid-cols-1 gap-2">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {data?.title}
                    </h3>
                    <div className="flex gap-2 ">
                      {data?.categories?.map((data: any, i: number) => (
                        <p
                          className="rounded-sm bg-neutral-dgray px-3 py-1 text-sm text-white"
                          key={i}
                        >
                          {data.name}
                        </p>
                      ))}
                    </div>
                    <p className="text-lg font-semibold text-gray-600">
                      {data?.writer}
                    </p>
                    <button
                      className="w-max rounded-md bg-brand-primary px-4 py-1 text-sm text-white transition hover:bg-green-700"
                      onClick={() =>
                        setSelectedData?.((prev: SelectedDataType) => ({
                          ...prev,
                          book: { isShow: false, indentifier: data?.documentId }
                        }))
                      }
                    >
                      Pilih
                    </button>
                  </div>
                </div>
              </div>
              <h1>stock: {data?.stock}</h1>
            </div>
          ))}
        </div>

        <ExternalPaginationControll
          onChangePage={setCurrentPage}
          page={currentPage}
          totalPages={totalPage}
        />
      </div>
    </div>
  );
};
