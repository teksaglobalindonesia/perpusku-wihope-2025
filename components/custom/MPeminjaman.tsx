
'use server';

import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Card } from './card';

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(dateStr));

export const MPeminjaman = async ({ documentId }: { documentId: string }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/loan/list?id_member=${documentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME,
      },
      cache: 'no-store',
    });

    if (!res.ok) return <p className="text-red-600">Gagal memuat data.</p>;

    const  data = await res.json();
    const loans = data.data?.map((p: any) => {
      const actual = p.return?.actual_return_date;
      const due = new Date(p.return_date);
      const now = new Date();

      return {
        title: p.book.title,
        peminjam: p.member.name,
        peminjaman: formatDate(p.loan_date),
        pengembalian: formatDate(p.return_date),
        label: actual ? 'DIKEMBALIKAN' : due < now ? 'TERLAMBAT' : 'DIPINJAM',
        showButton: !actual, // hanya tampilkan tombol jika belum dikembalikan
      };
    }) || [];

    return loans.length > 0
      ? <Card cardItems={loans} />
      : <p>Tidak ada peminjaman aktif.</p>;
  } catch (error) {
    return <p className="text-red-600">Terjadi kesalahan.</p>;
  }
};