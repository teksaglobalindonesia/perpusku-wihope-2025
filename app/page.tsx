import { Navbar } from '@/components/custom/navbar';
import { Hero } from '@/components/custom/hero';
import Dashboard from '@/components/custom/dashboard';
import { Footer } from '@/components/custom/footer';

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Dashboard />
      <Footer />
    </>
  );
}
