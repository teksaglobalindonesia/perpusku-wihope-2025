"use client";
import { Footer } from "@/components/custom/footer";
import { Navbar } from "@/components/custom/navbar";
import { useEffect, useState } from "react";

export default function PeminjamanPage() {
  const [anggota, setAnggota] = useState({ name: "Anggota 1" });

  const dummyPinjaman = [
    {
      judul: "Buku Pinjaman 1",
      pinjam: "12 Juli 2025, 08.00",
      kembali: "19 Juli 2025",
      status: "DIKEMBALIKAN",
    },
    {
      judul: "Buku Pinjaman 2",
      pinjam: "13 Juli 2025, 08.00",
      kembali: "20 Juli 2025",
      status: "TERLAMBAT",
    },
    {
      judul: "Buku Pinjaman 3",
      pinjam: "20 Juli 2025, 08.00",
      kembali: "27 Juli 2025",
      status: "DIPINJAM",
    },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("anggotaPeminjaman");
    if (stored) setAnggota(JSON.parse(stored));
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
        <p className="text-[20px] font-medium text-neutral-mbrown">{anggota.name}</p>
        </div>
    <div className="bg-white rounded-lg shadow-lg w-full  p-8">
        <div className="space-y-4">
        {dummyPinjaman.map((item, i) => (
            <div key={i} className="border rounded-md p-4 shadow-sm flex justify-between items-center">
            <div>
                <p className="font-bold">{item.judul}</p>
                <p className="text-sm">Peminjaman: {item.pinjam}</p>
                <p className="text-sm">Pengembalian: {item.kembali}</p>
                {getShowButton(item.status) && (
                <button className="mt-2 bg-yellow-200 text-black px-4 py-1 rounded text-sm">
                    KEMBALIKAN
                </button>
                )}
            </div>

            <span className={`text-white text-sm font-bold px-4 py-1 rounded ${getStatusColor(item.status)}`}>
                {item.status}
            </span>
            </div>
        ))}
        </div>

        <div className="flex items-center justify-center space-x-2 my-8">
        <a href="#" className="px-4 py-2 border rounded-md">&laquo;</a>
        <a href="#" className="px-2 py-2 border rounded-md bg-neutral-mbrown text-neutral-white">1</a>
        <a href="#" className="px-2 py-2 text-neutral-dbrown">2</a>
        <a href="#" className="px-2 py-2 text-neutral-dbrown">3</a>
        <a href="#" className="px-2 py-2 text-neutral-dbrown">...</a>
        <a href="#" className="px-4 py-2 border rounded-md">&raquo;</a>
        </div>
    </div>
    </div>

    <Footer />
    </>
  );
}
