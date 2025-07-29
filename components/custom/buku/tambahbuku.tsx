"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TambahBukuPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [kategoriList, setKategoriList] = useState([
    "Fiksi",
    "Non-Fiksi",
    "Sejarah",
    "Romantis",
    "Persahabatan",
  ]);
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string[]>([]);
  const [showInputKategori, setShowInputKategori] = useState(false);
  const [kategoriBaru, setKategoriBaru] = useState("");

  const handleKategoriChange = (value: string) => {
    if (kategoriTerpilih.includes(value)) {
      setKategoriTerpilih(kategoriTerpilih.filter((k) => k !== value));
    } else {
      setKategoriTerpilih([...kategoriTerpilih, value]);
    }
  };

  const handleTambahKategori = () => {
    setShowInputKategori(true);
  };

  const handleSubmitKategoriBaru = () => {
    if (kategoriBaru.trim() && !kategoriList.includes(kategoriBaru)) {
      setKategoriList([...kategoriList, kategoriBaru.trim()]);
      setKategoriBaru("");
      setShowInputKategori(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Buku berhasil ditambahkan!");
    router.push("/buku");
  };

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold mb-6 text-navy text-2xl">Tambah Buku</h1>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        {/* Judul */}
        <div>
          <label className="block text-sm font-semibold mb-1 font-roboto text-navy">Judul Buku</label>
          <input
            type="text"
            required
            className="w-1/3 border border-navy rounded px-3 py-2"
            placeholder="Masukkan judul buku..."
          />
        </div>
        <div>
            <label className="block text-navy font-roboto mb-1 font-semibold text-sm">Penerbit</label>
            <input type="text" 
            required 
            className="w-1-3 border border-navy rounded px-3 py-2" placeholder="masukan nama penerbit"/>
        </div>

        {/* Penulis */}
        <div>
          <label className="block text-sm font-semibold font-roboto mb-1 text-navy">Penulis</label>
          <input
            type="text"
            required
            className="w-1/3 border border-navy rounded px-3 py-2"
            placeholder="Masukkan nama penulis..."
          />
        </div>

        {/* tahun terbit */}
        <div>
            <label className="block text-sm font-roboto font-semibold text-navy mb-1">Tahun terbit</label>
            <input type="text" 
            required 
            className=" w-1/3 border mb-2 border-navy px-3 py-2 rounded" 
            placeholder="Masukan Tahun Terbit..." 
            />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">Kategori</label>

          {/* Tombol Tambah Kategori */}
          <Button type="button" onClick={handleTambahKategori} className="bg-navy text-white hover:bg-blue mb-3">
            + Tambah Kategori
          </Button>

          {/* Form Input Tambah Kategori */}
          {showInputKategori && (
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Kategori baru"
                value={kategoriBaru}
                onChange={(e) => setKategoriBaru(e.target.value)}
                className="border border-navy rounded px-3 py-2 w-1/2"
              />
              <Button type="button" onClick={handleSubmitKategoriBaru}>
                Simpan
              </Button>
            </div>
          )}

          {/* Checkbox */}
          <div className="flex flex-wrap gap-4">
            {kategoriList.map((kategori) => (
              <label key={kategori} className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  value={kategori}
                  checked={kategoriTerpilih.includes(kategori)}
                  onChange={() => handleKategoriChange(kategori)}
                />
                {kategori}
              </label>
            ))}
          </div>
        </div>

        {/* Gambar */}
        <div>
          <label className="block text-sm text-navy font-semibold mb-1">Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            className="w-1/2 border border-navy rounded px-3 py-2 bg-white"
          />
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover rounded border border-navy"
            />
          )}
        </div>

        {/* Tombol Simpan */}
        <div>
          <Button type="submit" className="bg-navy text-white hover:bg-blue">
            Simpan
          </Button>
        </div>
      </form>
    </main>
  );
}
