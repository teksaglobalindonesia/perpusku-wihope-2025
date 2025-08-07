import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Members } from '@/components/custom/Members';

export default async function Page({
  searchParams,
}: {
  searchParams: {page?: string; q?: string;}
}) {
  const page = searchParams.page? parseInt(searchParams.page) : 1 ;
  const query = searchParams.q || '';

  const url = `${BASE_URL}/api/member/list?page=${page}&page_size=4&search=${encodeURIComponent(query)}`
  const res = await fetch (url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN,
      'x-wihope-name': WIHOPE_NAME
    },
    cache: 'no-store'
  })
  const data = await res.json();

  return <Members initialData={data} initialQuery={query} initialPage={page} />
}





