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
    // The ground defaults to dark (see globals.css) while ~215 component
    // usages still hardcode it. Adding "theme-paper" to this className
    // flips the site to the paper ground — that one-word change IS the
    // H1 test, valid once components consume tokens. See DESIGN.md.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}