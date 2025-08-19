'use client';

import React, { Suspense, useState } from 'react';
import TambahPinjam from '@/components/custom/lending/tambahPinjam';

export default function AddPage() {
  return (
    <Suspense>
      <TambahPinjam />
    </Suspense>
  );
}
