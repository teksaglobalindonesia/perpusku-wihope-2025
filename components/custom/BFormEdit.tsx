'use client';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { useEffect, useState, useRef } from 'react';

export const BFormEdit = ({ id }: { id: string }) => {
  const [formData, setFormData] = useState({
    judul: '', penulis: '', penerbit: '', tahunTerbit: '', stok: ''
  });
  const [kategori, setKategori] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<{ documentId: string; name: string }[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loadingNewCategory, setLoadingNewCategory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchConfig = {
          headers: { Authorization: TOKEN, 'x-wihope-name': WIHOPE_NAME },
          cache: 'no-store' as const
        };

        const [res, catRes] = await Promise.all([
          fetch(`${BASE_URL}/api/book/detail?id=${id}`, fetchConfig),
          fetch(`${BASE_URL}/api/book-category/list?page_size=99`, fetchConfig)
        ]);

        if (!res.ok) throw new Error('Gagal ambil data buku');
        if (!catRes.ok) throw new Error('Gagal ambil kategori');

        const [bookData, catData] = await Promise.all([res.json(), catRes.json()])  ;

        setFormData({
          judul: bookData.title || '',
          penulis: bookData.writer || '',
          penerbit: bookData.publisher || '',
          tahunTerbit: bookData.published_year || '',
          stok: String(bookData.stock || '')
        });

        setKategori(bookData.categories?.map((c: any) => c.documentId) || []);
        setCategoriesList(catData.data || []);
        setLoading(false);
      } catch (error: any) {
        setMessage(`Error: ${error.message}`);
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) {
      setMessage('⚠️ Nama kategori tidak boleh kosong');
      return;
    }

    setLoadingNewCategory(true);
    try {
      const response = await fetch(`${BASE_URL}/api/book-category/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify({ data: { name: newCategoryName.trim() } })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      const categoryData = result.data || result;
      
      if (categoryData?.documentId && categoryData?.name) {
        setCategoriesList(prev => [...prev, { 
          documentId: categoryData.documentId, 
          name: categoryData.name 
        }]);
        setNewCategoryName('');
        setIsAddingCategory(false);
        setMessage('✅ Kategori berhasil ditambahkan');
      } else {
        throw new Error('Struktur data tidak sesuai: ' + JSON.stringify(result));
      }
    } catch (error: any) {
      setMessage(`❌ Gagal menambahkan kategori: ${error.message}`);
    } finally {
      setLoadingNewCategory(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setCover(file);
    }
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setCover(null);
    setCoverPreview(null);
  };

  const handleKategoriChange = (documentId: string) => {
    setKategori(prev => prev.includes(documentId)
      ? prev.filter(id => id !== documentId)
      : [...prev, documentId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const payload = new FormData();
      payload.append('documentId', id);
      payload.append('data', JSON.stringify({
        title: formData.judul,
        writer: formData.penulis,
        publisher: formData.penerbit,
        published_year: formData.tahunTerbit,
        stock: parseInt(formData.stok) || 0,
        categories: kategori
      }));
      if (cover) payload.append('cover', cover);

      const res = await fetch(`${BASE_URL}/api/book/edit`, {
        method: 'PATCH',
        headers: { Authorization: TOKEN, 'x-wihope-name': WIHOPE_NAME },
        body: payload,
        cache: 'no-store'
      });

      const result = await res.json();
      setMessage(res.ok ? '✅ Buku berhasil diperbarui!' : `❌ Gagal: ${result.message}`);
    } catch (error: any) {
      setMessage(`⚠️ Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="p-8 text-center">
      <div className="text-lg text-vintage-brown">Sabar, loading data....</div>
    </div>
  );

  return (
    <div className="w-full rounded-xl bg-beige-50 p-6 font-vintage shadow-lg shadow-beige-200/50 md:p-8">
      <div className="mb-8 flex items-center justify-between border-b border-beige-200 pb-6">
        <h1 className="text-2xl font-bold text-vintage-brown">Edit Informasi Buku</h1>
        <div className="h-2 w-16 rounded-full bg-vintage-sage/30"></div>
      </div>

      {message && (
        <div className={`mb-6 rounded border p-3 text-sm ${
          message.includes('✅') ? 'border-green-200 bg-green-50 text-green-700' :
          message.includes('❌') ? 'border-red-200 bg-red-50 text-red-700' :
          'border-yellow-200 bg-yellow-50 text-yellow-700'
        }`}>{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: 'Judul', name: 'judul', type: 'text' },
            { label: 'Penulis', name: 'penulis', type: 'text' },
            { label: 'Penerbit', name: 'penerbit', type: 'text' }
          ].map(({ label, name, type }) => (
            <div key={name} className="group relative">
              <label className="mb-1 block text-sm font-medium text-beige-700">{label}</label>
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

          <div className="group relative">
            <label className="mb-1 block text-sm font-medium text-beige-700">Tahun Terbit</label>
            <input
              type="number"
              name="tahunTerbit"
              value={formData.tahunTerbit}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-beige-900 transition-all focus:border-vintage-sage focus:ring-2 focus:ring-vintage-sage/30"
              required
            />
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-vintage-sage transition-all duration-300 group-focus-within:w-full"></div>
          </div>
        </div>

        <div className="rounded-xl border border-beige-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-beige-800">Kategori</h3>
            {!isAddingCategory && (
              <button
                type="button"
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center gap-1 rounded-full bg-beige-100 px-4 py-2 text-sm font-medium text-beige-700 transition-colors hover:bg-beige-200"
              >
                <span>+</span> Tambah Kategori
              </button>
            )}
          </div>

          {isAddingCategory && (
            <div className="mt-4 rounded-lg border border-beige-200 bg-beige-50 p-4">
              <label className="mb-2 block text-sm font-medium text-beige-700">Nama Kategori Baru</label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Misal: Fiksi Ilmiah"
                className="w-full rounded border border-beige-300 bg-white px-3 py-2 text-sm focus:border-vintage-sage focus:ring-1 focus:ring-vintage-sage"
              />
              <p className="mt-2 text-xs text-beige-500">Tekan Tambah untuk menyimpan kategori baru.</p>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAddingCategory(false); setNewCategoryName(''); }}
                  disabled={loadingNewCategory}
                  className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-300 disabled:opacity-60"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  disabled={loadingNewCategory || !newCategoryName.trim()}
                  className="rounded bg-vintage-sage px-3 py-1 text-sm text-white transition hover:bg-vintage-sage/90 disabled:opacity-60"
                >
                  {loadingNewCategory ? 'Menyimpan...' : 'Tambah'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            {categoriesList.map((cat) => (
              <div key={cat.documentId} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cat-${cat.documentId}`}
                  checked={kategori.includes(cat.documentId)}
                  onChange={() => handleKategoriChange(cat.documentId)}
                  className="peer hidden"
                />
                <label
                  htmlFor={`cat-${cat.documentId}`}
                  className="cursor-pointer select-none rounded-full border border-beige-300 px-4 py-2 text-sm text-beige-700 transition-all peer-checked:border-vintage-sage peer-checked:bg-vintage-sage/10 peer-checked:text-vintage-sage"
                >
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative">
            <label className="mb-1 block text-sm font-medium text-beige-700">Jumlah Stok</label>
            <div className="relative">
              <input
                type="number"
                name="stok"
                value={formData.stok}
                onChange={handleChange}
                min="0"
                className="w-full rounded-lg border border-beige-300 bg-white px-4 py-3 text-beige-900 transition-all focus:border-vintage-sage focus:ring-2 focus:ring-vintage-sage/30"
                required
              />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-sm text-beige-500">buku</div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-vintage-sage transition-all duration-300 group-focus-within:w-full"></div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-beige-700">Cover Buku</label>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-dashed border-beige-300 bg-beige-100">
                {coverPreview ? (
                  <>
                    <img src={coverPreview} alt="Preview cover" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md hover:bg-red-600"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl text-beige-400">+</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="cover-upload"
                  className="inline-block cursor-pointer rounded-lg bg-beige-100 px-4 py-2 text-sm font-medium text-beige-700 transition-colors hover:bg-beige-200"
                >
                  Pilih Gambar
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="cover-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="mt-1 text-xs text-beige-500">Format: JPG, PNG (max 2MB)</p>
              </div>
            </div>
          </div>
        </div>

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