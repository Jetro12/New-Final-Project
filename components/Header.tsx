"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

type NavItem = {
    href: string;
    label: string;
};

export default function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const isAuthed = !!session?.user;
    const avatar = session?.user?.image || "";

    const nav: NavItem[] = [
        { href: "/", label: "Home" },
        { href: "/destinations", label: "Destinations" },
        { href: "/trips", label: "Trips" },
        { href: "/profile", label: "Profile" },
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
                                opacity: isActive ? 1 : 0.75,
                                textDecoration: "none",
                                color: "inherit",
                                fontWeight: isActive ? 800 : 600,
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}

                {/* Right side auth controls */}
                {status !== "loading" && isAuthed ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Link
                            href="/profile"
                            style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}
                        >
                            <div
                                style={{
                                    width: 38, // bigger avatar
                                    height: 38,
                                    borderRadius: "999px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255,255,255,0.18)",
                                    background: "rgba(255,255,255,0.10)",
                                    flex: "0 0 auto",
                                }}
                            >
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt="Profile"
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                        onError={(e) => {
                                            // fallback if provider avatar URL fails
                                            (e.currentTarget as HTMLImageElement).src = "/favicon.ico";
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="/favicon.ico"
                                        alt="Profile"
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                )}
                            </div>
                        </Link>

                        <button className="btn ghost" type="button" onClick={() => signOut({ callbackUrl: "/" })}>
                            Sign out
                        </button>
                    </div>
                ) : (
                    <Link className="btn ghost" href="/auth">
                        Login / Sign up
                    </Link>
                )}
            </nav>
        </header>
    );
}
