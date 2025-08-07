"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/custom/navbar";
import { PeminjamanHero } from "@/components/custom/peminjamanHero";
import { Footer } from "@/components/custom/footer";
import { CardSimple } from "@/components/custom/card/cardsimple";
import Link from "next/link";
import Pagination from "@/components/custom/pagination";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

interface Peminjaman {
  id: number;
  title: string;
  borrower: string;
  borrowedAt: string;
  returnAt: string;
  returned?: string;
  status: "TERLAMBAT" | "DIPINJAM";
}

export default function PeminjamanPage() {
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPeminjaman, setTotalPeminjaman] = useState(0);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchPeminjaman = async () => {
      try {
        const url = `${BASE_URL}/api/loan/list?page=${currentPage}&page_size=${itemsPerPage}&search=${encodeURIComponent(search)}`;
        const peminjaman = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        });

        const dataPeminjaman = await peminjaman.json();

        const formatted = dataPeminjaman.data.map((item: any) => ({
          id: item.id,
          title: item.book?.title,
          borrower: item.member?.name,
          borrowedAt: item.loan_date,
          returnAt: item.return_date,
          returned: item.return ? "Sudah Dikembalikan" : "Belum Dikembalikan",
          status:
            !item.return && new Date(item.return_date) < new Date()
              ? "TERLAMBAT"
              : "DIPINJAM",
        }));

        setPeminjaman(formatted);
        setTotalPeminjaman(dataPeminjaman.total);
      } catch (error) {
        console.error("Gagal mengambil data peminjaman:", error);
      }
    };

    fetchPeminjaman();
  }, [search, currentPage]);

  const totalPages = Math.ceil(totalPeminjaman / itemsPerPage);

  // const filtered = peminjaman.filter((item) =>
  //   item.borrower.toLowerCase().includes(search.toLowerCase())
  // );

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
              <button className="bg-action-success text-neutral-white px-4 py-1 rounded text-sm">
                TAMBAH
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {peminjaman.map((item) => (
            <div
              key={item.id}
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Footer />
    </>
  );
}


