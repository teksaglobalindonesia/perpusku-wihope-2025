import Header from '@/components/customs/layouts/header';
import Footer from '@/components/customs/layouts/footer';
import PinjamanMemb from '@/components/customs/member/Pinjaman';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Header />
        <PinjamanMemb loans={[]} />
        <Footer />
      </>
    </Suspense>
  );
}
