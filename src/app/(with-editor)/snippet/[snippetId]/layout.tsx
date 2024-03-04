import type { Metadata } from 'next';
import { Afacad } from 'next/font/google';

// Components
import Header from './components/molecules/header';
import Footer from './components/molecules/footer';

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
    <html lang="en" className="h-full">
      <body className={`h-full ${afacad.className}`}>
        <main className="h-full px-6 py-2 grid grid-rows-[48px_1fr_96px] gap-4">
          <Header />
          <section className="row-start-2 h-full">{children}</section>
          <Footer />
        </main>
      </body>
    </html>
  );
}
