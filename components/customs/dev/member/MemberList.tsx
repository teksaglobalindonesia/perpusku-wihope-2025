'use client';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/dev/fetcher';
import { useDebounce } from '@/hooks/use-debounce';
import { ExternalPaginationControll } from '../common/ExternalPaginationControll';

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
  const debaunceSearchValue = useDebounce(searchValue, 500);

  console.log({ pageSize });

  useEffect(() => {
    setLoading(true);
    // if (searchValue.trim() !== '') {
    //   (async () => {
    //     const response = await fetcher({
    //       path: '/member/list',
    //       query: `search=${debaunceSearchValue}`,
    //       pagination: { pageSize: 10 }
    //     });
    //     setMemberDatas(response.data?.data || []);
    //     setTotalPages(response.data?.meta?.pagination?.page_count ?? 1);
    //     setLoading(false);
    //   })();
    //   return;
    // }

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

          <button className="rounded-sm bg-brand-primary px-4 py-1 text-white">
            Tambah
          </button>
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
                <button className="rounded-sm bg-brand-primary px-4 py-1 text-[13px] text-neutral-white sm:text-sm">
                  PINJAMAN
                </button>
                <button className="rounded-sm bg-brand-primary px-4 py-1 text-[13px] text-neutral-white sm:text-sm">
                  EDIT
                </button>
                <button className="rounded-sm bg-brand-primary px-4 py-1 text-[13px] text-neutral-white sm:text-sm">
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
      </div>
    </div>
  );
};
