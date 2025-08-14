'use client';

import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  documentId: string;
  name: string;
}

interface FormData {
  judul: string;
  penulis: string;
  penerbit: string;
  tahunTerbit: string;
  stok: number;
}

export const BForm = () => {
  const [formData, setFormData] = useState<FormData>({
    judul: '',
    penulis: '',
    penerbit: '',
    tahunTerbit: '',
    stok: 0
  });
  const [cover, setCover] = useState<File | null>(null);
  const [kategori, setKategori] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchConfig = {
    headers: { Authorization: TOKEN, 'x-wihope-name': WIHOPE_NAME },
    cache: 'no-store' as const
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/book-category/list`,
        fetchConfig
      );
      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
      const { data } = await res.json();
      setCategoriesList(data || []);
    } catch {
      setMessage('Gagal memuat kategori.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stok' ? Number(value) : value
    }));
  };

  const handleKategoriChange = (documentId: string) => {
    setKategori((prev) =>
      prev.includes(documentId)
        ? prev.filter((id) => id !== documentId)
        : [...prev, documentId]
    );
  };

  const handleAddCategory = async () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      setMessage('Nama kategori tidak boleh kosong.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/book-category/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...fetchConfig.headers },
        body: JSON.stringify({ data: { name: trimmed } })
      });
      if (!res.ok) throw new Error(`Failed to add category: ${res.status}`);
      setMessage('Kategori berhasil ditambahkan!');
      setNewCategoryName('');
      setShowAddCategory(false);
      await fetchCategories();
    } catch {
      setMessage('Gagal menambah kategori.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cover) {
      setMessage('Cover buku belum dipilih!');
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('cover', cover);
    formDataToSend.append(
      'data',
      JSON.stringify({
        title: formData.judul,
        writer: formData.penulis,
        publisher: formData.penerbit,
        published_year: formData.tahunTerbit,
        stock: formData.stok,
        categories: kategori
      })
    );

    try {
      const res = await fetch(`${BASE_URL}/api/book/add`, {
        method: 'POST',
        headers: fetchConfig.headers,
        body: formDataToSend
      });
      const result = await res.json();
      if (res.ok) {
        setMessage('Buku berhasil ditambahkan!');
        setFormData({
          judul: '',
          penulis: '',
          penerbit: '',
          tahunTerbit: '',
          stok: 0
        });
        setCover(null);
        setKategori([]);
      } else {
        setMessage(`Gagal: ${result.message || 'Terjadi kesalahan'}`);
      }
    } catch {
      setMessage('Gagal mengirim data.');
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { label: 'Judul', name: 'judul', type: 'text' },
    { label: 'Penulis', name: 'penulis', type: 'text' },
    { label: 'Penerbit', name: 'penerbit', type: 'text' },
    { label: 'Tahun Terbit', name: 'tahunTerbit', type: 'number' },
    { label: 'Stok', name: 'stok', type: 'number' }
  ];

  return (
    <div className="w-full rounded-xl border border-vintage-sage bg-vintage-parchment p-8 font-vintage shadow-lg backdrop-blur-sm">
      <div className="relative mb-8">
        <div className="absolute -left-2 top-0 h-full w-1 rounded-full bg-vintage-terracotta"></div>
        <h1 className="pl-4 text-3xl font-medium text-vintage-brown">
          <span className="mr-3 text-4xl text-vintage-terracotta">📚</span>
          Tambah Buku Baru
        </h1>
        <p className="mt-1 pl-12 text-sm italic text-beige-700">
          Lengkapi data buku dan kategori untuk menambahkan koleksi baru
        </p>
      </div>

      {message && (
        <div
          className={`mb-6 rounded border p-3 ${
            message.includes('berhasil')
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          } text-sm`}
          aria-live="polite"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inputFields.map(({ label, name, type }) => (
            <div key={name} className="space-y-2">
              <label className="text-sm font-medium tracking-wide text-beige-800">
                {label} <span className="text-vintage-terracotta">*</span>
              </label>
              <input
                name={name}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
                type={type}
                min={
                  name === 'stok' || name === 'tahunTerbit' ? '0' : undefined
                }
                className="w-full rounded-lg border-2 border-beige-200 bg-white/80 px-4 py-2.5 text-beige-900 
                            transition-all duration-200 placeholder:text-beige-400 
                            focus:border-vintage-sage focus:outline-none focus:ring-2 focus:ring-vintage-sage/30"
                placeholder={`Masukkan ${label.toLowerCase()}`}
                required
              />
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide text-beige-800">
              Cover Buku <span className="text-vintage-terracotta">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
              className="w-full rounded-lg border-2 border-beige-200 bg-white/80 px-4 py-2 text-beige-900
                          transition-all file:mr-2 file:rounded file:bg-vintage-sage file:px-3 
                          file:py-1 file:text-sm file:text-white
                          hover:file:bg-vintage-sage/90 focus:outline-none focus:ring-2 focus:ring-vintage-sage/50"
            />
          </div>
        </div>

        <div className="rounded-xl border-2 border-vintage-sage/30 bg-white/60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-medium text-vintage-brown">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-vintage-terracotta"></span>
              Kategori
            </h3>
            <button
              type="button"
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="flex items-center gap-1 text-sm font-medium text-vintage-terracotta transition-colors hover:text-vintage-terracotta/80 focus:outline-none"
            >
              <span className="text-lg">+</span> Tambah Kategori
            </button>
          </div>

          {showAddCategory && (
            <div className="mb-5 rounded-lg border border-vintage-sage/40 bg-vintage-parchment p-4 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Masukkan nama kategori baru..."
                  className="flex-1 rounded border border-beige-300 px-3 py-2.5 text-sm 
                              placeholder:text-beige-400 focus:outline-none focus:ring-2 focus:ring-vintage-sage/50"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    disabled={loading}
                    className={`rounded bg-vintage-terracotta px-4 py-2.5 text-sm font-medium text-white 
                                transition-colors ${
                                  loading
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'hover:bg-vintage-terracotta/90'
                                }`}
                  >
                    {loading ? 'Menambahkan...' : 'Tambah'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategoryName('');
                    }}
                    className="rounded bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {categoriesList.length > 0 ? (
              categoriesList.map((cat) => (
                <div key={cat.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`kategori-${cat.id}`}
                    checked={kategori.includes(cat.documentId)}
                    onChange={() => handleKategoriChange(cat.documentId)}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`kategori-${cat.id}`}
                    className="cursor-pointer select-none rounded-full border border-beige-300 
                                px-4 py-2 text-sm text-beige-700 transition-all duration-150
                                hover:bg-beige-50 peer-checked:border-vintage-terracotta 
                                peer-checked:bg-vintage-terracotta/10 peer-checked:text-vintage-terracotta"
                  >
                    {cat.name}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm italic text-beige-500">
                Belum ada kategori tersedia.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`rounded-xl px-7 py-3 text-sm font-medium text-white shadow-md transition-all duration-200
                          ${
                            loading
                              ? 'cursor-not-allowed bg-gray-400'
                              : 'active:scale-99 bg-vintage-terracotta hover:bg-vintage-terracotta/90'
                          } 
                        focus:outline-none focus:ring-2 focus:ring-vintage-terracotta/50 focus:ring-offset-2`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Menyimpan...
              </span>
            ) : (
              'Tambah Buku'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};