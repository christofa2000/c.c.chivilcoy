// app/layout.tsx
import "./globals.css";
import { Raleway } from "next/font/google";
import type { Metadata } from "next";
import Footer from "../components/Footer";
import Background from "../components/Background";

export const metadata: Metadata = {
  title: "Espacio Chivilcoy",
  description: "Sitio oficial",
};

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
  variable: "--font-raleway",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={raleway.variable}>
      {/* body exactamente como cuando funcionaba */}
      <body className="min-h-screen antialiased font-[var(--font-raleway),system-ui,sans-serif]">
        {/* 🎯 Fondo encapsulado (no toca CSS global) */}
        <Background />

        <main className="min-h-screen flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
