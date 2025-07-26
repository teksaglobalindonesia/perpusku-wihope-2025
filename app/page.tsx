import React from 'react';
import Hero from '@/components/custom/main/hero';
import Dashboard from '@/components/arsip/dashboard'; //ga kepake
import BukuHabis from '@/components/custom/main/bukuHabis';
import PinjamanHariIni from '@/components/custom/main/pinjamanHariIni';
import PengembalianHariIni from '@/components/custom/main/pengembalianHariIni';

import { books } from './bukuDummy/data';

export default function Page() {
  return (
    <>
      <Hero />
      {/* <Dashboard /> */}
      <BukuHabis books={books} />
      <PinjamanHariIni />
      <PengembalianHariIni />
    </>
  );
}
