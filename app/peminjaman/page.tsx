import { Loan } from '@/components/custom/Peminjaman';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
export default async function Page({
  searchParams
}: {
  searchParams: { page?: string; q?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const query = searchParams.q || '';

  const url = `${BASE_URL}/api/loan/list?page=${page}&page_size=4&search=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN,
      'x-wihope-name': WIHOPE_NAME
    },
    cache: 'no-store'
  });
  const data = await res.json();
  return <Loan initialData={data} initialQuery={query} initialPage={page} />
}
