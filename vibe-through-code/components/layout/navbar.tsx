import Link from "next/link";

import Container from "./container";

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
                    <Link href="/about">About</Link>
                </nav>
            </Container>
        </header>
    );
}