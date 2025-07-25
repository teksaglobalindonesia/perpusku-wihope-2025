"use client";

import { CardSimple } from "@/components/custom/card/cardsimple";
import { useState } from "react";
import { Navbar } from "@/components/custom/navbar";

interface Peminjaman {
  title: string;
  borrower: string;
  borrowedAt: string;
  returnAt: string;
  status: "TERLAMBAT" | "DIPINJAM";
}

const dummyData: Peminjaman[] = [
  {
    title: "Judul Buku 1",
    borrower: "Abi",
    borrowedAt: "17 Juli 2025, 08.00",
    returnAt: "24 Juli 2025",
    status: "DIPINJAM",
  },
  {
    title: "Judul Buku 2",
    borrower: "Abu",
    borrowedAt: "10 Juli 2025, 08.00",
    returnAt: "17 Juli 2025",
    status: "TERLAMBAT",
  },
  {
    title: "Judul Buku 3",
    borrower: "Abe",
    borrowedAt: "17 Juli 2025, 08.00",
    returnAt: "24 Juli 2025",
    status: "DIPINJAM",
  },
  {
    title: "Judul Buku 4",
    borrower: "Abo",
    borrowedAt: "10 Juli 2025, 08.00",
    returnAt: "17 Juli 2025",
    status: "TERLAMBAT",
  },
  {
    title: "Judul Buku 5",
    borrower: "Widhi",
    borrowedAt: "17 Juli 2025, 08.00",
    returnAt: "24 Juli 2025",
    status: "DIPINJAM",
  },
  {
    title: "Judul Buku 6",
    borrower: "Widhi",
    borrowedAt: "10 Juli 2025, 08.00",
    returnAt: "17 Juli 2025",
    status: "TERLAMBAT",
  },
];

export default function PeminjamanPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white px-10 py-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-[24px] font-bold">Peminjaman</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-1 rounded text-sm"
            />
            <button className="bg-action-success text-white px-4 py-1 rounded text-sm">
              TAMBAH
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {dummyData
            .filter((item) =>
              item.borrower.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <div
                key={index}
                className="border rounded-md px-6 py-4 shadow bg-white flex justify-between items-center"
              >
                <div>
                  <CardSimple
                    title={item.title}
                    borrower={item.borrower}
                    borrowedAt={item.borrowedAt}
                    returnAt={item.returnAt}
                  />
                  <button className="mt-3 bg-green-200 text-black px-4 py-1 rounded text-sm">
                    KEMBALIKAN
                  </button>
                </div>

                {item.status === "TERLAMBAT" && (
                  <span className="text-white text-sm font-bold px-4 py-1 rounded bg-action-error">
                    TERLAMBAT
                  </span>
                )}
              </div>
            ))}
        </div>
        <div className="flex items items-center justify-center space-x-2 my-8">
            <a href="#" className="px-4 py-2 border rounded-md">&laquo;</a>
            <a href="#" className="px-2 py-2 border rounded-md bg-neutral-mbrown text-neutral-white">1</a>
            <a href="#" className="px-2 py-2 text-neutral-dbrown">2</a>
            <a href="#" className="px-2 py-2 text-neutral-dbrown">3</a>
            <a href="#" className="px-2 py-2 text-neutral-dbrown">...</a>
            <a href="#" className="px-4 py-2 border rounded-md">&raquo;</a>
        </div>
      </div>
    </>
  );
}
