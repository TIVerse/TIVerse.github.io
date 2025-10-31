import './globals.css';
import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FounderPopup } from '@/components/founder-popup';

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'TIVerse - Tonmoy Infrastructure & Vision',
  description: 'Empowering developers with open-source tools that are performant, reliable, and built for the real world.',
  keywords: ['TIVerse', 'open source', 'infrastructure', 'developer tools', 'Tonmoy'],
  authors: [{ name: 'TIVerse Team' }],
  creator: 'TIVerse',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tiverse.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'TIVerse - Tonmoy Infrastructure & Vision',
    description: 'Empowering developers with open-source tools that are performant, reliable, and built for the real world.',
    siteName: 'TIVerse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TIVerse - Tonmoy Infrastructure & Vision',
    description: 'Empowering developers with open-source tools that are performant, reliable, and built for the real world.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={firaCode.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
            <Header />
            <main>{children}</main>
            <Footer />
            <FounderPopup />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}