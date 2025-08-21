"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function TambahBukuPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [kategoriList, setKategoriList] = useState<{ id: string; name: string }[]>([]);
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string[]>([]);
  const [showInputKategori, setShowInputKategori] = useState(false);
  const [kategoriBaru, setKategoriBaru] = useState("");

  const [judul, setJudul] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [penulis, setPenulis] = useState("");
  const [tahun, setTahun] = useState("");
  const [stok, setStok] = useState(1);

  // kategori
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book-category/list`, {
          headers: {
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          cache: "no-cache",
        });
        const data = await res.json();
        console.log("Kategori:", data);
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

  const handleTambahKategori = () => {
    setShowInputKategori(true);
  };

  const handleSubmitKategoriBaru = async () => {
    if (kategoriBaru.trim()) {
      try {
        const res = await fetch(`${BASE_URL}/api/book-category/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
          body: JSON.stringify({
            data: { name: kategoriBaru.trim() },
          }),
        });

        const data = await res.json();
        console.log("Tambah kategori:", data);
        if (!res.ok) throw new Error(data?.message || "Gagal menambahkan kategori");

        const idBaru = data?.data?.id || data?.data?.documentId;
        setKategoriList([...kategoriList, { id: idBaru, name: kategoriBaru.trim() }]);
        setKategoriBaru("");
        setShowInputKategori(false);
      } catch (error) {
        console.error(error);
        alert("Gagal menambah kategori");
      }
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
        headers: {
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: formData,
      });

      const data = await res.json();
      console.log("Tambah buku:", data);
      if (!res.ok) throw new Error(data?.message || "Gagal menambahkan buku");

      alert("Buku berhasil ditambahkan!");
      router.push("/buku");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menambahkan buku");
    }
  };

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold mb-6 text-navy text-2xl">Tambah Buku</h1>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        {/* Judul */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">
            Judul Buku
          </label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="border border-navy rounded px-3 py-2 w-full"
          />
        </div>

        {/* Penulis */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">
            Penulis
          </label>
          <input
            type="text"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            className="border border-navy rounded px-3 py-2 w-full"
          />
        </div>

        {/* Penerbit */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">
            Penerbit
          </label>
          <input
            type="text"
            value={penerbit}
            onChange={(e) => setPenerbit(e.target.value)}
            className="border border-navy rounded px-3 py-2 w-full"
          />
        </div>

        {/* Tahun Terbit */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">
            Tahun Terbit
          </label>
          <input
            type="number"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="border border-navy rounded px-3 py-2 w-full"
          />
        </div>

        {/* Stok */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">
            Stok
          </label>
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(Number(e.target.value))}
            className="border border-navy rounded px-3 py-2 w-full"
            min={1}
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">
            Kategori
          </label>

          <Button
            type="button"
            onClick={handleTambahKategori}
            className="bg-navy text-white hover:bg-blue mb-3"
          >
            + Tambah Kategori
          </Button>

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

          <div className="flex flex-wrap gap-4">
            {kategoriList.map((kategori) => (
              <label
                key={kategori.id}
                className="flex items-center gap-2 text-black"
              >
                <input
                  type="checkbox"
                  value={kategori.id}
                  checked={kategoriTerpilih.includes(kategori.id)}
                  onChange={() => handleKategoriChange(kategori.id)}
                />
                {kategori.name}
              </label>
            ))}
          </div>
        </div>

        {/* Cover */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-navy">
            Cover Buku
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500"
          />
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
