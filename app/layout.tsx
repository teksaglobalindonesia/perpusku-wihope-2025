import { Header } from '@/components/custom/header';
import { Toaster } from '@/components/ui/sonner';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import 'animate.css/animate.compat.css';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';

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
        className={`${robotoFont.variable}`}
        suppressHydrationWarning={true}
      >
        <body>
          <NextTopLoader showSpinner={false} height={4} />
          <Toaster />
          <Header
        navItems={[
          {
            label: 'Dashboard',
            path: '/'
          },
          {
            label: 'Buku',
            path: '/book'
          },
          {
            label: 'Anggota',
            path: '/members'
          },
          {
            label: 'Peminjaman',
            path: '/peminjaman'
          },
          {
            label: 'Pengembalian',
            path: '/pengembalian'
          } 
          
        ]}
        
      />
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
