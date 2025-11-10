'use client';

import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { useState } from 'react';

export const MCreate = () => {
  const [formData, setFormData] = useState({
    id_member: '',
    name: '',
    email: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${BASE_URL}/api/member/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name':WIHOPE_NAME ,
        },
        body: JSON.stringify({ data: formData }),
        cache: 'no-store',
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Anggota berhasil ditambahkan!');
        setFormData({ id_member: '', name: '', email: '', address: '' }); // reset form
      } else {
        setMessage(`Gagal: ${result.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      setMessage('Terjadi kesalahan saat mengirim data.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-vintage-parchment border-vintage-sage border p-8 font-vintage shadow-lg backdrop-blur-xl">
      <div className="mb-8 relative">
        <div className="absolute -left-2 top-0 h-full w-1 bg-vintage-terracotta rounded-full"></div>
        <h1 className="text-3xl font-medium text-vintage-brown pl-4">
          <span className="mr-3 text-vintage-terracotta text-4xl">✎</span> 
          Tambah Anggota
        </h1>
        <p className="text-beige-700 pl-12 mt-1 text-sm italic">Lengkapi data anggota baru</p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('berhasil') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          

          {[
            { label: 'UID', name: 'id_member', type: 'text' },
            { label: 'Nama', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Alamat', name: 'address', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} className="space-y-2">
              <label className="text-sm font-medium text-beige-800 tracking-wide">
                {label} <span className="text-vintage-terracotta">*</span>
              </label>
              <input
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                type={type}
                className="w-full rounded-lg border-2 border-beige-200 bg-white/80 px-4 py-2.5 text-beige-900 
                           placeholder-beige-300 focus:border-vintage-sage focus:outline-none 
                           focus:ring-2 focus:ring-vintage-sage/30 transition-all duration-200"
                placeholder={`Masukkan ${label.toLowerCase()}`}
                required
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`rounded-xl px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200
                       ${loading ? 'bg-gray-400' : 'bg-vintage-terracotta hover:bg-vintage-terracotta/90'} 
                       focus:outline-none focus:ring-2 focus:ring-vintage-terracotta/50 focus:ring-offset-2`}
          >
            {loading ? 'Menyimpan...' : 'Simpan Anggota'}
          </button>
        </div>
      </form>
    </div>
  );
};