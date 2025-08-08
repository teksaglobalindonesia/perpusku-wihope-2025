'use client';
import { MemberListDialog } from '@/components/customs/member/MemberListDialog';
import { fetcher } from '@/lib/fetcher';
import { useState, useEffect } from 'react';
import { BackButton } from '@/components/customs/common/BackButton';
import { BookListDialog } from '@/components/customs/book/BookListDialog';

const d: Array<{ id: number; value: number; label: string }> = [
  {
    id: 1,
    value: 1,
    label: '1 Hari'
  },
  {
    id: 2,
    value: 3,
    label: '3 Hari'
  },
  {
    id: 3,
    value: 7,
    label: '1 Minggu'
  },
  {
    id: 4,
    value: 14,
    label: '2 Minggu'
  },
  {
    id: 5,
    value: 30,
    label: '1 Bulan'
  }
];

export default function NewBorrowPage() {
  const [bookDatas, setBookDatas] = useState();
  const [memberData, setMemberDatas] = useState();
  const [selectedData, setSelectedData] = useState<{
    book: {
      isShow: boolean;
      indentifier: string;
    };
    member: {
      isShow: boolean;
      indentifier: string;
    };
  }>({
    book: {
      isShow: false,
      indentifier: ''
    },
    member: {
      isShow: false,
      indentifier: ''
    }
  });
  const pageSize = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDatas = await fetcher({
          path: '/member/list',
          pagination: { pageSize }
        });
        const bookDatas = await fetcher({
          path: '/book/list',
          pagination: { pageSize }
        });

        setMemberDatas(userDatas.data);
        setBookDatas(bookDatas.data);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <BackButton />
      <div className="mx-auto flex flex-col items-center justify-center rounded-md p-6">
        <h2 className="mb-4 text-xl font-semibold">Tambah Peminjaman</h2>

        <div className="w-[75%] rounded-[20px] bg-neutral-silver p-[30px]">
          <div className="mb-4">
            <label className="mb-1 block font-medium">Buku</label>
            <button
              className="rounded-[5px] border-2 bg-neutral-silver px-7 py-[5px] text-neutral-dgray"
              onClick={() =>
                setSelectedData((prev) => ({
                  ...prev,
                  book: { ...prev.book, isShow: true }
                }))
              }
            >
              Pilih
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium">Anggota:</label>
            <button
              className="rounded-[5px] border-2 bg-neutral-silver px-7 py-[5px] text-neutral-dgray"
              onClick={() =>
                setSelectedData((prev) => ({
                  ...prev,
                  member: { ...prev.member, isShow: true }
                }))
              }
            >
              Pilih
            </button>
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Tanggal Peminjaman</label>
            <input
              type="date"
              className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Durasi Peminjaman</label>
            <select className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {(d ?? []).map((item) => (
                <option key={item.id} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
            // onClick={handleCreateNewBorrowed}
          >
            SIMPAN
          </button>
        </div>
      </div>
      {selectedData.member.isShow && (
        <MemberListDialog
          setSelectedData={setSelectedData}
          pageSize={pageSize}
          data={memberData}
        />
      )}
      {selectedData.book.isShow && (
        <BookListDialog
          setSelectedData={setSelectedData}
          pageSize={pageSize}
          data={bookDatas}
        />
      )}
    </>
  );
}
