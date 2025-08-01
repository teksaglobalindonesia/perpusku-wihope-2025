import { NextResponse, NextRequest } from 'next/server';
import { dummyBooks } from '@/datas/books';

export async function GET(req: NextRequest, { params }: { params: any }) {
  const bookId = params?.id;
  const data = dummyBooks.filter((data) => data.id == bookId);
  return NextResponse.json({ data: data?.length > 1 ? data : data[0] });
}
