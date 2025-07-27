'use client';
import { BooksListDialog } from '@/components/customs/sections/peminjaman/dialog/booksListDialog';
import { MemberListDialog } from '@/components/customs/sections/peminjaman/dialog/membersListDialog';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/fetcher';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const router = useRouter();
  const [showMember, setShowMember] = useState<{
    memberId: string;
    isShow: boolean;
    memberDatas: any;
  }>({
    memberId: '',
    isShow: false,
    memberDatas: []
  });
  const [showBook, setShowBook] = useState<{
    bookId: string;
    isShow: boolean;
    bookDatas: any;
  }>({
    bookId: '',
    isShow: false,
    bookDatas: []
  });

  const handleCreateNewBorrowed = () => {
    window.document.body.style.overflow = 'auto';
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponsen = await axios.get('/api/members');
        const bookResponsen = await axios.get('/api/books');

        setShowMember({
          ...showMember,
          memberDatas: userResponsen?.data?.data
        });
        setShowBook({
          ...showBook,
          bookDatas: bookResponsen?.data?.data
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <button
        className="ml-5 mt-5 text-xl font-bold"
        onClick={() => router.back()}
      >
        Back
      </button>
      <div className="mx-auto flex flex-col items-center justify-center rounded-md p-6">
        <h2 className="mb-4 text-xl font-semibold">Tambah Peminjaman</h2>

        <div className="w-[75%] rounded-[20px] bg-neutral-silver p-[30px]">
          <div className="mb-4">
            <label className="mb-1 block font-medium">
              Buku: {showBook?.bookId}
            </label>
            <button
              className="rounded-[5px] border-2 bg-neutral-silver px-7 py-[5px] text-neutral-dgray"
              onClick={() => setShowBook({ ...showBook, isShow: true })}
            >
              Pilih
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block font-medium">
              Anggota: {showMember?.memberId}
            </label>
            <button
              className="rounded-[5px] border-2 bg-neutral-silver px-7 py-[5px] text-neutral-dgray"
              onClick={() => setShowMember({ ...showMember, isShow: true })}
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
            onClick={handleCreateNewBorrowed}
          >
            SIMPAN
          </button>
        </div>
      </div>
      {showMember.isShow && (
        <MemberListDialog show={showMember} setShow={setShowMember} />
      )}
      {showBook.isShow && (
        <BooksListDialog show={showBook} setShow={setShowBook} />
      )}
    </>
  );
}
