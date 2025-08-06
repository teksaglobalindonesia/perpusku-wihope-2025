import { dummyPeminjaman } from '@/datas/peminjaman';
import { dummyUsers } from '@/datas/user';
import { dummyBooks } from '@/datas/books';
import { NextResponse } from 'next/server';

export async function GET() {
  const dataPeminjaman: any = [];
  dummyPeminjaman.forEach((data) => {
    const userData = dummyUsers.filter((user) => user.id == data.userId);
    const bookData = dummyBooks.filter((book) => data.bukuId == book.id);
    dataPeminjaman.push({ ...data, user: userData[0], book: bookData[0] });
  });
  return NextResponse.json({ data: dataPeminjaman });
}
