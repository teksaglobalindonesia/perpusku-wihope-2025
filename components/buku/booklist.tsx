'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BASE_URL } from '@/lib/constant';

export function BookList({ books }: { books: any[] }) {
  // Gunakan data langsung dari props agar selalu sync dengan API
  const API = BASE_URL;
  const bookList = Array.isArray(books) ? books : [];

  // const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showAddModal, setShowAddModal] = useState(false);
  // const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(null);

  // const openEditModal = (index: number) => {
  //   setSelectedBookIndex(index);
  //   setShowEditModal(true);
  // };

  // const openDeleteModal = (index: number) => {
  //   setSelectedBookIndex(index);
  //   setShowDeleteModal(true);
  // };

  // const openAddModal = () => {
  //   setShowAddModal(true);
  // };

  // const closeModal = () => {
  //   setShowEditModal(false);
  //   setShowDeleteModal(false);
  //   setShowAddModal(false);
  //   setSelectedBookIndex(null);
  // };

  return (
    <div className="m-8 text-[#DFD0B8]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📚 Daftar Buku</h2>
        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="Cari buku..."
            className="rounded-lg border border-[#393E46] bg-[#DFD0B8] px-4 py-2 text-black"
          />
          {/* <button
            onClick={openAddModal}
            className="rounded-lg bg-[#948979] px-5 py-2 text-white hover:bg-[#a69984]"
          >
            + Tambah
          </button> */}
        </div>
      </div>

      {/* List Buku */}
      <div className="mt-6 space-y-6">
        {bookList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-[#393E46] px-6 py-4 shadow-md"
          >
            <div className="flex items-center gap-6">
              <div className="h-24 w-16 overflow-hidden rounded-lg bg-[#222831]">
                <Image
                  src={
                    item.cover ? API + item.cover.url : "ha?"
                  }
                  alt={item.cover?.alternativeText || 'Cover Buku'}
                  width={64}
                  height={96}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>

              {/* Info Buku */}
              <div className="flex flex-col gap-1 text-[#DFD0B8]">
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-sm italic">
                  {item.categories?.[0]?.name ?? '-'}
                </div>
                <div className="text-sm">{item.writer}</div>
                <div className="text-xs text-gray-400">
                  {item.publisher} • {item.published_year}
                </div>
              </div>
            </div>

            {/* Stok */}
            <span className="rounded bg-yellow-600 px-3 py-1 text-sm font-bold text-white">
              Stok: {item.stock}
            </span>
          </div>
        ))}
      </div>

      {/* Modal Tambah/Edit */}
      {/* {(showEditModal || showAddModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="w-[90%] max-w-md rounded-lg bg-[#222831] p-6 text-[#DFD0B8]">
            <h3 className="mb-4 text-xl font-semibold">
              {showEditModal ? 'Edit Buku' : 'Tambah Buku'}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                name="judul"
                placeholder="Judul Buku"
                className="w-full rounded bg-[#393E46] px-3 py-2"
              />
              <input
                type="text"
                name="genre"
                placeholder="Genre"
                className="w-full rounded bg-[#393E46] px-3 py-2"
              />
              <input
                type="text"
                name="penulis"
                placeholder="Penulis"
                className="w-full rounded bg-[#393E46] px-3 py-2"
              />
              <input
                type="number"
                name="stok"
                placeholder="Stok"
                className="w-full rounded bg-[#393E46] px-3 py-2"
              />
              <input
                type="text"
                name="img"
                placeholder="URL Gambar"
                className="w-full rounded bg-[#393E46] px-3 py-2"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="rounded bg-gray-600 px-4 py-1 hover:bg-gray-700"
              >
                Batal
              </button>
              <button className="rounded bg-green-600 px-4 py-1 hover:bg-green-700">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Modal Hapus */}
      {/* {showDeleteModal && selectedBookIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="w-[90%] max-w-md rounded-lg bg-[#222831] p-6 text-white">
            <h3 className="mb-4 text-xl font-semibold text-red-400">
              Hapus Buku
            </h3>
            <p>
              Yakin ingin menghapus <b>{bookList[selectedBookIndex].title}</b>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="rounded bg-gray-600 px-4 py-1 hover:bg-gray-700"
              >
                Batal
              </button>
              <button className="rounded bg-red-600 px-4 py-1 hover:bg-red-700">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
