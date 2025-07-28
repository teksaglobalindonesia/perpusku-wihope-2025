"use client";

import { CardSimple } from "@/components/custom/card/cardsimple";
import { useState } from "react";
import { Navbar } from "@/components/custom/navbar";
import { PeminjamanHero } from "@/components/custom/peminjamanHero";
import { Footer } from "@/components/custom/footer";
import Link from "next/link";

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
      <PeminjamanHero />
      <div className="min-h-screen bg-tint-4 px-10 py-6">
        <div className="flex justify-center items-center mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Link href="/Peminjaman/tambah">
              <button className="bg-action-success text-neutral-white px-4 py-1 rounded text-sm">TAMBAH</button>
            </Link>
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
                className="border rounded-md px-6 py-4 shadow bg-neutral-white flex justify-between items-center"
              >
                <div>
                  <CardSimple
                    title={item.title}
                    borrower={item.borrower}
                    borrowedAt={item.borrowedAt}
                    returnAt={item.returnAt}
                  />
                  <button className="mt-3 bg-action-success font-medium text-neutral-white px-4 py-1 rounded text-sm">
                    KEMBALIKAN
                  </button>
                </div>

                {item.status === "TERLAMBAT" && (
                  <span className="text-neutral-white text-sm font-bold px-4 py-1 rounded bg-action-error">
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
      <Footer />
    </>
  );
}
