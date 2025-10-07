import '../style/globals.css'
import StoreProvider from './providers';
import type { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import Navbar from '../components/layout/navbar/Navbar';
import { Toaster } from 'sonner';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})
export const metadata = {
  title: 'Coffeino',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={montserrat.className}>
      <body>
        <StoreProvider>
          <Navbar />
          <Toaster position="bottom-right" richColors closeButton />
          <main className="w-1/1 h-1/1 mx-auto">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  )
}