'use client';

import React, { useState, useEffect } from 'react';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Pagination from '../pagination';
import Link from 'next/link';

type Members = {
  name: string;
  email: string;
  address: string;
  id_member: string;
  documentId: string;
};

const Anggota = () => {
  const [members, setMembers] = useState<Members[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Members>>({});
  const [editLoading, setEditLoading] = useState(false);

  const handleDelete = async (documentId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/member/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify({ documentId }),
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus Anggota');
      }

      alert('✅ Anggota berhasil dihapus!');
      setMembers((prev) => prev.filter((m) => m.documentId !== documentId));
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(err.message || 'Terjadi kesalahan saat menghapus');
    }
  };

  const handleEditClick = (anggota: Members) => {
    setEditingId(anggota.documentId);
    setEditForm({
      name: anggota.name,
      email: anggota.email,
      address: anggota.address,
      id_member: anggota.id_member
    });
  };

  const handleEditChange = (field: keyof Members, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async (documentId: string) => {
    // Validasi input
    if (!editForm.name?.trim() || !editForm.email?.trim()) {
      alert('Nama dan email harus diisi!');
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      alert('Format email tidak valid!');
      return;
    }

    setEditLoading(true);
    try {
      const payload = {
        documentId,
        data: {
          name: editForm.name?.trim(),
          email: editForm.email?.trim(),
          address: editForm.address?.trim() || '',
          id_member: editForm.id_member // Biasanya id_member tidak diubah
        }
      };

      console.log('=== DEBUGGING EDIT REQUEST ===');
      console.log('Sending payload:', payload);
      console.log('BASE_URL:', BASE_URL);
      console.log('TOKEN:', TOKEN);
      console.log('WIHOPE_NAME:', WIHOPE_NAME);

      const response = await fetch(`${BASE_URL}/api/member/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });

      console.log('Response status:', response.status);
      console.log(
        'Response headers:',
        Object.fromEntries(response.headers.entries())
      );

      // Clone response untuk bisa dibaca multiple kali
      const responseClone = response.clone();
      const responseText = await responseClone.text();
      console.log('Raw response text:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { message: responseText };
        }
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Gagal menyimpan perubahan');
      }

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.warn('Response bukan JSON valid:', responseText);
        responseData = { message: responseText };
      }

      console.log('Parsed response data:', responseData);

      // ⚠️ PENTING: Jangan update UI state dulu, tunggu verifikasi dari server
      // Refresh data dari server untuk memastikan perubahan tersimpan
      console.log('Verifying data saved by refetching from server...');

      // Fetch ulang data member yang baru saja diedit untuk verifikasi
      const verifyResponse = await fetch(`${BASE_URL}/api/member/list?page=1`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        cache: 'no-store'
      });

      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        const updatedMember = verifyData.data?.find(
          (m: Members) => m.documentId === documentId
        );

        if (updatedMember) {
          console.log('Verified updated member from server:', updatedMember);

          // Update hanya jika data benar-benar berubah di server
          if (
            updatedMember.name === editForm.name?.trim() &&
            updatedMember.email === editForm.email?.trim()
          ) {
            // Update state dengan data dari server (source of truth)
            setMembers((prev) =>
              prev.map((m) => (m.documentId === documentId ? updatedMember : m))
            );

            setEditingId(null);
            setEditForm({});
            alert('✅ Data anggota berhasil diperbarui dan terverifikasi!');
          } else {
            console.error('Data tidak tersimpan di server!');
            console.log('Expected:', {
              name: editForm.name?.trim(),
              email: editForm.email?.trim()
            });
            console.log('Got from server:', {
              name: updatedMember.name,
              email: updatedMember.email
            });

            // Tampilkan error detail dan suggest action
            alert(
              `❌ BACKEND ERROR: Perubahan tidak tersimpan di database!\n\n` +
                `Yang diharapkan: ${editForm.name?.trim()}\n` +
                `Yang tersimpan: ${updatedMember.name}\n\n` +
                `Silakan hubungi developer untuk memperbaiki API backend.`
            );

            // Reset form tapi jangan update state UI
            setEditingId(null);
            setEditForm({});
          }
        } else {
          console.error('Member tidak ditemukan setelah update');
          alert(
            '⚠️ Terjadi error saat verifikasi data. Silakan refresh halaman.'
          );
        }
      } else {
        console.warn('Tidak bisa verifikasi data, tapi update response OK');
        // Fallback: update UI state (seperti sebelumnya)
        const updatedMember = {
          documentId,
          name: editForm.name!.trim(),
          email: editForm.email!.trim(),
          address: editForm.address?.trim() || '',
          id_member: editForm.id_member!
        };

        setMembers((prev) =>
          prev.map((m) => (m.documentId === documentId ? updatedMember : m))
        );

        setEditingId(null);
        setEditForm({});
        alert('✅ Data berhasil diupdate (belum terverifikasi)');
      }
    } catch (err: any) {
      console.error('Edit error:', err);
      alert(err.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        let page = 1;
        let allMembers: Members[] = [];
        let totalPages = 1;

        do {
          const response = await fetch(
            `${BASE_URL}/api/member/list?page=${page}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
                'x-wihope-name': WIHOPE_NAME
              },
              cache: 'no-store'
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Gagal mengambil data');
          }

          const json = await response.json();
          allMembers = allMembers.concat(json.data || []);
          totalPages = json.meta?.pagination?.page_count || 1;
          page++;
        } while (page <= totalPages);

        setMembers(allMembers);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllMembers();
  }, []);

  const hasilPencarian = members.filter(
    (anggota) =>
      anggota.name.toLowerCase().includes(keyword.toLowerCase()) ||
      anggota.email.toLowerCase().includes(keyword.toLowerCase()) ||
      anggota.id_member.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(hasilPencarian.length / itemsPerPage);
  const paginatedItems = hasilPencarian.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-[540px] w-full">
      <h1 className="ml-10 mt-10 text-3xl">
        <span className="rounded-lg bg-yellow-300 px-5 py-3 font-normal text-yellow-700 underline">
          🫂 List Anggota Perpusku
        </span>
      </h1>

      <div className="mt-6 flex flex-row items-center justify-between p-4 px-9 font-light">
        <input
          type="text"
          placeholder="Search by name, email, or id"
          className="w-64 rounded border px-3 py-1"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Link href={`/anggota/add`}>
          <button className="text-normal rounded bg-yellow-500 px-3 py-1 font-medium text-white hover:bg-blue-600">
            Tambahkan Anggota
          </button>
        </Link>
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
            <p>Memuat data anggota dari server...</p>
          </div>
        </div>
      ) : (
        <div className="mx-8 mb-8 space-y-4 rounded-md p-4">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((anggota) =>
              editingId === anggota.documentId ? (
                <div
                  key={anggota.documentId}
                  className="rounded border bg-gray-50 p-4 text-gray-600"
                >
                  <h3 className="mb-3 font-semibold text-gray-700">
                    Edit Anggota
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-600">
                        Nama *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
                        value={editForm.name || ''}
                        onChange={(e) =>
                          handleEditChange('name', e.target.value)
                        }
                        placeholder="Masukkan nama"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-600">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
                        value={editForm.email || ''}
                        onChange={(e) =>
                          handleEditChange('email', e.target.value)
                        }
                        placeholder="Masukkan email"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-600">
                        Alamat
                      </label>
                      <textarea
                        className="w-full rounded border px-3 py-2 focus:border-blue-500 focus:outline-none"
                        rows={2}
                        value={editForm.address || ''}
                        onChange={(e) =>
                          handleEditChange('address', e.target.value)
                        }
                        placeholder="Masukkan alamat"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-600">
                        ID Member
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border bg-gray-100 px-3 py-2"
                        value={editForm.id_member || ''}
                        readOnly
                        placeholder="ID Member (tidak dapat diubah)"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
                      onClick={() => handleEditSave(anggota.documentId)}
                      disabled={editLoading}
                    >
                      {editLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    <button
                      className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                      onClick={handleEditCancel}
                      disabled={editLoading}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={anggota.documentId}
                  className="flex items-center justify-between rounded border border-gray-500 p-4 hover:border-4 hover:border-black"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded border border-blue-700 bg-blue-100 p-2">
                      <div className="text-2xl">👤</div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{anggota.name}</p>
                      <p className="text-sm ">ID: {anggota.id_member}</p>
                      <p className="text-sm ">{anggota.email}</p>
                      {anggota.address && (
                        <p className="mt-1 text-sm ">{anggota.address}</p>
                      )}

                      <div className="mt-3 flex gap-2">
                        <Link
                          href={`/anggota/anggotaPinjam?memberId=${anggota.id_member}`}
                        >
                          <button className="rounded bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600">
                            📚 Peminjaman
                          </button>
                        </Link>

                        <button
                          className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-white hover:bg-yellow-600"
                          onClick={() => handleEditClick(anggota)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                          onClick={() => handleDelete(anggota.documentId)}
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p className="text-lg font-medium">
                {keyword
                  ? 'Tidak ada hasil ditemukan'
                  : 'Belum ada data anggota'}
              </p>
            </div>
          )}

          {paginatedItems.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Anggota;
