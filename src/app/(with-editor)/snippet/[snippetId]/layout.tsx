import Script from 'next/script';
import type { Metadata } from 'next';
import { Afacad } from 'next/font/google';

// Constants
import { IS_JOINED } from '@/constants/localstorageAuthKeys';

// Components
import Header from './components/molecules/header';
import Footer from './components/molecules/footer';
import Toaster from '@/components/organisms/toaster';

// Styles
import '@/styles/globals.css';

const afacad = Afacad({ weight: '500', style: 'normal', subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${new Date().toDateString()} - Code Snippet`,
  description: 'Share code snippets with fellow developers.',
};

export default function SnippetsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`h-full ${afacad.className}`}>
        <main className="h-full px-6 py-2 grid grid-rows-[48px_1fr_96px] gap-4">
          <Header />
          <section className="row-start-2 h-full">{children}</section>
          <Footer />
        </main>
        <Toaster />
      </body>
      <Script id="cleanLoad">
        {`
          localStorage.removeItem('${IS_JOINED}')
        `}
      </Script>
    </html>
  );
}
