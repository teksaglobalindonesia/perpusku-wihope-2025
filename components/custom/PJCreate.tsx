'use client';

import { useState, useEffect } from 'react';
import { CardGambar } from '@/components/custom/cardGambar';
import { MembersCard } from './MCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

interface Book {
  documentId: string;
  title: string;
  author: string;
  genre: string;
  stock: number;
  cover?: {
    url: string;
  };
}

interface Member {
  documentId: string;
  name: string;
  email: string;
  id_member: string;
}

export const PJCreate = () => {
  const [selectedBook, setSelectedBook] = useState<{
    title: string;
    documentId: string;
  } | null>(null);
  const [selectedMember, setSelectedMember] = useState<{
    name: string;
    documentId: string;
  } | null>(null);
  const [loanDate, setLoanDate] = useState<string>('');
  const [duration, setDuration] = useState<number>(7); // default 7 hari
  const [returnDate, setReturnDate] = useState<string>('');

  const [bookData, setBookData] = useState<Book[]>([]);
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, memberRes] = await Promise.all([
          fetch(`${BASE_URL}/api/book/list`, {
            headers: {
              Authorization: TOKEN,
              'x-wihope-name': WIHOPE_NAME
            },
            cache: 'no-store'
          }),
          fetch(`${BASE_URL}/api/member/list`, {
            headers: {
              Authorization: TOKEN,
              'x-wihope-name': WIHOPE_NAME
            },
            cache: 'no-store'
          })
        ]);

        if (!bookRes.ok) throw new Error('Gagal memuat data buku.');
        if (!memberRes.ok) throw new Error('Gagal memuat data anggota.');

        const bookJson = await bookRes.json();
        const memberJson = await memberRes.json();

        setBookData(bookJson.data || []);
        setMemberData(memberJson.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Gagal memuat data buku atau anggota. Coba lagi nanti.');
      }
    };

    fetchData();
  }, []);

  // Hitung return_date saat loanDate atau duration berubah
  useEffect(() => {
    if (loanDate) {
      const date = new Date(loanDate);
      date.setDate(date.getDate() + duration);
      setReturnDate(date.toISOString().split('T')[0]); // Format YYYY-MM-DD
    }
  }, [loanDate, duration]);

  const handleSelectedBook = (index: number) => {
    const book = bookData[index];
    if (!book) return;
    setSelectedBook({ title: book.title, documentId: book.documentId });
  };

  const handleSelectedMember = (index: number) => {
    const member = memberData[index];
    if (!member) return;
    setSelectedMember({ name: member.name, documentId: member.documentId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!selectedBook || !selectedMember || !loanDate) {
      setMessage('Semua field harus diisi!');
      return;
    }

    if (bookData.length === 0 || memberData.length === 0) {
      setMessage('Data buku atau anggota belum tersedia.');
      return;
    }

    const payload = {
      data: {
        member: selectedMember.documentId,
        book: selectedBook.documentId,
        loan_date: loanDate,
        return_date: returnDate
      }
    };

    try {
      const res = await fetch(`${BASE_URL}/api/loan/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Peminjaman berhasil ditambahkan!');
        // Reset form
        setSelectedBook(null);
        setSelectedMember(null);
        setLoanDate('');
        setDuration(7);
      } else {
        setMessage(`Gagal: ${result.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      setMessage('Terjadi kesalahan saat mengirim data.');
      console.error('Error submitting loan:', error);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-vintage-brown/20 bg-vintage-parchment p-6 shadow-sm">
      <h1 className="border-b border-vintage-brown/30 pb-2 font-vintage text-3xl font-semibold text-vintage-ink">
        Tambah Peminjaman
      </h1>

      {message && (
        <div
          className={`rounded p-3 text-sm ${
            message.includes('berhasil')
              ? 'border border-green-200 bg-green-50 text-green-700'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-flow-row grid-cols-2 gap-4 rounded-xl border border-vintage-brown/30 bg-beige-200 p-5 shadow-inner"
      >
        {/* Buku */}
        <div className="flex flex-col gap-2">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Buku
          </label>
          <Dialog>
            <DialogTrigger asChild>
              <input
                type="text"
                value={selectedBook?.title || ''}
                readOnly
                className="h-8 cursor-pointer rounded-md text-center focus:outline-vintage-parchment"
                placeholder={
                  bookData.length ? 'Pilih buku..' : 'Memuat buku...'
                }
              />
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Pilih Buku</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {bookData.length > 0 ? (
                  <CardGambar
                    cardItems={bookData.map((book) => ({
                      imageSrc: book.cover?.url
                        ? `${BASE_URL}${book.cover.url}`
                        : '/images/placeholder-book.png',
                      title: book.title,
                      genre: book.genre,
                      author: book.author,
                      stock: book.stock,
                      buttons: []
                    }))}
                    onEdit={handleSelectedBook}
                    showSelectButton={true}
                  />
                ) : (
                  <p className="py-4 text-center text-sm text-gray-500">
                    Sedang memuat daftar buku...
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Anggota */}
        <div className="flex flex-col gap-2">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Anggota
          </label>
          <Dialog>
            <DialogTrigger asChild>
              <input
                type="text"
                value={selectedMember?.name || ''}
                readOnly
                placeholder={
                  memberData.length ? 'Pilih Anggota' : 'Memuat anggota...'
                }
                className="h-8 cursor-pointer rounded-md text-center focus:outline-vintage-parchment"
              />
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Pilih Anggota</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {memberData.length > 0 ? (
                  <MembersCard
                    cardItems={memberData.map((member) => ({
                      name: member.name,
                      id_member: member.id_member,
                      email: member.email,
                      buttons: []
                    }))}
                    onEdit={handleSelectedMember}
                    showSelectButton={true}
                  />
                ) : (
                  <p className="py-4 text-center text-sm text-gray-500">
                    Sedang memuat daftar anggota...
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tanggal Peminjaman */}
        <div className="flex flex-col gap-2">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Tanggal Peminjaman
          </label>
          <input
            type="date"
            value={loanDate}
            onChange={(e) => setLoanDate(e.target.value)}
            className="h-8 rounded-md text-center focus:outline-vintage-parchment"
            required
          />
        </div>

        {/* Durasi Peminjaman */}
        <div className="flex flex-col gap-1">
          <label className="font-vintage font-medium text-vintage-ink/80">
            Durasi Peminjaman
          </label>
          <div className="relative">
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full cursor-pointer appearance-none rounded-md border border-vintage-brown/40 bg-beige-50 px-3 py-1.5 text-vintage-ink shadow-inner focus:border-vintage-terracotta/70 focus:outline-none focus:ring-1 focus:ring-vintage-terracotta/50"
            >
              <option value={7}>1 minggu</option>
              <option value={14}>2 minggu</option>
              <option value={21}>3 minggu</option>
              <option value={28}>4 minggu</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-vintage-brown/60">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </form>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-48 self-start rounded-md border border-vintage-terracotta bg-vintage-terracotta px-4 py-2 text-sm font-medium text-beige-50 shadow-md transition-all duration-200 hover:bg-vintage-terracotta/90 focus:outline-none focus:ring-2 focus:ring-vintage-terracotta/50 focus:ring-offset-1 active:translate-y-0.5"
      >
        <span className="drop-shadow-sm">Simpan</span>
      </button>
    </div>
  );
};
