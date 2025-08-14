'use client';
import { MemberListDialog } from '@/components/customs/member/MemberListDialog';
import { fetcher } from '@/lib/fetcher';
import { useState, useEffect } from 'react';
import { BackButton } from '@/components/customs/common/BackButton';
import { BookListDialog } from '@/components/customs/book/BookListDialog';
import { trim } from '@/lib/trim';

// const d: Array<{ id: number; value: number; label: string }> = [
//   {
//     id: 1,
//     value: 1,
//     label: '1 Hari'
//   },
//   {
//     id: 2,
//     value: 3,
//     label: '3 Hari'
//   },
//   {
//     id: 3,
//     value: 7,
//     label: '1 Minggu'
//   },
//   {
//     id: 4,
//     value: 14,
//     label: '2 Minggu'
//   },
//   {
//     id: 5,
//     value: 30,
//     label: '1 Bulan'
//   }
// ];

export default function NewBorrowPage() {
  const [bookDatas, setBookDatas] = useState();
  const [memberData, setMemberDatas] = useState();
  const [selectedData, setSelectedData] = useState<{
    book: {
      isShow: boolean;
      indentifier: any;
    };
    member: {
      isShow: boolean;
      indentifier: any;
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
  const [dateData, setDateData] = useState<{
    loanDate: string;
    returnDate: string;
  }>({ loanDate: '', returnDate: '' });
  const [error, setError] = useState<string>('');
  const pageSize = 3;

  const handleNewLoan = async () => {
    if (
      !trim([
        selectedData.book.indentifier?.documentId,
        selectedData.member.indentifier?.documentId,
        dateData.loanDate,
        dateData.returnDate
      ])
    ) {
      return setError('Tolong lengkapi form');
    }

    const data = {
      member: selectedData.member.indentifier?.documentId,
      book: selectedData.book.indentifier?.documentId,
      loan_date: dateData.loanDate,
      return_date: dateData.returnDate
    };

    const response = await fetcher({
      path: '/loan/add',
      pagination: { isActive: false },
      method: 'POST',
      body: { data: data }
    });

    if (response.status != 200 || response.status != 201) {
      return setError('Gagal menambahkan data peminjaman');
    }

    window.location.reload();
  };

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
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="w-[75%] rounded-[20px] bg-neutral-silver p-[30px]">
          <div className="mb-4">
            <label className="mb-1 block font-medium">
              Buku: {selectedData?.book?.indentifier?.title}
            </label>
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
            <label className="mb-1 block font-medium">
              Anggota: {selectedData?.member?.indentifier?.email}
            </label>
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
              value={dateData.loanDate}
              onChange={(e) =>
                setDateData((prev) => ({ ...prev, loanDate: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Durasi Peminjaman</label>
            {/* <select className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400">
              {(d ?? []).map((item) => (
                <option key={item.id} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select> */}
            <input
              type="date"
              className="w-full rounded border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={dateData.returnDate}
              onChange={(e) =>
                setDateData((prev) => ({ ...prev, returnDate: e.target.value }))
              }
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
            onClick={handleNewLoan}
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
