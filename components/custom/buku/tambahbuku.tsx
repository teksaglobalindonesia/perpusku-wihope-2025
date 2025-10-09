"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";
import gsap from "gsap";

export default function TambahBukuPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [kategoriList, setKategoriList] = useState<{ id: string; name: string }[]>([]);
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string[]>([]);
  const [showInputKategori, setShowInputKategori] = useState(false);
  const [kategoriBaru, setKategoriBaru] = useState("");

  const [judul, setJudul] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");
  const [stok, setStok] = useState(1);

  // 🔹 Ref untuk animasi
  const cardRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const previewRef = useRef<HTMLImageElement | null>(null);

  // 🔹 Animasi saat page pertama kali muncul
  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(formRef.current, {
      opacity: 0,
      y: 20,
      delay: 0.4,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  // 🔹 Animasi untuk preview cover
  useEffect(() => {
    if (previewImage && previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [previewImage]);

  // kategori fetch
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book-category/list`, {
          headers: { Authorization: TOKEN, "x-wihope-name": WIHOPE_NAME },
          cache: "no-cache",
        });
        const data = await res.json();
        if (Array.isArray(data?.data)) {
          setKategoriList(
            data.data.map((item: any) => ({
              id: item.id || item.documentId,
              name: item.name,
            }))
          );
        }
      } catch (error) {
        console.error("Gagal memuat kategori:", error);
      }
    };
    fetchKategori();
  }, []);

  const handleKategoriChange = (id: string) => {
    if (kategoriTerpilih.includes(id)) {
      setKategoriTerpilih(kategoriTerpilih.filter((k) => k !== id));
    } else {
      setKategoriTerpilih([...kategoriTerpilih, id]);
    }
  };

  const handleTambahKategori = () => setShowInputKategori(true);

  const handleSubmitKategoriBaru = async () => {
    if (!kategoriBaru.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/api/book-category/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: JSON.stringify({ data: { name: kategoriBaru.trim() } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Gagal menambahkan kategori");

      const idBaru = data?.data?.id || data?.data?.documentId;
      setKategoriList([...kategoriList, { id: idBaru, name: kategoriBaru.trim() }]);
      setKategoriBaru("");
      setShowInputKategori(false);
    } catch (error) {
      alert("Gagal menambah kategori");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Pilih cover buku terlebih dahulu!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("files.cover", selectedImage);
      formData.append(
        "data",
        JSON.stringify({
          title: judul,
          writer: penulis,
          publisher: penerbit,
          published_year: tahun,
          stock: stok,
          categories: kategoriTerpilih,
        })
      );

      const res = await fetch(`${BASE_URL}/api/book/add`, {
        method: "POST",
        headers: { Authorization: TOKEN, "x-wihope-name": WIHOPE_NAME },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Gagal menambahkan buku");

      alert("Buku berhasil ditambahkan!");
      router.push("/buku");
    } catch (error) {
      alert("Terjadi kesalahan saat menambahkan buku");
    }
  };

  return (
    <main className="px-6 py-8 flex justify-center">
      <Card ref={cardRef} className="w-full max-w-3xl shadow-lg rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-navy">Tambah Buku</CardTitle>
        </CardHeader>

        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium mb-1 text-navy">Judul Buku</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-navy/50"
                placeholder="Masukkan judul buku..."
              />
            </div>

            {/* Penulis */}
            <div>
              <label className="block text-sm font-medium mb-1 text-navy">Penulis</label>
              <input
                type="text"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-navy/50"
                placeholder="Masukkan nama penulis..."
              />
            </div>

            {/* Penerbit */}
            <div>
              <label className="block text-sm font-medium mb-1 text-navy">Penerbit</label>
              <input
                type="text"
                value={penerbit}
                onChange={(e) => setPenerbit(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-navy/50"
                placeholder="Masukkan penerbit..."
              />
            </div>

            {/* Tahun */}
            <div>
              <label className="block text-sm font-medium mb-1 text-navy">Tahun Terbit</label>
              <input
                type="number"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-navy/50"
                placeholder="contoh: 2024"
              />
            </div>

            {/* Stok */}
            <div>
              <label className="block text-sm font-medium mb-1 text-navy">Stok</label>
              <input
                type="number"
                value={stok}
                min={1}
                onChange={(e) => setStok(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-navy/50"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium mb-2 text-navy">Kategori</label>

              <div className="mb-3">
                <Button
                  type="button"
                  onClick={handleTambahKategori}
                  className="bg-navy text-white hover:bg-blue rounded-lg"
                >
                  + Tambah Kategori
                </Button>
              </div>

              {showInputKategori && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Kategori baru"
                    value={kategoriBaru}
                    onChange={(e) => setKategoriBaru(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-1/2 focus:ring-2 focus:ring-navy/50"
                  />
                  <Button type="button" onClick={handleSubmitKategoriBaru}>
                    Simpan
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                {kategoriList.map((kategori) => (
                  <label key={kategori.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={kategori.id}
                      checked={kategoriTerpilih.includes(kategori.id)}
                      onChange={() => handleKategoriChange(kategori.id)}
                      className="rounded accent-navy"
                    />
                    <span className="text-sm">{kategori.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cover */}
            <div>
              <label className="block text-sm font-medium mb-2 text-navy">Cover Buku</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setSelectedImage(file);
                  if (file) {
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
                className="block w-full text-sm text-gray-500 mb-3"
              />

              {previewImage && (
                <img
                  ref={previewRef}
                  src={previewImage}
                  alt="Preview cover"
                  className="w-32 h-44 object-cover rounded-lg border"
                />
              )}
            </div>

            {/* Tombol */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-navy text-white hover:bg-blue rounded-lg">
                Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
