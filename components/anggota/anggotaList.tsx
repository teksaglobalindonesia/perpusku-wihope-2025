'use client';

import { useState } from 'react';
import { BASE_URL } from '@/lib/constant';

export default function AnggotaList( {members}: {members: any[]} ) {
  // const [anggotaList, setAnggotaList] = useState([
  //   { nama: 'Nama Anggota 1', id: '11111', email: 'anggota1@gmail.com' },
  //   { nama: 'Nama Anggota 2', id: '222222', email: 'anggota2@gmail.com' },
  //   { nama: 'Nama Anggota 3', id: '333333', email: 'anggota3@gmail.com' },
  //   { nama: 'Nama Anggota 4', id: '444444', email: 'anggota4@gmail.com' },
  //   { nama: 'Nama Anggota 5', id: '555555', email: 'anggota5@gmail.com' },
  //   { nama: 'Nama Anggota 6', id: '666666', email: 'anggota6@gmail.com' }
  // ]);

  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // const [showModal, setShowModal] = useState<'add' | 'edit' | 'delete' | null>(
  //   null
  // );
  // const [formData, setFormData] = useState({ nama: '', id: '', email: '' });

  // const openAddModal = () => {
  //   setFormData({ nama: '', id: '', email: '' });
  //   setShowModal('add');
  // };

  // const openEditModal = (index: number) => {
  //   setSelectedIndex(index);
  //   setFormData(anggotaList[index]);
  //   setShowModal('edit');
  // };

  // const openDeleteModal = (index: number) => {
  //   setSelectedIndex(index);
  //   setShowModal('delete');
  // };

  // const closeModal = () => {
  //   setShowModal(null);
  //   setSelectedIndex(null);
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSave = () => {
  //   if (showModal === 'edit' && selectedIndex !== null) {
  //     const updated = [...anggotaList];
  //     updated[selectedIndex] = formData;
  //     setAnggotaList(updated);
  //   } else if (showModal === 'add') {
  //     setAnggotaList([...anggotaList, formData]);
  //   }
  //   closeModal();
  // };

  // const handleDelete = () => {
  //   if (selectedIndex !== null) {
  //     setAnggotaList(anggotaList.filter((_, i) => i !== selectedIndex));
  //   }
  //   closeModal();
  // };

  return (
    <div className="m-4 text-[#DFD0B8]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">👥 Daftar Anggota</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="Cari anggota..."
            className="rounded-lg border border-[#393E46] bg-[#DFD0B8] px-4 py-2 text-black"
          />
          <button
            // onClick={openAddModal}
            className="rounded-lg bg-[#948979] px-5 py-2 text-white hover:bg-[#a69984]"
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {members.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#948979] p-4 text-[#DFD0B8] shadow-md"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>ID: {item.id}</p>
            <p>Email: {item.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                // onClick={() => openEditModal(index)}
                className="rounded bg-blue-500 px-4 py-1 text-sm hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                // onClick={() => openDeleteModal(index)}
                className="rounded bg-red-500 px-4 py-1 text-sm hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="w-[90%] max-w-md rounded-lg bg-[#222831] p-6 text-[#DFD0B8]">
            {showModal === 'delete' ? (
              <>
                <h3 className="mb-4 text-xl font-semibold text-red-400">
                  Hapus Anggota
                </h3>
                <p>
                  Yakin ingin menghapus{' '}
                  <b>{anggotaList[selectedIndex!]?.nama}</b>?
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={closeModal}
                    className="rounded bg-gray-600 px-4 py-1 hover:bg-gray-700"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded bg-red-600 px-4 py-1 hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="mb-4 text-xl font-semibold">
                  {showModal === 'edit' ? 'Edit Anggota' : 'Tambah Anggota'}
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Nama"
                    className="w-full rounded bg-[#393E46] px-3 py-2"
                  />
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="ID"
                    className="w-full rounded bg-[#393E46] px-3 py-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
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
                  <button
                    onClick={handleSave}
                    className="rounded bg-green-600 px-4 py-1 hover:bg-green-700"
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
}
