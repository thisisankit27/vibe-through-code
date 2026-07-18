import Link from "next/link";

import Container from "./container";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
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
                    <Link href="/">Home</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/journey">Journey</Link>
                    <Link
                        href="https://archive.vibethroughcode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                    >
                        Archive
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link href="/about">About</Link>
                </nav>
            </Container>
        </header>
    );
}