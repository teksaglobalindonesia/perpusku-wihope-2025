import { NextRequest, NextResponse } from 'next/server';
import { dummyUsers } from '@/datas/user';

export async function GET(request: NextRequest, { params }: { params: any }) {
  const userId = params.id;
  const user = dummyUsers.find((user) => user.id === userId);

  return NextResponse.json({ data: user });
}
