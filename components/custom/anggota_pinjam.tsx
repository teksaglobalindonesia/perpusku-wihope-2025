'use client';

import Link from "next/link";

export type cart1props = {
  items?: Array<{
    nama?: string;
    title?: string;
    Peminjaman?: string;
    Pengembalian?: string;
    status?: number;
  }>;
  currentPage: number;
  totalPages: number;
  memberId: string;
};

export const Angopin = ({
  items = [],
  currentPage,
  totalPages,
  memberId,
}: cart1props) => {
  return (
    <div className="bg-[#edf0f1] mx-4 sm:mx-8 md:mx-12 lg:mx-24 my-8 drop-shadow-lg rounded-lg pb-6">
      <div className="px-5 py-5">
        <h1 className="text-xl sm:text-2xl text-black font-medium">Peminjaman Anggota</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg drop-shadow-md hover:drop-shadow-xl transition duration-300">
            <div className="p-5 flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 break-words">
                <h1 className="text-lg font-medium">{item.title}</h1>
                <p className="text-sm"><strong>Peminjaman:</strong> <span className="text-[#757575]">{item.Peminjaman}</span></p>
                <p className="text-sm"><strong>Pengembalian:</strong> <span className="text-[#757575]">{item.Pengembalian}</span></p>

               
                  <div className="mt-2">
                    <span className="bg-[#dfe29c] px-3 py-1 rounded-md inline-block text-sm text-black">
                      Kembalikan
                    </span>
                  </div>
           
              </div>

              <div className="mt-4">
                {item.status === 1 && (
                  <div className="bg-[#F57373] px-3 py-1 rounded-md inline-block">
                    <span className="text-sm text-white font-medium">Terlambat</span>
                  </div>
                )}
                {item.status === 2 && (
                  <div className="bg-[#5bbd87] px-3 py-1 rounded-md inline-block">
                    <span className="text-sm text-white font-medium">Dikembalikan</span>
                  </div>
                )}
                {item.status === 3 && (
                  <div className="bg-[#5db5bc] px-3 py-1 rounded-md inline-block">
                    <span className="text-sm text-white font-medium">Dipinjam</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 gap-2 text-black">
        {currentPage > 1 && (
          <Link href={`/anggota/${memberId}?page=${currentPage - 1}`}>
            <button className="px-3 py-1 rounded bg-gray-300">&lt;</button>
          </Link>
        )}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <Link key={page} href={`/anggota/${memberId}?page=${page}`}>
              <button
                className={`px-3 py-1 rounded ${currentPage === page
                  ? "bg-[#5bbd87] text-white"
                  : "bg-gray-200"
                  }`}
              >
                {page}
              </button>
            </Link>
          );
        })}
        {currentPage < totalPages && (
          <Link href={`/anggota/${memberId}?page=${currentPage + 1}`}>
            <button className="px-3 py-1 rounded bg-gray-300">&gt;</button>
          </Link>
        )}
      </div>
    </div>
  );
};
