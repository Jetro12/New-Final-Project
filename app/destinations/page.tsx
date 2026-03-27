"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { getDestinations, type Destination } from "@/lib/data/destinations";

function DestinationsContent() {
    const q = useSearchParams();

    const query = (q.get("q") || "").trim().toLowerCase();
    const type = (q.get("type") || "").trim().toLowerCase();
    const start = q.get("start") || "";
    const end = q.get("end") || "";
    const adults = q.get("adults") || "2";

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDestinations = async () => {
            try {
                const data = await getDestinations();
                setDestinations(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load destinations.");
            } finally {
                setLoading(false);
            }
        };

        loadDestinations();
    }, []);

    const filtered = useMemo(() => {
        return destinations
            .filter((d) => {
                const matchText =
                    !query ||
                    d.name.toLowerCase().includes(query) ||
                    d.country.toLowerCase().includes(query) ||
                    d.region.toLowerCase().includes(query) ||
                    d.description.toLowerCase().includes(query);

                const matchType = !type || d.tags.includes(type);

                return matchText && matchType;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [destinations, query, type]);

    return (
        <div className="destPage">
            <div className="destWrap">
                <div className="destHeader">
                    <div>
                        <h1>Destinations</h1>
                        <div className="destSub">
                            {query || type ? (
                                <>
                                    {query && <>Showing results for <strong>{query}</strong></>}
                                    {type && <> • {type}</>}
                                    {start && end && <> • {start} → {end}</>}
                                    {adults && <> • {adults} adults</>}
                                </>
                            ) : (
                                "Browse destinations and start planning."
                            )}
                        </div>
                    </div>

                    <Link className="destCta" href="/">
                        ← Back home
                    </Link>
                </div>

                <div className="destSearch">
                    <SearchBar
                        key={`${query}-${type}-${start}-${end}-${adults}`}
                        initialWhere={query}
                        initialStart={start}
                        initialEnd={end}
                        initialAdults={Number(adults) > 0 ? Number(adults) : 2}
                        variant="inline"
                    />
                </div>

                {loading && <div className="destEmpty">Loading destinations...</div>}
                {error && <div className="destEmpty">{error}</div>}

                {!loading && !error && (
                    <>
                        <div className="destGrid">
                            {filtered.map((d) => (
                                <div className="destCard" key={d.id}>
                                    <div className="destCardImage">
                                        <img src={d.image} alt={`${d.name} view`} loading="lazy" />
                                        <div className="destRating">★ {d.rating.toFixed(1)}</div>
                                    </div>

                                    <div className="destCardBody">
                                        <div className="destCardTop">
                                            <div>
                                                <div className="destName">{d.name}</div>
                                                <div className="destCountry">
                                                    {d.country} • {d.region}
                                                </div>
                                            </div>
                                            <div className="destPrice">From £{d.fromPrice}</div>
                                        </div>

                                        <p className="destDesc">{d.description}</p>

                                        <div className="destTags">
                                            {d.tags.map((t) => (
                                                <span className="tag" key={t}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="destMiniMeta">
                                            <div>
                                                <span className="destLabel">Best for</span>
                                                <strong>{d.bestFor}</strong>
                                            </div>
                                            <div>
                                                <span className="destLabel">Best time</span>
                                                <strong>{d.bestTime}</strong>
                                            </div>
                                        </div>

                                        <ul className="destMiniHighlights">
                                            {d.highlights.slice(0, 3).map((h) => (
                                                <li key={h}>{h}</li>
                                            ))}
                                        </ul>

                                        <div className="destActions">
                                            <Link className="destGhost" href={`/destinations/${d.id}`}>
                                                Details →
                                            </Link>
                                            <Link className="destBtn" href={`/booking/${d.id}`}>
                                                Book →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="destEmpty">
                                No matches found. Try another search or remove filters.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function DestinationsPage() {
    return (
        <Suspense fallback={<div className="destEmpty">Loading destinations...</div>}>
            <DestinationsContent />
        </Suspense>
    );
}