"use client";

import { CardSimple } from "@/components/custom/card/cardsimple";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/custom/navbar";
import { PengembalianHero } from "@/components/custom/pengembalianHero";
import { Footer } from "@/components/custom/footer";
import Link from "next/link";
import Pagination from "@/components/custom/pagination";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

interface Pengembalian {
  id: number;
  title: string;
  borrower: string;
  borrowedAt: string;
  returnAt: string;
  returned?: string;
  status?: "TERLAMBAT";
}

export default function PengembalianPage() {
  const [pengembalian, setPengembalian] = useState<Pengembalian[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPengembalian, setTotalPengembalian] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 3;
  
  useEffect(() => {
    const fetchPengembalian = async () => {
      setIsLoading(true);
      try {
        const url = `${BASE_URL}/api/return/list?page=${currentPage}&page_size=${itemsPerPage}&search=${encodeURIComponent(search)}`;
        const peminjaman = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-store",
        });

        const data = await peminjaman.json();
        
        const formatted = data.data.map((item: any) => ({
          id: item.id,
          title: item.book?.title || "Judul tidak tersedia",
          borrower: item.member?.name || "Nama tidak tersedia",
          borrowedAt: item.loan_date,
          returnAt: item.return_date,
          returned: item.return?.actual_return_date,
          status: item.return?.actual_return_date &&
            new Date(item.return.actual_return_date) > new Date(item.return_date)
              ? "TERLAMBAT"
              : undefined,
        }));

        setPengembalian(formatted);
        setTotalPengembalian(data.total || data.meta?.pagination?.total || 0);
      } catch (error) {
        console.error("Gagal mengambil data pengembalian:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPengembalian();
  }, [search, currentPage]);

  const totalPages = Math.ceil(totalPengembalian / itemsPerPage);

  return (
    <>
      <Navbar />
      <PengembalianHero />
      <div className="min-h-screen bg-tint-4 px-10 py-6">
        <div className="flex justify-center items-center mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded text-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); 
              }}
            />

            <Link href="/Peminjaman/tambah">
              <button className="bg-action-success text-neutral-white px-4 py-1 rounded text-sm">
                TAMBAH
              </button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8 font-semibold text-neutral-mbrown">Sabar ya...</div>
        ) : pengembalian.length === 0 ? (
          <div className="text-center py-8 font-semibold text-neutral-mbrown">Tidak ada data pengembalian</div>
        ) : (
          <>
            <div className="space-y-4">
              {pengembalian.map((item) => (
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
                      returned={item.returned}
                    />
                  </div>
                  {item.status === "TERLAMBAT" && (
                    <span className="text-neutral-white text-sm font-bold px-4 py-1 rounded bg-action-error">
                      TERLAMBAT
                    </span>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}