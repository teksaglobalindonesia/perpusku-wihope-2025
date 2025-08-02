import { Return } from '@/components/custom/PPengembalian'
import Link from 'next/link'
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';
export default async function Page() {
  const loan = await fetch(`${BASE_URL}/api/loan/list?status=returned`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME
      },
      cache:'no-store'
    });
    const result = await loan.json()
  return (
    <div className="min-h-screen bg-dusty-300 p-5">
      <Return data={result.data}/>
    </div>
  )
}