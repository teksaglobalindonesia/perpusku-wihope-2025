import { Toaster } from '@/components/ui/sonner';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import 'animate.css/animate.compat.css';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';
import { D_Header } from '@/components/custom/admin/header';
import { D_NavLinks } from './dashboard/page';
import { D_Footer } from '@/components/custom/admin/footer';

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
          <D_Header items={D_NavLinks} />
          <div className='md:pt-28 pt-24'></div>
          {children}
          <D_Footer/>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
