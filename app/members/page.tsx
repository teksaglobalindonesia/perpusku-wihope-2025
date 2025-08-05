import Link from 'next/link';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
import { Members } from '@/components/custom/Members';

export default async function Page() {
  const anggotas = await fetch(`${BASE_URL}/api/member/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: TOKEN,
      'x-wihope-name': WIHOPE_NAME
    },
    cache: 'no-store'
  });
  const result = await anggotas.json();
  const members = result?.data || [];

  return <Members/>;
}
