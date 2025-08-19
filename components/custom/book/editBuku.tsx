'use client';

import React, { useState, useEffect } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { useParams, useRouter } from 'next/navigation';

const EditBuku = () => {
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [tahun, setTahun] = useState('');
  const [stok, setStok] = useState(0);
  const [kategori, setKategori] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const { documentId } = useParams();
  const router = useRouter();

  // 🔹 fetch data buku supaya form terisi otomatis
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book/list/${documentId}`, {
          headers: {
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          }
        });
        const data = await res.json();

        // sesuaikan dengan struktur response API kamu
        setJudul(data?.data?.attributes?.title || '');
        setPenulis(data?.data?.attributes?.writer || '');
        setPenerbit(data?.data?.attributes?.publisher || '');
        setTahun(data?.data?.attributes?.published_year || '');
        setStok(data?.data?.attributes?.stock || 0);
        setKategori(data?.data?.attributes?.categories?.[0] || '');
      } catch (err) {
        console.error(err);
      }
    };

    if (documentId) fetchBook();
  }, [documentId]);

  // handler submit
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (coverImage) {
      formData.append('files.cover', coverImage);
    }

    formData.append(
      'data',
      JSON.stringify({
        title: judul,
        writer: penulis,
        publisher: penerbit,
        published_year: tahun,
        stock: stok,
        categories: [kategori]
      })
    );

    try {
      const res = await fetch(`${BASE_URL}/api/book/list/${documentId}`, {
        method: 'PATCH',
        headers: {
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: formData
      });

      if (!res.ok) throw new Error('Gagal update buku');
      alert('✅ Buku berhasil diperbarui');
      router.push('/book'); // balik ke halaman list buku
    } catch (err) {
      console.error(err);
      alert('❌ Terjadi kesalahan saat update buku');
    }
  };

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-blue-900 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Edit Buku
      </h1>

      <form onSubmit={handleEdit}>
        <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
          <div className="text-center">
            <label>Judul Buku:</label>
          </div>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Judul Buku"
            className="items-center rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Penulis:</label>
          </div>
          <input
            type="text"
            value={penulis}
            onChange={(e) => setPenulis(e.target.value)}
            placeholder="Penulis"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Penerbit:</label>
          </div>
          <input
            type="text"
            value={penerbit}
            onChange={(e) => setPenerbit(e.target.value)}
            placeholder="Penerbit"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Tahun Terbit:</label>
          </div>
          <input
            type="text"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            placeholder="Tahun Terbit"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Kategori:</label>
          </div>
          <input
            type="text"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            placeholder="DocumentId Kategori"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Stok Buku:</label>
          </div>
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(Number(e.target.value))}
            placeholder="Stok"
            min="0"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
            <img src="/next.svg" alt="Gambar Buku" />
          </div>
          <div className="flex flex-col space-y-8">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="mx-2 my-1"
            />
            <button
              type="submit"
              className="mx-2 my-1 rounded bg-green-500 px-3 py-1 text-sm font-bold text-white"
            >
              Simpan Buku
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBuku;
