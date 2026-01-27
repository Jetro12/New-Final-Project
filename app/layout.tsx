import type { Metadata } from "next";
import "./globals.css";

import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
    title: "Roamer",
    description: "Discover places. Book experiences. Travel smarter.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <SiteShell>{children}</SiteShell>
        </body>
        </html>
    );
}
