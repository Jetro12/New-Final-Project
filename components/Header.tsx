"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

type NavItem = { href: string; label: string };

export default function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const authed = status === "authenticated";

    const nav: NavItem[] = [
        { href: "/", label: "Home" },
        { href: "/destinations", label: "Destinations" },
        ...(authed ? [{ href: "/trips", label: "Trips" }, { href: "/profile", label: "Profile" }] : []),
    ];

    return (
        <header className="header">
            <Link href="/" className="brand">
                Roamer
            </Link>

            <nav className="nav">
                {nav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                opacity: isActive ? 1 : 0.8,
                                textDecoration: "none",
                                color: "inherit",
                                fontWeight: isActive ? 700 : 500,
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                <div style={{ marginLeft: 12 }}>
                    {authed ? (
                        <button className="btn ghost" onClick={() => signOut({ callbackUrl: "/" })}>
                            Sign out
                        </button>
                    ) : (
                        <button className="btn" onClick={() => signIn(undefined, { callbackUrl: "/destinations" })}>
                            Login / Sign up
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
