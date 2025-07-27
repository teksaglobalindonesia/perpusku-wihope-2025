import { dummyBooks } from '@/datas/books';
import { dummyPeminjaman } from '@/datas/peminjaman';
import { dummyUsers } from '@/datas/user';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: any }) {
  let datas: any = {};

  const borrowed = dummyPeminjaman
    .filter((item) => item.userId === params.id)
    ?.map((peminjaman) => {
      const book = dummyBooks.find((book) => book.id === peminjaman.bukuId);
      return { ...peminjaman, buku: book };
    });

  const user = dummyUsers.find((user) => user.id === params.id);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      ...user,
      borrowed
    }
  });
}
