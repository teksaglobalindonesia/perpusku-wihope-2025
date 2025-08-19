'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

const TambahPinjam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State utama
  const [bookDocumentId, setBookDocumentId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [memberDocumentId, setMemberDocumentId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ambil data dari query params atau sessionStorage
  useEffect(() => {
    const bookDocId =
      searchParams.get('documentId_buku') ||
      sessionStorage.getItem('bookDocumentId') ||
      '';
    const bookNm =
      searchParams.get('book_name') ||
      sessionStorage.getItem('bookTitle') ||
      '';
    const memberDocId =
      searchParams.get('documentId_member') ||
      sessionStorage.getItem('memberDocumentId') ||
      '';
    const memberNm =
      searchParams.get('member_name') ||
      sessionStorage.getItem('memberName') ||
      '';

    setBookDocumentId(bookDocId);
    setBookTitle(bookNm);
    setMemberDocumentId(memberDocId);
    setMemberName(memberNm);

    if (bookDocId) sessionStorage.setItem('bookDocumentId', bookDocId);
    if (bookNm) sessionStorage.setItem('bookTitle', bookNm);
    if (memberDocId) sessionStorage.setItem('memberDocumentId', memberDocId);
    if (memberNm) sessionStorage.setItem('memberName', memberNm);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookDocumentId || !memberDocumentId || !loanDate || !returnDate) {
      setError('Semua field wajib diisi!');
      return;
    }
    if (loanDate > returnDate) {
      setError('Tanggal kembali harus >= tanggal pinjam');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1. Tambah peminjaman
      const payload = {
        data: {
          member: memberDocumentId.trim(),
          book: bookDocumentId.trim(),
          loan_date: loanDate,
          return_date: returnDate
        }
      };

      const response = await fetch(`${BASE_URL}/api/loan/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });

      const resJson = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          resJson?.error?.message ||
            resJson?.message ||
            'Gagal menambahkan peminjaman'
        );
      }

      // 2. Ambil detail buku untuk cek stok
      const bookRes = await fetch(`${BASE_URL}/api/books/${bookDocumentId}`, {
        headers: {
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        }
      });

      const bookData = await bookRes.json();
      const currentStock = bookData?.data?.attributes?.stock ?? 0;

      // 3. Update stok buku (kurangi 1)
      await fetch(`${BASE_URL}/api/books/${bookDocumentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify({
          data: { stock: currentStock - 1 }
        })
      });

      // 4. Bersihkan sessionStorage
      sessionStorage.removeItem('bookDocumentId');
      sessionStorage.removeItem('bookTitle');
      sessionStorage.removeItem('memberDocumentId');
      sessionStorage.removeItem('memberName');

      // 5. Redirect ke daftar peminjaman
      router.push('/peminjaman');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (bookDocumentId) params.set('documentId_buku', bookDocumentId);
    if (bookTitle) params.set('book_name', bookTitle);
    if (memberDocumentId) params.set('documentId_member', memberDocumentId);
    if (memberName) params.set('member_name', memberName);
    return params.toString();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="mb-6 rounded bg-purple-700 px-6 py-2 text-3xl font-bold text-white underline">
        Tambahkan Peminjaman
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded border border-black p-6"
      >
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <div className="mb-4 grid grid-cols-3 items-center gap-4">
          {/* Buku */}
          <label className="text-right font-medium">Buku (Document ID)</label>
          <div className="col-span-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Masukkan documentId buku"
              value={bookDocumentId}
              onChange={(e) => {
                setBookDocumentId(e.target.value);
                sessionStorage.setItem('bookDocumentId', e.target.value);
              }}
              className="flex-1 rounded bg-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Link
              href={`/peminjaman/bukuTest?${buildQueryParams()}`}
              className="rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600"
            >
              Pilih
            </Link>
          </div>
          {bookTitle && (
            <p className="col-span-3 text-right text-sm text-gray-600">
              Judul: {bookTitle}
            </p>
          )}

          {/* Peminjam */}
          <label className="text-right font-medium">
            Peminjam (Document ID)
          </label>
          <div className="col-span-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Masukkan documentId member"
              value={memberDocumentId}
              onChange={(e) => {
                setMemberDocumentId(e.target.value);
                sessionStorage.setItem('memberDocumentId', e.target.value);
              }}
              className="flex-1 rounded bg-gray-200 p-2"
            />
            <Link
              href={`/peminjaman/anggotaTest?${buildQueryParams()}`}
              className="rounded bg-blue-500 px-3 py-1 text-sm font-bold text-white hover:bg-blue-600"
            >
              Pilih
            </Link>
          </div>
          {memberName && (
            <p className="col-span-3 text-right text-sm text-gray-600">
              Nama: {memberName}
            </p>
          )}

          {/* Tanggal Pinjam */}
          <label className="text-right font-medium">Tanggal Pinjam</label>
          <input
            type="date"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            className="col-span-2 rounded bg-gray-200 p-2"
          />

          {/* Tanggal Kembali */}
          <label className="text-right font-medium">Tanggal Kembali</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="col-span-2 rounded bg-gray-200 p-2"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? 'Menyimpan...' : 'Simpan Peminjaman'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahPinjam;
