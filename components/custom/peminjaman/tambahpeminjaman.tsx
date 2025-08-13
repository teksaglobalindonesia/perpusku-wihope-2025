"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PilihBuku from "@/components/custom/peminjaman/pilihbuku";
import PilihAnggota from "@/components/custom/peminjaman/pilihanggota";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import { error } from "console";

export default function TambahPeminjaman() {
  const [selectedBuku, setSelectedBuku] = useState<{ id: number; title: string } | null>(null);
  const [selectedAnggota, setSelectedAnggota] = useState<{ id: number; name: string } | null>(null);
  const [tanggal, setTanggal] = useState("");
  const [durasi, setDurasi] = useState("1 minggu");

  const hitungReturnDate = (loanDate: string, durasi: string) => {
    const d = new Date (loanDate);
    if (durasi === "1 minggu") d.setDate(d.getDate() + 7);
    if (durasi === "2 minggu") d.setDate(d.getDate() + 14);
    if (durasi === "3 minggu") d.setDate(d.getDate() + 21);
    return d.toISOString().split("T")[0];
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuku || !selectedAnggota || !tanggal) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    try{
      const returnDate = hitungReturnDate(tanggal, durasi);
      
      const res = await fetch (`${BASE_URL}/api/loan/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({
          data:{
            member: selectedAnggota.id,
            book: selectedBuku.id,
            loan_date: tanggal,
            return_date: returnDate,
          },
        }),
        cache: "no-cache",
      });
      
      if (!res.ok) throw new Error ("gagal menyimpan peminjaman");

      alert("Data peminjaman berhasil di simpan!");
      setSelectedBuku(null);
      setSelectedAnggota(null);
      setTanggal("");
      setDurasi("1 minggu");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan peminjaman")
    }
  };

  
  return (
    <main className="px-6 py-8">
      <h1 className="font-bold mb-4 text-xl text-navy">Tambah Peminjaman</h1>

      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        {/* Pilih Buku */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Buku</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              readOnly
              value={selectedBuku?.title || ""}
              placeholder="Belum dipilih"
              className="w-full border border-navy rounded px-2 py-1 bg-gray-100"
            />
            <PilihBuku onSelect={(buku) => setSelectedBuku(buku)} />
          </div>
        </div>

        {/* Pilih Anggota */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Anggota</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              readOnly
              value={selectedAnggota?.name || ""}
              placeholder="Belum dipilih"
              className="w-full border border-navy rounded px-2 py-1 bg-gray-100"
            />
            <PilihAnggota onSelect={(anggota) => setSelectedAnggota(anggota)} />
          </div>
        </div>

        {/* Tanggal Peminjaman */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Tanggal Peminjaman</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border border-navy rounded px-2 py-1"
          />
        </div>

        {/* Durasi Peminjaman */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Durasi Peminjaman</label>
          <select
            value={durasi}
            onChange={(e) => setDurasi(e.target.value)}
            className="w-full border border-navy rounded px-2 py-1"
          >
            <option>1 minggu</option>
            <option>2 minggu</option>
            <option>3 minggu</option>
          </select>
        </div>

        {/* Submit */}
        <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">
          SIMPAN
        </Button>
      </form>
    </main>
  );
}
