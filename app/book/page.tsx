import { BCard } from '@/components/custom/BCard';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import Link from 'next/link';

export default async function Page() {
  const bukus = await fetch(`${BASE_URL}/api/book/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN,
      'x-wihope-name': WIHOPE_NAME
    },
    cache: 'no-store'
  });
  console.log(bukus);
  const result = await bukus.json();
  const books = result?.data || [];
  
  return (
    <BCard data={books} />
  )
  
  
}
