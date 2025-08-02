'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookByIdFromStrapi, updateBookInStrapi } from '@/lib/constant';

export default function EditBuku() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [book, setBook] = useState({
    id: 0,
    judul: '',
    genre: '',
    penulis: '',
    penerbit: '',
    tahun: '',
    stok: 0,
    gambar: '/next.svg'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      if (id) {
        try {
          setLoading(true);
          const bookData = await getBookByIdFromStrapi(parseInt(id));
          setBook(bookData);
        } catch (err) {
          setError('Gagal memuat data buku dari Strapi');
          console.error('Error loading book:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadBook();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === 'stok' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateBookInStrapi(book.id, book);
      alert('Buku berhasil diubah');
      router.push('/book');
    } catch (err) {
      alert('Gagal mengupdate buku');
      console.error('Error updating book:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[550px] w-full flex-col items-center">
      <h1 className="mb-6 mt-12 rounded-lg bg-blue-800 px-3 py-2 text-center text-4xl font-normal text-white underline">
        Edit Buku
      </h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-4 py-4 text-center">
          <p>Memuat data buku...</p>
        </div>
      )}

      {id ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid grid-cols-2 items-center justify-center gap-y-8 rounded-lg border-2 border-black py-3 pb-8 pr-8 pt-8">
            <div className="text-center">
              <label>Judul Buku</label>
            </div>
            <input
              type="text"
              name="judul"
              value={book.judul}
              onChange={handleChange}
              placeholder="Judul Buku"
              className="items-center rounded-md bg-slate-300 px-5 py-2"
            />

            <div className="text-center">
              <label>Genre</label>
            </div>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="rounded-md bg-slate-300 px-5 py-2"
            />

            <div className="text-center">
              <label>Penulis</label>
            </div>
            <input
              type="text"
              name="penulis"
              value={book.penulis}
              onChange={handleChange}
              placeholder="Penulis"
              className="rounded-md bg-slate-300 px-5 py-2"
            />

            <div className="text-center">
              <label>Penerbit</label>
            </div>
            <input
              type="text"
              name="penerbit"
              value={book.penerbit}
              onChange={handleChange}
              placeholder="Penerbit"
              className="rounded-md bg-slate-300 px-5 py-2"
            />

            <div className="text-center">
              <label>Tahun</label>
            </div>
            <input
              type="text"
              name="tahun"
              value={book.tahun}
              onChange={handleChange}
              placeholder="Tahun"
              className="rounded-md bg-slate-300 px-5 py-2"
            />

            <div className="text-center">
              <label>Stok</label>
            </div>
            <input
              type="number"
              name="stok"
              value={book.stok}
              onChange={handleChange}
              placeholder="Stok"
              className="rounded-md bg-slate-300 px-5 py-2"
            />

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
              <img src={book.gambar} alt="Gambar Buku" />
            </div>

            <div className="flex flex-col space-y-8">
              <button
                type="button"
                className="mx-2 my-1 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-white"
              >
                Pilih Gambar Baru
              </button>
              <div className="mx-auto flex flex-row">
                <button
                  type="submit"
                  className="mx-2 my-1 rounded bg-green-500 px-3 py-1 text-sm font-bold text-white"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  className="mx-2 my-1 rounded bg-red-500 px-3 py-1 text-sm font-bold text-white"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-red-500">ID buku tidak ditemukan!</p>
      )}
    </div>
  );
}
