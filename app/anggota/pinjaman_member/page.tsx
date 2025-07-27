import Header from '@/components/customs/header';
import Footer from '@/components/customs/footer';
import PinjamanMemb from '@/components/customs/M_Pinjaman';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Header />
        <PinjamanMemb />
        <Footer />
      </>
    </Suspense>
  );
}
