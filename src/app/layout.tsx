import type { Metadata } from "next";
import { Playfair_Display, Literata } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

import Header from "@/components/header";
import Footer from "@/components/footer";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Handcrafted Haven",
    default: "Handcrafted Haven",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${literata.variable} antialiased bg-terracota-lighter`}
      >
        <Toaster position="top-center" richColors closeButton />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
