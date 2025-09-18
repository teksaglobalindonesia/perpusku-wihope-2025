'use client';

import React, { useState } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

const TambahAnggota = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    id_member: ''
  });
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
      const response = await fetch(`${BASE_URL}/api/member/add`, {
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
          errorData?.error?.message || 'Gagal menambahkan anggota'
        );
      }

      await response.json();
      setSuccess('✅ Anggota berhasil ditambahkan!');
      setError(null);
      setForm({
        name: '',
        email: '',
        address: '',
        id_member: ''
      });
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menambahkan anggota');
      setSuccess(null);
    }
  };

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-28 rounded-lg bg-yellow-500 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Tambahkan Anggota
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-12 mt-4 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
          <div className="text-center">
            <label>Nomor Anggota</label>
          </div>
          <input
            type="text"
            name="id_member"
            value={form.id_member}
            onChange={handleChange}
            placeholder="Nomor Anggota"
            className="items-center rounded-md bg-slate-300 px-5 py-2 text-black
            placeholder:text-black"
          />

          <div className="text-center">
            <label>Nama Anggota</label>
          </div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama Anggota"
            className="rounded-md bg-slate-300 px-5 py-2 text-black
            placeholder:text-black"
          />

          <div className="text-center">
            <label>Email</label>
          </div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="rounded-md bg-slate-300 px-5 py-2 text-black
            placeholder:text-black"
          />

          <div className="text-center">
            <label>Alamat</label>
          </div>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Alamat"
            className="rounded-md bg-slate-300 px-5 py-2 text-black
            placeholder:text-black"
          />

          <div className="bg-white"></div>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="rounded bg-green-500 px-5 py-2 text-sm font-bold text-white"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TambahAnggota;
