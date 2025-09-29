"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PilihBuku from "@/components/custom/peminjaman/pilihbuku";
import PilihAnggota from "@/components/custom/peminjaman/pilihanggota";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function TambahPeminjaman() {
  const [selectedBuku, setSelectedBuku] = useState<{ id: string; title: string } | null>(null);
  const [selectedAnggota, setSelectedAnggota] = useState<{ id: string; name: string } | null>(null);
  const [tanggal, setTanggal] = useState("");
  const [durasi, setDurasi] = useState("1 minggu");

  const hitungReturnDate = (loanDate: string, durasi: string) => {
    const d = new Date(loanDate);
    if (durasi === "1 minggu") d.setDate(d.getDate() + 7);
    if (durasi === "2 minggu") d.setDate(d.getDate() + 14);
    if (durasi === "3 minggu") d.setDate(d.getDate() + 21);
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuku || !selectedAnggota || !tanggal) {
      alert("Mohon lengkapi semua data.");
      return;
    }

    try {
      const returnDate = hitungReturnDate(tanggal, durasi);

      const res = await fetch(`${BASE_URL}/api/loan/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({
          data: {
            member: selectedAnggota.id,
            book: selectedBuku.id,
            loan_date: tanggal,
            return_date: returnDate,
          },
        }),
        cache: "no-store",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gagal menyimpan peminjaman: ${errorText}`);
      }

      alert("Data peminjaman berhasil disimpan!");
      setSelectedBuku(null);
      setSelectedAnggota(null);
      setTanggal("");
      setDurasi("1 minggu");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan peminjaman");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-navy">
          Tambah Peminjaman
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Pilih Buku */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buku</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                readOnly
                value={selectedBuku?.title || ""}
                placeholder="Belum dipilih"
                className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-sm"
              />
              <PilihBuku
                onSelect={(buku) =>
                  setSelectedBuku({
                    id: String(buku.id),
                    title: buku.title,
                  })
                }
              />
            </div>
          </div>

          {/* Pilih Anggota */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Anggota</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                readOnly
                value={selectedAnggota?.name || ""}
                placeholder="Belum dipilih"
                className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-sm"
              />
              <PilihAnggota
                onSelect={(anggota) =>
                  setSelectedAnggota({
                    id: String(anggota.id),
                    name: anggota.name,
                  })
                }
              />
            </div>
          </div>

          {/* Tanggal Peminjaman */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Peminjaman</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Durasi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durasi Peminjaman</label>
            <select
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option>1 minggu</option>
              <option>2 minggu</option>
              <option>3 minggu</option>
            </select>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
          >
            Simpan
          </Button>
        </form>
      </div>
    </main>
  );
}
