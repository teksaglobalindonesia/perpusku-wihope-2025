import { Toaster } from '@/components/ui/sonner';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import 'animate.css/animate.compat.css';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';
import Navbar from '@/components/custom/navbar';
import Footer from '@/components/custom/footer';
import ModeToggle from '@/components/custom/mode';
import { NavbarProvider } from '@/components/custom/function/HidNav';

const robotoFont = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html
        lang="en"
        className={`${robotoFont.variable} scroll-smooth bg-background text-foreground`}
        suppressHydrationWarning={true}
      >
        <body>
          <NextTopLoader showSpinner={false} height={4} />
          <Toaster />
          <NavbarProvider>
            <Navbar />
            <ModeToggle />
          </NavbarProvider>
          {children}
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
