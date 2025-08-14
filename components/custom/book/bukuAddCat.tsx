'use client';

import React, { useState } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

const AddCat = () => {
  const [form, setForm] = useState({ name: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/book-category/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME,
          Accept: 'application/json'
        },
        body: JSON.stringify({
          data: form
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.error?.message || 'Gagal menambahkan Kategori'
        );
      }

      await response.json();
      setSuccess('✅ Kategori berhasil ditambahkan!');
      setError(null);
      setForm({ name: '' });
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menambahkan anggota');
      setSuccess(null);
    }
  };

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-yellow-500 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Tambahkan Kategori
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Kategori"
          className="mr-4 rounded-md bg-slate-300 px-5 py-2"
        />
        <button
          type="submit"
          className="rounded bg-green-500 px-5 py-2 text-sm font-bold text-white"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default AddCat;
