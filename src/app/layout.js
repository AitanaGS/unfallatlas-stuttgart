import './globals.css';

import { Quattrocento, Noto_Sans } from 'next/font/google';

const quattrocento = Quattrocento({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quattrocento',
});

const noto_sans = Noto_Sans({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans',
});

export const metadata = {
  title: 'Unfallatlas Stuttgart',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <link rel="icon" href="/icon.ico" sizes="any" />
      <body
        className={`${quattrocento.variable} ${noto_sans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
