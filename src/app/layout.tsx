import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LocaleProvider } from "@/hooks/use-locale";
import { NextAuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <LocaleProvider>
              {children}
              <Toaster />
            </LocaleProvider>
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
