"use client";
import { useEffect, useState } from "react";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { Navbar } from "@/components/custom/navbar";
import { Footer } from "@/components/custom/footer";

interface LoanItem {
  id: number;
  title: string;
  borrowed_at: string;
  return_at: string;
  status: string;
}

export default function PeminjamanPage() {
  const [anggota, setAnggota] = useState<any>(null);
  const [peminjaman, setPeminjaman] = useState<LoanItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("anggotaPeminjaman");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setAnggota(parsed);

    const fetchPinjaman = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/loan/list?id_member=${parsed.documentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: TOKEN,
              "x-wihope-name": WIHOPE_NAME,
            },
            cache: "no-store",
          }
        );
        const result = await res.json();
        console.log("Hasil fetch loan/list:", result);

        const formatted = result.data.map((item: any) => ({
          id: item.id,
          title: item.book?.title || "Tanpa Judul",
          borrowed_at: item.loan_date,
          return_at: item.return_date,
          status:
            !item.return && new Date(item.return_date) < new Date()
              ? "TERLAMBAT"
              : item.return
              ? "DIKEMBALIKAN"
              : "DIPINJAM",
        }));

        setPeminjaman(formatted);
      } catch (error) {
        console.error("Gagal mengambil data peminjaman anggota:", error);
      }
    };

    fetchPinjaman();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DIKEMBALIKAN":
        return "bg-action-success";
      case "TERLAMBAT":
        return "bg-action-error";
      case "DIPINJAM":
        return "bg-action-warning";
      default:
        return "bg-gray-400";
    }
  };

  const getShowButton = (status: string) => {
    return status !== "DIKEMBALIKAN";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-tint-4 py-10 px-4">
        <div className="mb-6 ml-2">
          <h1 className="text-[35px] font-bold text-neutral-dbrown">Pinjaman</h1>
          <p className="text-[20px] font-medium text-neutral-mbrown">
            {anggota?.name || "Anggota"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg w-full p-8">
          <div className="space-y-4">
            {peminjaman.length > 0 ? (
              peminjaman.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-md p-4 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">Peminjaman: {item.borrowed_at}</p>
                    <p className="text-sm">Pengembalian: {item.return_at}</p>
                    {getShowButton(item.status) && (
                      <button className="mt-2 bg-yellow-200 text-black px-4 py-1 rounded text-sm">
                        KEMBALIKAN
                      </button>
                    )}
                  </div>

                  <span
                    className={`text-white text-sm font-bold px-4 py-1 rounded ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-dbrown">Belum ada data peminjaman.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
