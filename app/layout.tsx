import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facturación",
  description: "Facturación",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-mx">
      <body className={`${inter.className} min-h-screen bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-600`}>{children}</body>
    </html>
  );
}
