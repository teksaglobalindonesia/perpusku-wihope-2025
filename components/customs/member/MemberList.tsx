'use client';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetcher';
import { useDebounce } from '@/hooks/use-debounce';
import { ExternalPaginationControll } from '@/components/customs/common/ExternalPaginationControll';
import { SetDeleteDialog } from '@/types/DeleteDialog';
import { DeleteDialog } from '@/components/customs/common/DeleteDialog';
import Link from 'next/link';

type MemberListPropsType = {
  data: any;
  pageSize?: number;
};

export const MemberList = ({ data, pageSize }: MemberListPropsType) => {
  const [memberDatas, setMemberDatas] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [deleteDialogData, setDeleteDialogData] = useState<SetDeleteDialog>({
    identifier: '',
    isDelete: false,
    isShow: false
  });
  const debaunceSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    setLoading(true);

    if (currentPage == 1 && debaunceSearchValue.trim() == '') {
      setMemberDatas(data?.data || []);
      setTotalPages(data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
      return;
    }

    (async () => {
      const query =
        searchValue.trim() !== '' ? `search=${debaunceSearchValue}` : null;
      const response = await fetcher({
        path: '/member/list',
        query: query,
        pagination: { page: currentPage, pageSize }
      });

      setMemberDatas(response.data?.data || []);
      setTotalPages(response.data?.meta?.pagination?.page_count ?? 1);
      setLoading(false);
    })();
    return;
  }, [currentPage, debaunceSearchValue]);

  return (
    <div className="px-[50px]">
      <div className="mb-2 flex flex-col justify-between gap-[15px] px-5 py-5 sm:flex-row">
        <h1 className="text-2xl font-semibold">Members</h1>
        <div className="flex flex-col gap-[10px] sm:flex-row">
          <input
            type="text"
            placeholder="Search"
            className="rounded-sm border-2 border-neutral-dgray px-3 py-1 outline-none ring-0"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Link
            href={'/member/new'}
            className="rounded-sm bg-brand-primary px-4 py-1 text-white"
          >
            Tambah
          </Link>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-[20px]">
        {MemberList.length == 0 ? (
          <h1></h1>
        ) : (
          memberDatas.map((data: any, i: number) => (
            <div
              key={i}
              className="w-full items-center justify-between rounded-[10px] bg-neutral-silver px-4 py-2"
            >
              <h1 className="py-2 text-xl font-semibold">{data?.name}</h1>
              <p>{data?.address}</p>
              <p>{data?.email}</p>
              <div className="mt-3 flex gap-[10px] sm:gap-[20px]">
                <Link
                  href={`/member/${data?.documentId}/loan`}
                  className="rounded-sm bg-brand-primary px-4 py-1 text-[13px] text-neutral-white sm:text-sm"
                >
                  PINJAMAN
                </Link>
                <Link
                  href={`/member/${data?.documentId}/edit`}
                  className="rounded-sm bg-brand-blue px-4 py-1 text-[13px] text-neutral-white sm:text-sm"
                >
                  EDIT
                </Link>
                <button
                  className="rounded-sm bg-action-error px-4 py-1 text-[13px] text-neutral-white sm:text-sm"
                  onClick={() =>
                    setDeleteDialogData((prev) => ({
                      ...prev,
                      isShow: true,
                      identifier: data?.name
                    }))
                  }
                >
                  HAPUS
                </button>
              </div>
            </div>
          ))
        )}
        {memberDatas?.length > 0 && (
          <ExternalPaginationControll
            onChangePage={setCurrentPage}
            page={currentPage}
            totalPages={totalPages}
          />
        )}
        <DeleteDialog
          deleteDialogData={deleteDialogData}
          setDeleteDialog={setDeleteDialogData}
          title="Hapus Buku"
          message={`Apakah anda yakin ingin menghapus Anggota: ${deleteDialogData.identifier}`}
        />
      </div>
    </div>
  );
};
