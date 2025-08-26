import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cousland's Library",
  description: "Cousland's Library Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
