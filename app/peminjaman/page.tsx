import { Loan } from '@/components/custom/Peminjaman';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Link from 'next/link';
export default async function Page() {
  const loan = await fetch(`${BASE_URL}/api/loan/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN,
      'x-wihope-name': WIHOPE_NAME
    },
    cache: 'no-store'
  });
  const result = await loan.json();

  return (
    <>
      <Loan data={result.data} />
    </>
  );
}
