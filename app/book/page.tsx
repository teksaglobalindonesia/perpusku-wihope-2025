'use client';

import React, { useState } from 'react';
import BookListPage from '@/components/custom/book/buku';

export default function Page() {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <h1 className="rounded-lg bg-blue-200 px-8 py-5 text-3xl">
        📚{' '}
        <span className="font-normal text-blue-950 underline">
          List Buku Perpusku
        </span>
      </h1>
      <BookListPage />
    </>
  );
}
