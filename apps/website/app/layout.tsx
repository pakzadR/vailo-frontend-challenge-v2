import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const description =
  'Pixa Studio turns any prompt into stunning imagery. Generate, iterate and reproduce AI images down to the seed — with fine-grained control over model, aspect ratio and seed.';

export const metadata: Metadata = {
  metadataBase: new URL('https://pixa.studio'),
  title: {
    default: 'Pixa — Turn any prompt into stunning imagery',
    template: '%s · Pixa',
  },
  description,
  openGraph: {
    title: 'Pixa — Turn any prompt into stunning imagery',
    description,
    type: 'website',
    siteName: 'Pixa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixa — Turn any prompt into stunning imagery',
    description,
  },
};

// apply stored theme before first paint
const themeScript = `(function(){try{if(localStorage.getItem('pixa-theme')==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
