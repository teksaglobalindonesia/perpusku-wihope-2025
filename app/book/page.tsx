import { BCard } from '@/components/custom/BCard';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const query = searchParams.q || '';

  const url = new URL(`${BASE_URL}/api/book/list`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('page_size', '4');
  if (query) url.searchParams.append('search', query);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN,
      'x-wihope-name': WIHOPE_NAME,
    },
    cache: 'no-store',
  });

  const data = await res.json();

  return (
    <BCard
      initialData={data}
      initialPage={page}
      initialQuery={query}
    />
  );
}