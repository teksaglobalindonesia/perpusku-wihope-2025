'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Pagination from '../pagination';

type BookCategory = {
  id: number;
  documentId: string;
  name: string;
};

type Item = {
  documentId: string;
  id: number;
  title: string;
  writer: string;
  stock: number;
  published_year?: string;
  cover?: {
    url: string;
    name: string;
    width: number;
    height: number;
  };
  publisher: string;
  categories?: BookCategory[];
  book_categories?: BookCategory;
};

type BookProps = {
  filterOutOfStock?: boolean;
};

type EditFormData = {
  title: string;
  writer: string;
  publisher: string;
  published_year: string;
  stock: number;
  categories: string[];
};

const Book: React.FC<BookProps> = ({ filterOutOfStock = false }) => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<BookCategory[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBook, setEditingBook] = useState<Item | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    title: '',
    writer: '',
    publisher: '',
    published_year: '',
    stock: 0,
    categories: []
  });
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const itemsPerPage = 5;

  const handleEdit = (book: Item) => {
    setEditingBook(book);
    setEditFormData({
      title: book.title,
      writer: book.writer,
      publisher: book.publisher,
      published_year: book.published_year || '',
      stock: book.stock,
      categories: book.categories?.map((cat) => cat.documentId) || []
    });
    setEditCoverFile(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    setIsEditLoading(true);
    try {
      const formData = new FormData();

      if (editCoverFile) {
        formData.append('files.cover', editCoverFile);
      }

      formData.append('documentId', editingBook.documentId);
      formData.append(
        'data',
        JSON.stringify({
          title: editFormData.title,
          writer: editFormData.writer,
          publisher: editFormData.publisher,
          published_year: editFormData.published_year,
          stock: editFormData.stock,
          categories:
            editFormData.categories.length > 0
              ? editFormData.categories
              : undefined
        })
      );

      const response = await fetch(`${BASE_URL}/api/book/edit`, {
        method: 'PATCH',
        headers: {
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Gagal mengupdate buku');
      }

      const updatedBook = await response.json();

      // Update local state
      setAllItems((prev) =>
        prev.map((book) =>
          book.documentId === editingBook.documentId
            ? {
                ...book,
                ...editFormData,
                categories: categories.filter((cat) =>
                  editFormData.categories.includes(cat.documentId)
                )
              }
            : book
        )
      );

      setEditingBook(null);
      alert('✅ Buku berhasil diupdate!');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Terjadi kesalahan saat mengupdate buku');
    } finally {
      setIsEditLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setEditFormData({
      title: '',
      writer: '',
      publisher: '',
      published_year: '',
      stock: 0,
      categories: []
    });
    setEditCoverFile(null);
  };

  const handleDelete = async (documentId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/book/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify({
          documentId: documentId
        }),
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus buku');
      }

      setAllItems((prev) =>
        prev.filter((buku) => buku.documentId !== documentId)
      );

      alert('✅ Buku berhasil dihapus!');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Terjadi kesalahan saat menghapus');
    }
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);

        const catRes = await fetch(`${BASE_URL}/api/book-category/list`, {
          headers: {
            Authorization: TOKEN,
            'Content-Type': 'application/json',
            'x-wihope-name': WIHOPE_NAME
          }
        });
        const catData = await catRes.json();
        setCategories(catData.data || []);

        let page = 1;
        let books: Item[] = [];
        let totalPages = 1;

        do {
          const bookRes = await fetch(
            `${BASE_URL}/api/book/list?page=${page}`,
            {
              headers: {
                Authorization: TOKEN,
                'Content-Type': 'application/json',
                'x-wihope-name': WIHOPE_NAME
              }
            }
          );
          const bookData = await bookRes.json();
          books = books.concat(bookData.data || []);
          totalPages = bookData.meta?.pagination?.page_count || 1;
          page++;
        } while (page <= totalPages);

        setAllItems(books);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  const getCategoryName = (buku: Item) => {
    const category = buku.categories?.[0] || buku.book_categories;
    return category?.name || 'Belum dikategorikan';
  };

  const filteredItems = allItems.filter((buku) => {
    const q = keyword.toLowerCase();
    const matchesKeyword =
      buku.title.toLowerCase().includes(q) ||
      buku.writer.toLowerCase().includes(q) ||
      buku.publisher.toLowerCase().includes(q) ||
      buku.published_year?.includes(q) ||
      getCategoryName(buku).toLowerCase().includes(q);

    const matchesStock = filterOutOfStock ? buku.stock === 0 : true;

    return matchesKeyword && matchesStock;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-[540px] w-full">
      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Edit Buku</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Judul
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      title: e.target.value
                    }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Penulis
                </label>
                <input
                  type="text"
                  value={editFormData.writer}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      writer: e.target.value
                    }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Penerbit
                </label>
                <input
                  type="text"
                  value={editFormData.publisher}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      publisher: e.target.value
                    }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tahun Terbit
                </label>
                <input
                  type="text"
                  value={editFormData.published_year}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      published_year: e.target.value
                    }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stok
                </label>
                <input
                  type="number"
                  value={editFormData.stock}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      stock: parseInt(e.target.value) || 0
                    }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kategori
                </label>
                <select
                  multiple
                  value={editFormData.categories}
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setEditFormData((prev) => ({
                      ...prev,
                      categories: selectedOptions
                    }));
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.documentId}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Tahan Ctrl/Cmd untuk memilih multiple kategori
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover Baru (opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditCoverFile(e.target.files?.[0] || null)
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                  disabled={isEditLoading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={isEditLoading}
                >
                  {isEditLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-row justify-between p-4 px-9 font-light">
        <div className="mr-14 flex justify-end">
          <input
            type="text"
            placeholder="Search by title, writer, or category..."
            className="mb-2 ml-2 w-64 rounded border px-3 py-1"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="flex justify-start">
          {!filterOutOfStock && (
            <Link href="/book/add">
              <button className="text-md ml-4 rounded-md bg-green-400 px-2 py-1 font-bold text-gray-700 hover:bg-green-300">
                Tambahkan Buku
              </button>
            </Link>
          )}
        </div>
      </div>

      {error && (
        <div className="mx-8 mb-4 rounded-md border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="mx-8 mb-4 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <p>Memuat data buku dan kategori dari server...</p>
          </div>
        </div>
      ) : (
        <div className="mx-8 mb-8 space-y-6 rounded-md p-4">
          {paginatedItems.length > 0 ? (
            <div className="space-y-4">
              {paginatedItems.map((buku) => (
                <div
                  key={buku.documentId}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-950 bg-blue-100 p-2">
                      {buku.cover?.url && (
                        <Image
                          src={`${BASE_URL}${buku.cover.url}`}
                          alt={buku.title}
                          width={100}
                          height={150}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-semibold">
                        {buku.title}
                      </h3>
                      <div className="mb-2 flex flex-wrap gap-1">
                        {(buku.categories || [buku.book_categories]).map(
                          (cat, i) =>
                            cat ? (
                              <span
                                key={cat.id || i}
                                className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
                              >
                                📂 {cat.name}
                              </span>
                            ) : null
                        )}
                      </div>
                      <p className="mb-1 text-sm">
                        <span className="font-medium">Penulis:</span>{' '}
                        {buku.writer}
                      </p>
                      <p className="mb-1 text-sm ">
                        <span className="font-medium">Penerbit:</span>{' '}
                        {buku.publisher}
                      </p>
                      <p className="mb-4 text-sm">
                        <span className="font-medium">Tahun Terbit:</span>{' '}
                        {buku.published_year}
                      </p>
                      <button
                        onClick={() => handleEdit(buku)}
                        className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(buku.documentId)}
                        className="ml-2 rounded-lg bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                      >
                        🗑️Hapus
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    {buku.stock > 0 ? (
                      <div className="text-green-600">
                        <p className="text-lg font-semibold">{buku.stock}</p>
                        <p className="text-sm">tersedia</p>
                      </div>
                    ) : (
                      <span className="rounded-lg bg-red-500 px-3 py-2 text-sm font-bold text-white">
                        HABIS
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <div className="mb-4 text-6xl">📚</div>
              <p className="mb-2 text-lg font-medium">
                {keyword || filterOutOfStock
                  ? 'Tidak ada hasil ditemukan'
                  : 'Belum ada data buku'}
              </p>
              {!keyword && !filterOutOfStock && (
                <Link href="/book/add">
                  <button className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                    Tambahkan Buku Pertama
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Book;
