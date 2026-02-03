"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function formatISO(dateStr: string): string {
    return (dateStr || "").trim();
}

type Tab = "hotels" | "flights" | "cars";

type SearchBarProps = {
    initialWhere?: string;
    initialStart?: string;
    initialEnd?: string;
    initialAdults?: number;
    initialTab?: Tab;
    variant?: "hero" | "inline";
};

export default function SearchBar({
                                      initialWhere = "",
                                      initialStart = "",
                                      initialEnd = "",
                                      initialAdults = 2,
                                      initialTab = "hotels",
                                      variant = "hero",
                                  }: SearchBarProps) {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>(initialTab);

    const [where, setWhere] = useState<string>(initialWhere);
    const [start, setStart] = useState<string>(initialStart);
    const [end, setEnd] = useState<string>(initialEnd);
    const [adults, setAdults] = useState<number>(initialAdults);

    const canSearch = useMemo(() => where.trim().length >= 2, [where]);

    function onSearch() {
        if (!canSearch) return;

        const params = new URLSearchParams();
        params.set("q", where.trim());
        params.set("type", tab);
        if (start) params.set("start", formatISO(start));
        if (end) params.set("end", formatISO(end));
        params.set("adults", String(adults));

        router.push(`/destinations?${params.toString()}`);
    }

    return (
        <div className={`searchWrap ${variant === "inline" ? "searchWrapInline" : ""}`}>
            <div className={`searchCard ${variant === "inline" ? "searchCardInline" : ""}`}>
                <div className="searchTabs">
                    <button
                        className={`tab ${tab === "hotels" ? "active" : ""}`}
                        type="button"
                        onClick={() => setTab("hotels")}
                    >
                        Hotels
                    </button>
                    <button
                        className={`tab ${tab === "flights" ? "active" : ""}`}
                        type="button"
                        onClick={() => setTab("flights")}
                    >
                        Flights
                    </button>
                    <button
                        className={`tab ${tab === "cars" ? "active" : ""}`}
                        type="button"
                        onClick={() => setTab("cars")}
                    >
                        Car Rentals
                    </button>
                </div>

                <div className="searchRow">
                    <label className="fieldBox wide">
                        <span className="fieldLabel">Where to?</span>
                        <input
                            className="searchInput"
                            placeholder="Search destinations (e.g., Dubai, Paris, Tokyo)"
                            aria-label = "Search destinations"
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
                            min = {start || undefined}
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </label>

                    <label className="fieldBox">
                        <span className="fieldLabel">Adults</span>
                        <input
                            className="searchInput"
                            type="number"
                            min={1}
                            max={12}
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value || 2))}
                        />
                    </label>
                </div>

                <button
                    className="searchBtn"
                    type="button"
                    onClick={onSearch}
                    disabled={!canSearch}
                    title={!canSearch ? "Enter a destination" : "Search"}
                >
                    Search
                </button>
            </div>
        </div>
    );
}
