"use client";
import { useState } from "react";
import { Navbar } from "@/components/custom/navbar";
import { AnggotaHero } from "@/components/custom/anggotaHero";
import { Footer } from "@/components/custom/footer";
import Link from "next/link";

const dummyData = [
  {
    name: "Dee Lestari",
    noAnggota: "001",
    email: "dee.lestari@example.com",
  },
  {
    name: "Justine Bieber",
    noAnggota: "002",
    email: "justine.bieber@example.com",
  }, 
  {
    name: "Cristine Aguilera",
    noAnggota: "003",
    email: "cristine.aguilera@example.com",
  }, 
  {
    name: "Agus Salim",
    noAnggota: "004",
    email: "agus.salim@example.com",
  }, 
  {
    name: "Budi Santoso",
    noAnggota: "005",
    email: "budi.santoso@example.com",
  }, 
  {
    name: "Ratih Kumala",
    noAnggota: "006",
    email: "ratih.kumala@example.com",
  }, 
];

export default function AnggotaPage() {
    const [search, setSearch] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedAnggota, setSelectedAnggota] = useState<number | null>(null);
    const handleClickDelete = (index: number) => {
        setSelectedAnggota(index);
        setShowConfirm(true);
    };
    const confirmDelete = () => {
        if (selectedAnggota !== null) {
            dummyData.splice(selectedAnggota, 1);
            setSelectedAnggota(null);
            setShowConfirm(false);
        }
    };

    return(
        <>
        <Navbar/>
        <AnggotaHero/>
      <div className="p-6 bg-tint-4 min-h-screen">
        <div className="flex justify-center items-center mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link href="/Anggota/tambah">
              <button className="bg-action-success text-neutral-white px-4 py-1 rounded text-sm">TAMBAH</button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
            {dummyData.filter(anggota => anggota.name.toLowerCase().includes(search.toLowerCase())).map((anggota, index) => (
            <div
              key={index}
              className="bg-neutral-white flex justify-between items-center rounded-md shadow px-6 py-4 border"
            >
              <div className="flex gap-4 items-start">
                <div>
                  <h3 className="text-neutral-dbrown font-semibold text-[18px] font-inter">
                    {anggota.name}
                  </h3>
                  <p className="text-[12px] text-neutral-mbrown">
                    {anggota.noAnggota} <br />
                    {anggota.email}
                  </p>
                  <div className="mt-2 flex gap-2">
                  <Link
                    href="/Anggota/peminjaman"
                    onClick={() => localStorage.setItem("anggotaPeminjaman", JSON.stringify(anggota))}
                    >
                    <button className="bg-brand-secondary text-neutral-white text-[12px] px-2 py-1 rounded">
                      PEMINJAMAN
                    </button>
                  </Link>
                  <Link
                    href="/Anggota/edit"
                    onClick={() => localStorage.setItem("editAnggota", JSON.stringify(anggota))}
                  >
                    <button className="bg-neutral-beige text-neutral-dbrown text-[12px] px-2 py-1 rounded">
                      EDIT
                    </button>
                  </Link>
                    <button onClick={() => handleClickDelete(index)} className="bg-brand-secondary text-neutral-white text-[12px] px-2 py-1 rounded">
                      HAPUS
                    </button>
                    {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div className="bg-tint-4 rounded-md p-6 w-[350px] shadow-lg text-center">
                        <p className="text-sm text-neutral-dbrown mb-4">Apakah yakin menghapus anggota ini?</p>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={confirmDelete}
                            className="bg-action-error hover:bg-red-500 text-neutral-white px-4 py-1 rounded text-sm"
                          >
                            Hapus
                          </button>
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="bg-brand-info hover:bg-gray-400 text-neutral-white px-4 py-1 rounded text-sm"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>
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
        <Footer/>
        </>
    )
}