"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function formatISO(dateStr: string): string {
    return (dateStr || "").trim();
}

type SearchBarProps = {
    initialWhere?: string;
    initialStart?: string;
    initialEnd?: string;
    initialAdults?: number;
    variant?: "hero" | "inline";
};

export default function SearchBar({
                                      initialWhere = "",
                                      initialStart = "",
                                      initialEnd = "",
                                      initialAdults = 2,
                                      variant = "hero",
                                  }: SearchBarProps) {
    const router = useRouter();

    const [where, setWhere] = useState<string>(initialWhere);
    const [start, setStart] = useState<string>(initialStart);
    const [end, setEnd] = useState<string>(initialEnd);
    const [adults, setAdults] = useState<number>(initialAdults);

    const canSearch = useMemo(() => {
        return (
            where.trim().length > 0 ||
            start.trim().length > 0 ||
            end.trim().length > 0 ||
            adults > 0
        );
    }, [where, start, end, adults]);

    function onSearch() {
        if (!canSearch) return;

        const params = new URLSearchParams();

        if (where.trim()) params.set("q", where.trim());
        if (start) params.set("start", formatISO(start));
        if (end) params.set("end", formatISO(end));
        params.set("adults", String(adults));

        router.push(`/destinations?${params.toString()}`);
    }

    return (
        <div className={`searchWrap ${variant === "inline" ? "searchWrapInline" : ""}`}>
            <div className={`searchCard ${variant === "inline" ? "searchCardInline" : ""}`}>
                <div className="searchRow">
                    <label className="fieldBox searchFieldWide">
                        <span className="fieldLabel">Where to?</span>
                        <input
                            className="searchInput"
                            placeholder="Search destinations like Dubai, Paris, Tokyo..."
                            aria-label="Search destinations"
                            value={where}
                            onChange={(e) => setWhere(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onSearch()}
                        />
                    </label>

                    <label className="fieldBox">
                        <span className="fieldLabel">Start</span>
                        <input
                            className="searchInput"
                            type="date"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </label>

                    <label className="fieldBox">
                        <span className="fieldLabel">End</span>
                        <input
                            className="searchInput"
                            type="date"
                            min={start || undefined}
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </label>

                    <label className="fieldBox">
                        <span className="fieldLabel">Adults</span>
                        <div className="adultsControl">
                            <button
                                type="button"
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                aria-label="Decrease adults"
                            >
                                −
                            </button>
                            <span className="adultsValue">{adults}</span>
                            <button
                                type="button"
                                onClick={() => setAdults(Math.min(12, adults + 1))}
                                aria-label="Increase adults"
                            >
                                +
                            </button>
                        </div>
                    </label>
                </div>

                <button
                    className="searchBtn"
                    type="button"
                    onClick={onSearch}
                    disabled={!canSearch}
                    title={!canSearch ? "Enter a destination or dates" : "Search"}
                >
                    Search destinations
                </button>
            </div>
        </div>
    );
}