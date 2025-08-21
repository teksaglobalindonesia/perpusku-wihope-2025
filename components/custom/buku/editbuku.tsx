"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BASE_URL, TOKEN, WIHOPE_NAME } from "@/lib/constant";

export default function EditBuku() {
  const router = useRouter();
  const params = useParams();
  const documentId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [cover, setCover] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [oldCover, setOldCover] = useState<string | null>(null); // simpan cover lama

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book/detail/${documentId}`, {
          headers: {
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
        });
        const json = await res.json();
        const data = json.data;

        setTitle(data.title || "");
        setWriter(data.writer || "");
        setPublisher(data.publisher || "");
        setPublishedYear(data.published_year || "");
        setStock(data.stock || 0);
        setSelectedCategories(data.categories?.map((c: any) => c.documentId) || []);
        setOldCover(
          data.cover?.url
            ? `https://cms-perpusku.widhimp.my.id${data.cover.url}`
            : null
        );
      } catch (err) {
        console.error("Gagal ambil data buku:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book-category/list`, {
          headers: {
            Authorization: TOKEN,
            "x-wihope-name": WIHOPE_NAME,
          },
        });
        const json = await res.json();
        setCategories(json.data || []);
      } catch (err) {
        console.error("Gagal ambil kategori:", err);
      }
    };

    if (documentId) {
      fetchBook();
      fetchCategories();
    }
  }, [documentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("documentId", documentId);

      if (cover) formData.append("files.cover", cover);

      formData.append(
        "data",
        JSON.stringify({
          title,
          writer,
          publisher,
          published_year: publishedYear,
          stock,
          categories: selectedCategories,
        })
      );

      const res = await fetch(`${BASE_URL}/api/book/edit`, {
        method: "PATCH",
        headers: {
          Authorization: TOKEN,
          "x-wihope-name": WIHOPE_NAME,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal update buku");

      alert("✅ Buku berhasil diperbarui!");
      router.push("/buku");
    } catch (err) {
      console.error(err);
      alert("❌ Terjadi kesalahan saat update buku.");
    }
  };

  if (loading) return <p className="p-6">Loading data buku...</p>;

  return (
    <main className="px-6 py-8">
      <h1 className="font-bold mb-3 text-navy text-2xl">Edit Buku</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {/* Judul */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Judul Buku</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-navy rounded px-2 py-1"
          />
        </div>

        {/* Penulis */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Penulis</label>
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
            className="w-full border border-navy rounded px-2 py-1"
          />
        </div>

        {/* Penerbit */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Penerbit</label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
            className="w-1/2 border border-navy rounded px-2 py-1"
          />
        </div>

        {/* Tahun Terbit */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Tahun Terbit</label>
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            required
            className="w-1/2 border border-navy rounded px-2 py-1"
          />
        </div>

        {/* Stok */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Stok</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            className="w-1/2 border border-navy rounded px-2 py-1"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Kategori</label>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <label key={cat.documentId} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.documentId)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, cat.documentId]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((id) => id !== cat.documentId)
                      );
                    }
                  }}
                  className="accent-navy"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        {/* Gambar */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-navy">Gambar</label>
          {oldCover && (
            <img
              src={oldCover}
              alt="Cover lama"
              className="w-32 h-40 object-cover rounded mb-2 border"
            />
          )}
          <input
            type="file"
            className="w-full border border-navy rounded px-2 py-1"
            accept="image/*"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Button type="submit" className="bg-navy text-white hover:bg-blue">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </main>
  );
}
