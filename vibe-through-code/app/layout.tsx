import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe Through Code",
  description:
    "Building to $1,000,000 — One Livestream. One Commit. One Project at a Time.",
  metadataBase: new URL("https://www.vibethroughcode.com"),
  keywords: [
    "Software Engineering",
    "Build in Public",
    "Backend",
    "Java",
    "Spring Boot",
    "AI",
    "Responsible AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}