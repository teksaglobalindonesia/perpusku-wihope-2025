'use client';

import { useState, useEffect } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

export default function AnggotaList() {
  const [anggotaList, setAnggotaList] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<'add' | 'edit' | 'delete' | null>(
    null
  );
  const [formData, setFormData] = useState<{
    name: string;
    id_member: string;
    email: string;
    address: string;
  }>({ name: '', id_member: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // jumlah item per halaman

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/member/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        cache: 'no-store'
      });
      if (!res.ok) throw new Error('Gagal mengambil data anggota');
      const data = await res.json();
      setAnggotaList(data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openAddModal = () => {
    setFormData({ name: '', id_member: '', email: '', address: '' });
    setShowModal('add');
  };

  const openEditModal = (index: number) => {
    setSelectedIndex(index + (currentPage - 1) * itemsPerPage); // offset untuk pagination
    setFormData(anggotaList[index + (currentPage - 1) * itemsPerPage]);
    setShowModal('edit');
  };

  const openDeleteModal = (index: number) => {
    setSelectedIndex(index + (currentPage - 1) * itemsPerPage);
    setShowModal('delete');
  };

  const closeModal = () => {
    setShowModal(null);
    setSelectedIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (showModal === 'edit' && selectedIndex !== null) {
        await fetch(`${BASE_URL}/api/member/update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else if (showModal === 'add') {
        await fetch(`${BASE_URL}/api/member/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      await fetchMembers();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (selectedIndex === null) return;
    try {
      const anggota = anggotaList[selectedIndex];
      await fetch(`${BASE_URL}/api/member/delete/${anggota.id}`, {
        method: 'DELETE'
      });
      await fetchMembers();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(anggotaList.length / itemsPerPage);
  const paginatedData = anggotaList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            onClick={openAddModal}
            className="rounded-lg bg-[#948979] px-5 py-2 text-white hover:bg-[#a69984]"
          >
            + Tambah
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          paginatedData.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-xl bg-[#948979] p-4 text-[#DFD0B8] shadow-md"
            >
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>ID: {item.id_member}</p>
              <p>Email: {item.email}</p>
              <p>Alamat: {item.address}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => openEditModal(idx)}
                  className="rounded bg-blue-500 px-4 py-1 text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(idx)}
                  className="rounded bg-red-500 px-4 py-1 text-sm hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Buttons */}
      {!loading && anggotaList.length > itemsPerPage && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-[#948979] text-white'
                  : 'bg-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-600 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="w-[90%] max-w-md rounded-lg bg-[#222831] p-6 text-[#DFD0B8]">
            {showModal === 'delete' ? (
              <>
                <h3 className="mb-4 text-xl font-semibold text-red-400">
                  Hapus Anggota
                </h3>
                <p>
                  Yakin ingin menghapus{' '}
                  <b>{anggotaList[selectedIndex!]?.name}</b>?
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
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama"
                    className="w-full rounded bg-[#393E46] px-3 py-2"
                  />
                  <input
                    type="text"
                    name="id_member"
                    value={formData.id_member}
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
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
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
      )}
    </div>
  );
}
  