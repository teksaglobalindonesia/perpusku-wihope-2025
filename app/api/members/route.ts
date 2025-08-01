import { NextResponse } from 'next/server';
import { dummyUsers } from '@/datas/user';

export async function GET() {
  return NextResponse.json({ data: dummyUsers });
}
