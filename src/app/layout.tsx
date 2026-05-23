import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';

import './globals.css';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ShapeShift Demo dApp',
  description:
    'Intentionally minimal Next.js + wagmi dApp used to demo the shapeshift-mcp integration agent.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Providers>
          <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
              ShapeShift Demo dApp
            </Link>
            <nav className="flex gap-4 text-sm text-neutral-400">
              <Link href="/" className="hover:text-neutral-100">
                Home
              </Link>
              <Link href="/swap" className="hover:text-neutral-100">
                Swap
              </Link>
            </nav>
          </header>
          <main className="flex-1 px-6 py-10 max-w-3xl mx-auto w-full">{children}</main>
          <footer className="border-t border-neutral-800 px-6 py-4 text-xs text-neutral-500">
            Demo target for{' '}
            <a
              href="https://github.com/swdiscordia/shapeshift-mcp"
              className="underline decoration-dotted hover:text-neutral-300"
            >
              shapeshift-mcp
            </a>
            . No real funds, no wallet connection required.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
