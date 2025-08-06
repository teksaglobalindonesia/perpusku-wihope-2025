import { NextResponse, NextRequest } from 'next/server';
import { dummyPeminjaman } from '@/datas/peminjaman';

export async function GET(req: NextRequest, { params }: { params: any }) {
  const data = dummyPeminjaman.filter((data) => data.id == params?.id);

  return NextResponse.json({ data });
}
