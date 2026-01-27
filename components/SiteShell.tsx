"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
    children: ReactNode;
};

export default function SiteShell({ children }: Props) {
    const pathname = usePathname();
    const showHeader = pathname !== "/";

    return (
        <>
            {showHeader && <Header />}
            {children}
            <Footer />
        </>
    );
}
