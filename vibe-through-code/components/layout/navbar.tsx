"use client";

import Link from "next/link";
import { useState } from "react";

import Container from "./container";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
            <Container className="flex h-16 items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight"
                >
                    Vibe Through Code
                </Link>

                <nav className="hidden gap-8 text-sm text-white/70 md:flex">
                    <Link href="/" className="transition-colors hover:text-emerald-400">Home</Link>
                    <Link href="/projects" className="transition-colors hover:text-emerald-400">Projects</Link>
                    <Link href="/journey" className="transition-colors hover:text-emerald-400">Journey</Link>
                    <Link
                        href="https://archive.vibethroughcode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 transition-colors hover:text-emerald-400"
                    >
                        Archive
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link href="/support" className="transition-colors hover:text-emerald-400">Support</Link>
                    <Link href="/about" className="transition-colors hover:text-emerald-400">About</Link>
                </nav>

                <button
                    type="button"
                    className="rounded-md p-2 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 md:hidden"
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    onClick={() => setIsOpen((open) => !open)}
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </Container>

            {isOpen && (
                <div id="mobile-navigation" className="border-t border-white/10 bg-black/95 md:hidden">
                    <Container>
                        <nav className="flex flex-col py-3 text-sm text-white/80" aria-label="Mobile navigation">
                            <Link href="/" className="rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-emerald-400" onClick={closeMenu}>Home</Link>
                            <Link href="/projects" className="rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-emerald-400" onClick={closeMenu}>Projects</Link>
                            <Link href="/journey" className="rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-emerald-400" onClick={closeMenu}>Journey</Link>
                            <Link
                                href="https://archive.vibethroughcode.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-emerald-400"
                                onClick={closeMenu}
                            >
                                Archive
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <Link href="/support" className="rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-emerald-400" onClick={closeMenu}>Support</Link>
                            <Link href="/about" className="rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-emerald-400" onClick={closeMenu}>About</Link>
                        </nav>
                    </Container>
                </div>
            )}
        </header>
    );
}