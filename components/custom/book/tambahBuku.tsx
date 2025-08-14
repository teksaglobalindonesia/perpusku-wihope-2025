'use client';

import React, { useState, useEffect } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Link from 'next/link';

const TambahBuku = () => {
  const [form, setForm] = useState({
    title: '',
    writer: '',
    publisher: '',
    category: '',
    published_year: '',
    stock: '',
    cover: null as File | null
  });
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/book-category/list`, {
          headers: {
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          }
        });
        if (!res.ok) throw new Error('Gagal memuat kategori buku');
        const data = await res.json();
        setCategories(data.data || []);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, cover: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const payload = {
        title: form.title,
        writer: form.writer,
        publisher: form.publisher,
        categories: form.category,
        published_year: form.published_year,
        stock: parseInt(form.stock)
      };

      formData.append('data', JSON.stringify(payload));

      if (form.cover) {
        formData.append('files.cover', form.cover);
      }

      const response = await fetch(`${BASE_URL}/api/book/add/`, {
        method: 'POST',
        headers: {
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: formData
      });

      console.log('FormData entries:', Array.from(formData.entries()));

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || 'Gagal menambahkan buku');
      }

      setSuccess('✅ Buku berhasil ditambahkan!');
      setError(null);
      setForm({
        title: '',
        writer: '',
        publisher: '',
        category: '',
        published_year: '',
        stock: '',
        cover: null
      });
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menambahkan buku');
      setSuccess(null);
    }
  };

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-yellow-500 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Tambahkan Buku
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
          <div className="text-center">
            <label>Judul Buku</label>
          </div>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul Buku"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Penulis</label>
          </div>
          <input
            type="text"
            name="writer"
            value={form.writer}
            onChange={handleChange}
            placeholder="Penulis"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Penerbit</label>
          </div>
          <input
            type="text"
            name="publisher"
            value={form.publisher}
            onChange={handleChange}
            placeholder="Penerbit"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Kategori</label>
            <br />
            <Link href="/book/cat">
              <label className="cursor-pointer p-8 text-sm hover:text-blue-600">
                Klik disini untuk menambahkan kategori
              </label>
            </Link>
          </div>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-md bg-slate-300 px-5 py-2"
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="text-center">
            <label>Tahun Terbit</label>
          </div>
          <input
            type="number"
            name="published_year"
            value={form.published_year}
            onChange={handleChange}
            placeholder="Tahun"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Stok</label>
          </div>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>Cover Buku</label>
          </div>
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleFileChange}
            className="items-center rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="bg-white"></div>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="rounded bg-green-500 px-5 py-2 text-sm font-bold text-white"
            >
              Simpan Buku
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TambahBuku;
