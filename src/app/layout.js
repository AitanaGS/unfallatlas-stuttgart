import './globals.css';
import { Quattrocento, Noto_Sans, Lato } from 'next/font/google';
// import { Inter } from 'next/font/google';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={quattrocento.className}>{children}</body> */}
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta> */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <body
        className={`${quattrocento.variable} ${noto_sans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
