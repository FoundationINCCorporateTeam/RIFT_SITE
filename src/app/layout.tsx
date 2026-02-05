import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RIFT - The Backend Language That Just Works",
  description: "RIFT (Rapid Integrated Framework Technology) - A modern backend programming language with zero setup, built-in HTTP, database, and crypto modules. Install with one command and start building.",
  keywords: ["programming language", "backend", "rift", "web development", "database", "http server"],
  authors: [{ name: "RIFT Team" }],
  openGraph: {
    title: "RIFT - The Backend Language That Just Works",
    description: "Zero setup. Built-in everything. From database to deployment in under 10 lines.",
    url: "https://rift.astroyds.com",
    siteName: "RIFT Programming Language",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIFT - The Backend Language That Just Works",
    description: "Zero setup. Built-in everything. From database to deployment in under 10 lines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
