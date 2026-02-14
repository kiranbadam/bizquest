import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BizQuest - Your Path to Business Success",
  description:
    "An interactive educational app for aspiring business leaders. Explore business basics, test your knowledge, and discover your path to a career in business!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased`}
      >
        <Navigation />
        <main className="relative z-10 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
