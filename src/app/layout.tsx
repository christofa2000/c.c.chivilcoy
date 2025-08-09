// app/layout.tsx
import './globals.css';
import { Raleway } from 'next/font/google';
import type { Metadata } from 'next';
// import Footer from '@/components/Footer'; // ajustá la ruta si hace falta
import Footer from '../components/Footer'; // ajusta la ruta si tu estructura de carpetas es diferente

export const metadata: Metadata = {
  title: 'Espacio Chivilcoy',
  description: 'Sitio oficial',
};

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-raleway', // <<< expone la variable CSS
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={raleway.variable}>
      {/* usamos la variable directamente como font-family con Tailwind (arbitrary value) */}
      <body className="min-h-screen antialiased font-[var(--font-raleway),system-ui,sans-serif]">
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
