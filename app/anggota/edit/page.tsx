'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

const EditAnggota = () => {
  const { id } = useParams(); // ambil documentId dari URL
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    id_member: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil data anggota existing
  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/member/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          body: JSON.stringify({ documentId: id })
        });

        if (!res.ok) throw new Error('Gagal mengambil data anggota');
        const data = await res.json();

        if (data?.data) {
          setForm({
            name: data.data.name || '',
            email: data.data.email || '',
            address: data.data.address || '',
            id_member: data.data.id_member || ''
          });
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAnggota();
  }, [id]);

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
      const response = await fetch(`${BASE_URL}/api/member/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify({
          documentId: id, // kirim documentId ke backend
          data: form
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData?.error?.message || 'Gagal mengupdate anggota'
        );
      }

      setSuccess('✅ Anggota berhasil diperbarui!');
      setError(null);

      // redirect balik ke halaman daftar
      setTimeout(() => {
        router.push('/anggota');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat update anggota');
      setSuccess(null);
    }
  };

  if (loading) return <p>⏳ Loading data...</p>;

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-yellow-500 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Edit Anggota
      </h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
          <div className="text-center">
            <label>Nomor Anggota</label>
          </div>
          <input
            type="text"
            name="id_member"
            value={form.id_member}
            onChange={handleChange}
            placeholder="Nomor Anggota"
            className="items-center rounded-md bg-slate-300 px-5 py-2"
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
            className="rounded-md bg-slate-300 px-5 py-2"
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
            className="rounded-md bg-slate-300 px-5 py-2"
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
            className="rounded-md bg-slate-300 px-5 py-2"
          />

          <div className="bg-white"></div>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-2 text-sm font-bold text-white"
            >
              💾 Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAnggota;
