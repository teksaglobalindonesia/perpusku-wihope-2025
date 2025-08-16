'use client';

import { useState } from 'react';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [stock, setStock] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [cover, setCover] = useState<File | null>(null);

  const handleCategoryChange = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Buku berhasil disimpan:
Judul: ${title}
Penulis: ${writer}
Penerbit: ${publisher}
Tahun: ${year}
Kategori: ${categories.join(', ')}
Stok: ${stock}
Cover: ${cover ? cover.name : 'Belum dipilih'}`);
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#222831] p-8">
      <div className="w-full max-w-lg rounded-xl bg-[#393E46] p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-[#DFD0B8]">Tambah Buku</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="mb-1 block font-medium text-[#DFD0B8]">
              Judul
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#948979] px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#948979]"
            />
          </div>
          {/* Penulis */}
          <div>
            <label className="mb-1 block font-medium text-[#DFD0B8]">
              Penulis
            </label>
            <input
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              className="w-full rounded-lg border border-[#948979] px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#948979]"
            />
          </div>
          {/* Penerbit */}
          <div>
            <label className="mb-1 block font-medium text-[#DFD0B8]">
              Penerbit
            </label>
            <input
              type="text"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full rounded-lg border border-[#948979] px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#948979]"
            />
          </div>
          {/* Tahun Terbit */}
          <div>
            <label className="mb-1 block font-medium text-[#DFD0B8]">
              Tahun Terbit
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-[#948979] px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#948979]"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#DFD0B8]">
              Kategori
            </label>
            <button
              type="button"
              className="mb-2 rounded bg-[#FBBF24] px-3 py-1 font-semibold text-black hover:bg-yellow-500"
            >
              TAMBAH KATEGORI
            </button>
            <div className="space-y-1 text-[#DFD0B8]">
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange('Romance')}
                />{' '}
                Romance
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange('Adventure')}
                />{' '}
                Adventure
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange('Horror')}
                />{' '}
                Horror
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#DFD0B8]">
              Stok
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-lg border border-[#948979] px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#948979]"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-[#DFD0B8]">
              Cover
            </label>
            <input
              type="file"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
              className="mb-2 text-[#DFD0B8]"
            />

            {cover && (
              <img
                src={URL.createObjectURL(cover)}
                alt="Preview Cover"
                className="mt-3 h-48 w-auto rounded-lg border border-[#948979] shadow-md"
              />
            )}
          </div>
          {/* Button Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            SIMPAN BUKU
          </button>
        </form>
      </div>
    </div>
  );
}
