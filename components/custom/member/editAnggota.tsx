'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const initialMember = [
  { nama: 'Joh', noAnggota: '12345', email: 'john@yahodie.com' },
  { nama: 'Jane', noAnggota: '67890', email: 'jennie@gmail.com' },
  { nama: 'Doe', noAnggota: '54321', email: 'dodo@gmail.com' }
];

const EditAnggota = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [data, setData] = useState({
    nama: '',
    noAnggota: '',
    email: ''
  });

  useEffect(() => {
    if (id) {
      const found = initialMember.find((m) => m.noAnggota === id);
      if (found) setData(found);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Data disimpan: ${JSON.stringify(data, null, 2)}`);
  };

  if (!id) {
    return (
      <p className="p-6 text-center text-red-600">❌ ID tidak ditemukan.</p>
    );
  }

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-yellow-500 px-3 py-1 text-center text-4xl font-normal text-gray-200 underline">
        Edit Anggota
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-6 rounded-lg border-2 border-black px-8 py-8">
          <div className="text-center">
            <label>Nama:</label>
          </div>
          <input
            name="nama"
            value={data.nama}
            onChange={handleChange}
            type="text"
            placeholder="Nama Anggota"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="text-center">
            <label>No Anggota:</label>
          </div>
          <input
            name="noAnggota"
            value={data.noAnggota}
            onChange={handleChange}
            type="text"
            className="rounded-md bg-slate-300 px-5 py-2"
            disabled
          />

          <div className="text-center">
            <label>Email:</label>
          </div>
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="col-span-2 mt-4 text-center">
            <button
              type="submit"
              className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-500"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAnggota;
