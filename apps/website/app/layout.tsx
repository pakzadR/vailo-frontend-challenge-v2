import type { Metadata } from 'next';
import './globals.css';

const description =
  'Pixa Studio turns a prompt into a picture. Generate images with fine-grained control over model, aspect ratio and seed.';

export const metadata: Metadata = {
  metadataBase: new URL('https://pixa.studio'),
  title: {
    default: 'Pixa Studio — AI image generation',
    template: '%s · Pixa Studio',
  },
  description,
  openGraph: {
    title: 'Pixa Studio — AI image generation',
    description,
    type: 'website',
    siteName: 'Pixa Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixa Studio — AI image generation',
    description,
  },
};

// Set theme before first paint — no flash of the wrong theme (RULES §10).
const themeScript = `(function(){try{var t=localStorage.getItem('pixa-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
