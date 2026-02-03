"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/auth");
    }, [status, router]);

    if (status === "loading") return <div className="page">Loading…</div>;
    if (status === "unauthenticated") return null;

    return <>{children}</>;
}
