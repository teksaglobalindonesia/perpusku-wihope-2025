"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EditBukuPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Buku berhasil diubah!");
    router.push("/buku");
  };

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold mb-3 text-navy text-2xl">Edit Buku</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        

        {/* Judul */}
        <div>
          <label className="block text-sm font-semibold font-sans mb-1 text-navy">Judul buku</label>
          <input
            type="text"
            required
            className="w-full border border-navy rounded px-2 py-1"
            defaultValue="Judul Baru"
          />
        </div>

        {/* Penulis */}
        <div>
          <label className="block text-sm font-semibold font-sans mb-1 text-navy">Penulis</label>
          <input
            type="text"
            required
            className="w-full border border-navy rounded px-2 py-1"
            defaultValue="Penulis aru"
          />
        </div>

        {/* Penerbit */}
        <div>
          <label className="block text-sm font-semibold font-sans mb-1 text-navy">Penerbit</label>
          <input
            type="text"
            required
            className="w-1/2 border border-navy rounded px-2 py-1"
            defaultValue="Penerbit Baru"
          />
        </div>

        {/* Tahun Terbit */}
        <div>
          <label className="block text-sm font-semibold font-sans mb-1 text-navy">Tahun Terbit</label>
          <input
            type="number"
            required
            className="w-1/2 border border-navy rounded px-2 py-1"
            defaultValue="2020"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold font-sans mb-1 text-navy">Kategori</label>
          <Button type="button" className="mb-2 bg-navy text-white hover:bg-navy/80">
            + Tambah Kategori
          </Button>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-navy" /> Horor
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-navy" /> Romantis
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-navy" /> Fiksi Remaja
            </label>
          </div>
        </div>
        
        {/* Gambar */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-black">Gambar</label>
          <input
            type="file"
            className="w-full border border-navy rounded px-2 py-1"
            accept="image/*"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Button 
          type="submit" 
          className="bg-navy text-white hover:bg-blue">
            Simpan Perubahan
          </Button>

          <Button
          type="button"
          className="bg-red-500 text-white hover:bg-red-600">
              Hapus Buku          
          </Button>
        </div>
      </form>
    </main>
  );
}
