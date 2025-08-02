'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBookInStrapi } from '@/lib/constant';

const TambahBuku = () => {
  const router = useRouter();

  const [bookData, setBookData] = useState({
    judul: '',
    genre: '',
    penulis: '',
    penerbit: '',
    tahun: '',
    stok: 0,
    gambar: '/next.svg'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: name === 'stok' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createBookInStrapi(bookData);
      alert('Buku berhasil ditambahkan');
      router.push('/book');
    } catch (err) {
      setError('Gagal menambah buku');
      console.error('Error creating book:', err);
      alert('Gagal menambah buku');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-blue-900 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Tambahkan Buku
      </h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-4 py-4 text-center">
          <p>Menyimpan buku...</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
          <div className="text-center">
            <label>Judul Buku:</label>
          </div>
          <input
            type="text"
            name="judul"
            value={bookData.judul}
            onChange={handleChange}
            placeholder="Judul Buku"
            className="items-center rounded-md bg-slate-300 px-5 py-2"
            required
          />
          <div className="text-center">
            <label>Penulis:</label>
          </div>
          <input
            type="text"
            name="penulis"
            value={bookData.penulis}
            onChange={handleChange}
            placeholder="Penulis"
            className="rounded-md bg-slate-300 px-5 py-2"
            required
          />
          <div className="text-center">
            <label>Penerbit:</label>
          </div>
          <input
            type="text"
            name="penerbit"
            value={bookData.penerbit}
            onChange={handleChange}
            placeholder="Penerbit"
            className="rounded-md bg-slate-300 px-5 py-2"
            required
          />
          <div className="text-center">
            <label>Tahun Terbit:</label>
          </div>
          <input
            type="text"
            name="tahun"
            value={bookData.tahun}
            onChange={handleChange}
            placeholder="Tahun Terbit"
            className="rounded-md bg-slate-300 px-5 py-2"
            required
          />
          <div className="text-center">
            <label>Kategori</label>
          </div>
          <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            placeholder="Genre"
            className="rounded-md bg-slate-300 px-5 py-2"
            required
          />
          <div className="text-center">
            <label>Stok Buku:</label>
          </div>
          <input
            type="number"
            name="stok"
            value={bookData.stok}
            onChange={handleChange}
            placeholder="Stok"
            className="rounded-md bg-slate-300 px-5 py-2"
            required
            min="0"
          />
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
            <img src="/next.svg" alt="" />
          </div>
          <div className="flex flex-col space-y-8">
            <button
              type="button"
              className="mx-2 my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white"
            >
              Pilih Gambar Baru
            </button>
            <button
              type="submit"
              disabled={loading}
              className="mx-2 my-1 rounded bg-green-500 px-3 py-1 text-sm font-bold text-white disabled:bg-gray-400"
            >
              {loading ? 'Menyimpan...' : 'Simpan Buku'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TambahBuku;
