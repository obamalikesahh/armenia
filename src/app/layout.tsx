import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/hooks/use-locale";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Armenia Tours — Discover the Land of Wonders",
  description: "Book unforgettable tours across Armenia and Georgia. Explore ancient monasteries, stunning landscapes, and rich culture with expert guides.",
  keywords: ["Armenia tours", "Armenian tours", "Sevan", "Tatev", "Garni", "Geghard", "Khor Virap", "Dilijan", "group tours Armenia"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-[#0a0a0f] text-white`}>
        <LocaleProvider>
          {children}
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
