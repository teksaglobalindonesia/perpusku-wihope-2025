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

  return (
    <div className=" flex flex-col  bg-beige-100 p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-vintage text-3xl font-bold text-vintage-brown">
          Anggota
        </h1>
        <div className='flex gap-3 items-center'>
        <Link href="/members/addMember">
          <button className="rounded bg-vintage-sage px-4 py-2 font-vintage text-beige-100 transition-colors hover:bg-vintage-sage/90">
            Tambah Anggota
          </button>
        </Link>
        <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-sm border-2 border-beige-300 bg-beige-100 px-4 py-2 font-vintage
                      italic text-beige-700 placeholder-beige-400 shadow-inner transition-colors
                      duration-200 focus:border-beige-400 focus:bg-white 
                      focus:outline-none sm:w-48"
          />
          </div>
      </div>
      <Members data={result.data}/>
    </div>
  );
}
