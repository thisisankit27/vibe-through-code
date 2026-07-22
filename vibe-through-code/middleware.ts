import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
    // Skip auth in development (optional — remove if you want to test auth locally)
    if (process.env.NODE_ENV === "development" && !process.env.FORCE_ADMIN_AUTH) {
        return NextResponse.next();
    }

    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
        const authValue = basicAuth.split(" ")[1];
        const [user, pwd] = atob(authValue).split(":");

        if (
            user === process.env.ADMIN_USER &&
            pwd === process.env.ADMIN_PASSWORD
        ) {
            return NextResponse.next();
        }
    }

    return new NextResponse("Auth required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
    });
}