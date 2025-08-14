'use client';

import React, { Suspense } from 'react';
import AnggotaMinjem from '@/components/custom/member/anggotaMinjem';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AnggotaMinjem />
    </Suspense>
  );
}
