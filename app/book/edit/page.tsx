'use client';

import React, { Suspense } from 'react';
import EditBuku from '@/components/custom/book/editBuku';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditBuku />
    </Suspense>
  );
}
