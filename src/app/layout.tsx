import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Components
import Header from './components/header';
import Footer from './components/footer';
import LeftPanel from './components/leftNavigationPanel';

// Styles
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Share Code',
  description: 'Share code with fellow developers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${inter.className}`}>
        <main className="h-full grid gap-6 grid-cols-[240px_1fr] grid-rows-[96px_1fr_128px]">
          <LeftPanel />
          <Header />
          <section className="col-start-2">{children}</section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
