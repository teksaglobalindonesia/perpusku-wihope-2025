'use client';

import React, { Suspense } from 'react';
import EditAnggota from '@/components/custom/member/editAnggota';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditAnggota />
    </Suspense>
  );
}
