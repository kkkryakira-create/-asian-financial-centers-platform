import './globals.css';
import { Spectral, Space_Grotesk } from 'next/font/google';

const spectral = Spectral({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-spectral'
});

const space = Space_Grotesk({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space'
});

export const metadata = {
  title: 'Asian Financial Centres Observatory (AFCO)',
  description: 'Institutional determinants of Asian financial centres competitiveness with a focus on Hong Kong and Singapore.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${spectral.variable} ${space.variable}`}>
      <body>{children}</body>
    </html>
  );
}
