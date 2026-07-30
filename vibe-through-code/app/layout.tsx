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
    // Font variables live on <html> so they resolve at :root, where
    // globals.css maps them onto the semantic --face-* tokens.
    //
    // H1 resolved 2026-07-31: paper is the ground. Every component now
    // consumes tokens, so this is a one-class decision rather than a
    // repaint. `theme-dark` remains available for the dark theme.
    <html
      lang="en"
      suppressHydrationWarning
      className={`theme-paper ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}