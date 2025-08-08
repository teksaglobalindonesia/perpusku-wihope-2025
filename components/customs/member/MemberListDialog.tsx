'use client';
import React, { useEffect, useState } from 'react';
import { ExternalPaginationControll } from '@/components/customs/common/ExternalPaginationControll';
import { fetcher } from '@/lib/fetcher';
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

type MemberListDialog = {
  pageSize: number;
  data: any;
  setSelectedData?: React.Dispatch<React.SetStateAction<SelectedDataType>>;
};

export const MemberListDialog = ({
  pageSize,
  data,
  setSelectedData
}: MemberListDialog) => {
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
        path: '/member/list',
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
          <h2 className="text-lg font-semibold text-gray-800">Pilih Anggota</h2>
          <Image
            src={`icons/next.svg`}
            width={25}
            height={25}
            alt=""
            className="w-[25px] cursor-pointer"
            onClick={() =>
              setSelectedData?.((prev: SelectedDataType) => ({
                ...prev,
                member: { ...prev.member, isShow: false }
              }))
            }
          />
        </div>

        {/* Content */}
        <div className="max-h-[400px] space-y-4 overflow-y-auto px-6 py-4">
          {memberList?.map((data: any, i: number) => (
            <div
              key={i}
              className="rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm"
            >
              <div className="mb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {data?.name}
                </h3>
                <p className="text-sm text-gray-600">{data?.address}</p>
                <p className="text-sm text-gray-600">{data?.email}</p>
              </div>
              <button
                className="rounded-md bg-brand-primary px-4 py-1 text-sm text-white transition hover:bg-green-700"
                onClick={() =>
                  setSelectedData?.((prev: SelectedDataType) => ({
                    ...prev,
                    member: { isShow: false, indentifier: data?.email }
                  }))
                }
              >
                Pilih
              </button>
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
