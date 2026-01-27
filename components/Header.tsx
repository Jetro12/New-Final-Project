"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    href: string;
    label: string;
};

const nav: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/auth", label: "Login / Sign up" },
];

export default function Header() {
    const pathname = usePathname();

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
                                fontWeight: isActive ? 700 : 500,
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
