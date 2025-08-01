import { NextResponse } from 'next/server';
import { dummyBooks } from '@/datas/books';

export async function GET() {
  return NextResponse.json({ data: dummyBooks });
}
