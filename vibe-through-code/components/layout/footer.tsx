import Container from "./container";

export default function Footer() {
    return (
        <footer className="border-t border-rule-standard py-8">
            <Container className="flex flex-col items-center justify-between gap-3 text-sm text-ink-tertiary md:flex-row">
                <p>© {new Date().getFullYear()} Vibe Through Code.</p>

                <p>One Livestream. One Commit. One Project at a Time.</p>
            </Container>
        </footer>
    );
}