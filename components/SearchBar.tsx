"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function formatISO(dateStr: string): string {
    return (dateStr || "").trim();
}

type SearchBarProps = {
    initialWhere?: string;
    initialRegion?: string;
    initialStart?: string;
    initialEnd?: string;
    initialAdults?: number;
    variant?: "hero" | "inline";
};

const regions = [
    "All Regions",
    "Europe",
    "Asia",
    "Africa",
    "North America",
    "South America",
    "Oceania",
    "Middle East",
    "Caribbean",
];

export default function SearchBar({
                                      initialWhere = "",
                                      initialRegion = "All Regions",
                                      initialStart = "",
                                      initialEnd = "",
                                      initialAdults = 2,
                                      variant = "hero",
                                  }: SearchBarProps) {
    const router = useRouter();

    const [where, setWhere] = useState<string>(initialWhere);
    const [region, setRegion] = useState<string>(initialRegion);
    const [start, setStart] = useState<string>(initialStart);
    const [end, setEnd] = useState<string>(initialEnd);
    const [adults, setAdults] = useState<number>(initialAdults);

    const canSearch = useMemo(() => where.trim().length >= 2, [where]);

    function onSearch() {
        if (!canSearch) return;

        const params = new URLSearchParams();
        params.set("q", where.trim());

        if (region && region !== "All Regions") {
            params.set("region", region);
        }

        if (start) params.set("start", formatISO(start));
        if (end) params.set("end", formatISO(end));
        params.set("adults", String(adults));

        router.push(`/destinations?${params.toString()}`);
    }

    return (
        <div className={`searchWrap ${variant === "inline" ? "searchWrapInline" : ""}`}>
            <div className={`searchCard ${variant === "inline" ? "searchCardInline" : ""}`}>
                <div className="searchRow">
                    <label className="fieldBox wide">
                        <span className="fieldLabel">Where to?</span>
                        <input
                            className="searchInput"
                            placeholder="Search destinations (e.g., Dubai, Paris, Tokyo)"
                            aria-label="Search destinations"
                            value={where}
                            onChange={(e) => setWhere(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && onSearch()}
                        />
                    </label>

                    <label className="fieldBox">
                        <span className="fieldLabel">Region</span>
                        <select
                            className="searchSelect"
                            aria-label="Select region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        >
                            {regions.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
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
                            >
                                -
                            </button>
                            <span className="adultsValue">{adults}</span>
                            <button
                                type="button"
                                onClick={() => setAdults(Math.min(12, adults + 1))}
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
                    title={!canSearch ? "Enter a destination" : "Search"}
                >
                    Search
                </button>
            </div>
        </div>
    );
}