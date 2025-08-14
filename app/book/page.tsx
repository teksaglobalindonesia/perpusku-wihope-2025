'use client';

import React, { useState } from 'react';
import BookListPage from '@/components/custom/book/buku';

export default function Page() {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <h1 className="ml-10 mt-10  text-3xl">
        {' '}
        <span className="rounded-lg bg-blue-300 px-5 py-3 font-normal text-blue-950 underline">
          📚 List Buku Perpusku
        </span>
      </h1>
      <BookListPage />
    </>
  );
}
