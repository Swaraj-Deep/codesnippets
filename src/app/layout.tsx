import type { Metadata } from 'next';
import { Afacad } from 'next/font/google';

// Components
import Header from './components/header';
import Footer from './components/footer';
import LeftPanel from './components/leftNavigationPanel';

// Styles
import './globals.css';

const afacad = Afacad({ weight: '500', style: 'normal', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Code Snippets',
  description: 'Share code snippets with fellow developers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${afacad.className}`}>
        <main className="h-full grid gap-6 grid-cols-[256px_1fr] grid-rows-[96px_1fr_128px] px-6 py-8">
          <LeftPanel />
          <Header />
          <section className="col-start-2">{children}</section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
