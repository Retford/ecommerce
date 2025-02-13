import type { Metadata } from 'next';
import { inter } from '@/config/fonts';

import './globals.css';
import { Provider } from '@/components/provider/Provider';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description: 'MarketPlace Teslo Shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={`${inter.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
