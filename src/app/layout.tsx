import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-pink-700 to-violet-800 text-gray-100">
        {children}
      </body>
    </html>
  );
}
