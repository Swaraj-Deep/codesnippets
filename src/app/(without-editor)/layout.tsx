import type { Metadata } from 'next';
import Script from 'next/script';
import { Afacad } from 'next/font/google';

// Constants
import { IS_JOINED } from '@/constants/localstorageAuthKeys';

// Components
import Header from './components/molecules/header';
import Footer from './components/molecules/footer';
import LeftPanel from './components/molecules/leftNavigationPanel';
import Toaster from '@/components/organisms/toaster';
import AuthProvider from '@/providers/AuthProvider';

// Styles
import '@/styles/globals.css';

const afacad = Afacad({ weight: '500', style: 'normal', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code Snippets',
  description: 'Share code snippets with fellow developers.',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`h-full ${afacad.className}`}>
        <AuthProvider>
          <main className="h-full grid gap-6 grid-cols-[256px_1fr] grid-rows-[96px_1fr_128px] px-6 py-8">
            <LeftPanel />
            <Header />
            <section className="col-start-2">{children}</section>
            <Footer />
          </main>
          {modal}
          <Toaster />
        </AuthProvider>
      </body>
      <Script id="cleanLoad">
        {`
          localStorage.removeItem('${IS_JOINED}')
        `}
      </Script>
    </html>
  );
}

/**
 * Share Code -> Read only
 * Login -> non logged in save only for 2 days
 * Editor in full page
 * Download
 */
