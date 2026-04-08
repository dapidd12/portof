import type { Metadata } from 'next';
import { Syne, Manrope } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScroll } from '@/components/SmoothScroll';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'KaiDeveloper | Web Developer',
  description: 'High-end Scrollytelling Personal Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body className="bg-black text-white font-manrope antialiased selection:bg-white selection:text-black" suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
