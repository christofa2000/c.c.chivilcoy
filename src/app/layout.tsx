import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body
        className="min-h-screen bg-gradient-to-br  to-[#7D3C98] text-gray-100"
      >
        {children}
      </body>
    </html>
  );
}
