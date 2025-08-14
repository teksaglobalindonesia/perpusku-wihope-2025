'use client';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { useEffect, useState } from 'react';

export const MEdit = ({ id }: { id: string }) => {
  const [formData, setFormData] = useState({
    id_member: '',
    name: '',
    email: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/member/detail?id=${id}`, {
          headers: {
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME,
          },
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Response is not JSON');
        }

        const data = await res.json();
        setFormData({
          id_member: data.id_member || '',
          name: data.name || '',
          email: data.email || '',
          address: data.address || '',
        });
      } catch (error) {
        setMessage('❌ Gagal muat data: Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const res = await fetch(`${BASE_URL}/api/member/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME,
        },
        body: JSON.stringify({
          documentId: id,
          data: {
            id_member: formData.id_member,
            name: formData.name,
            email: formData.email,
            address: formData.address,
          },
        }),
        cache: 'no-store',
      });

      const contentType = res.headers.get('content-type');
      const text = await res.text();
      const result = contentType?.includes('application/json') ? JSON.parse(text) : { message: text };

      if (res.ok) {
        setMessage('✅ Member berhasil diperbarui!');
      } else {
        setMessage(`❌ Gagal: ${result.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      setMessage('⚠️ Error: Tidak dapat menyimpan perubahan');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="text-lg text-vintage-brown">Sabar, loading data....</div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-beige-50 p-6 font-vintage shadow-lg shadow-beige-200/50 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-beige-200 pb-6">
        <h1 className="text-2xl font-bold text-vintage-brown">Edit Informasi Member</h1>
        <div className="h-2 w-16 rounded-full bg-vintage-sage/30"></div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 rounded border p-3 text-sm ${
            message.includes('✅')
              ? 'border-green-200 bg-green-50 text-green-700'
              : message.includes('❌')
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-yellow-200 bg-yellow-50 text-yellow-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: 'Nomor', name: 'id_member', type: 'text' },
            { label: 'Nama', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Alamat', name: 'address', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} className="group relative">
              <label className="mb-1 block text-sm font-medium text-beige-700">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-beige-900 transition-all focus:border-vintage-sage focus:ring-2 focus:ring-vintage-sage/30"
                placeholder={`Masukkan ${label.toLowerCase()}`}
                required
              />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-vintage-sage transition-all duration-300 group-focus-within:w-full"></div>
            </div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="rounded-lg border border-beige-300 bg-white px-6 py-2.5 text-sm font-medium text-beige-700 transition-colors hover:bg-beige-100"
          >
            Hapus
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-vintage-sage px-6 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-vintage-sage/90 disabled:opacity-70"
          >
            {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
};