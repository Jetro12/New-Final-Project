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
    const [selectedRegion, setSelectedRegion] = useState("all");

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

    const regions = useMemo(() => {
        const unique = Array.from(new Set(destinations.map((d) => d.region))).sort();
        return ["all", ...unique];
    }, [destinations]);

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

                const matchRegion =
                    selectedRegion === "all" ||
                    d.region.toLowerCase() === selectedRegion.toLowerCase();

                return matchText && matchType && matchRegion;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [destinations, query, type, selectedRegion]);

    return (
        <div className="destPage">
            <div className="destWrap">
                <div className="destHeader">
                    <div>
                        <h1>Explore Top Destinations</h1>
                        <div className="destSub">
                            Find curated destinations, compare highlights, and start planning.
                        </div>
                    </div>

                    <div className="destHeaderActions">
                        <Link className="destCta" href="/">
                            ← Home
                        </Link>
                        <Link className="destCta" href="/profile">
                            Profile
                        </Link>
                    </div>
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

                {!loading && !error && (
                    <div className="destResultsBar">
                        <span>
                            {filtered.length} destination{filtered.length !== 1 ? "s" : ""} found
                        </span>

                        <div className="regionFilters">
                            {regions.map((region) => (
                                <button
                                    key={region}
                                    type="button"
                                    className={`regionBtn ${selectedRegion === region ? "active" : ""}`}
                                    onClick={() => setSelectedRegion(region)}
                                >
                                    {region === "all" ? "All" : region}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {loading && <div className="destEmpty">Loading destinations...</div>}
                {error && <div className="destEmpty">{error}</div>}

                {!loading && !error && (
                    <>
                        <div className="destGalleryGrid">
                            {filtered.map((d) => (
                                <article className="galleryCard" key={d.id}>
                                    <Link className="galleryImageWrap" href={`/destinations/${d.id}`}>
                                        <img src={d.image} alt={`${d.name} view`} loading="lazy" />
                                        <div className="galleryRating">★ {d.rating.toFixed(1)}</div>
                                    </Link>

                                    <div className="galleryBody">
                                        <h2 className="galleryTitle">{d.name}</h2>
                                        <p className="galleryDesc">
                                            {d.description.length > 72
                                                ? `${d.description.slice(0, 72)}...`
                                                : d.description}
                                        </p>

                                        <div className="galleryMeta">
                                            <span className="galleryRegion">{d.country}</span>
                                            <span className="galleryDot">•</span>
                                            <span className="galleryBestTime">{d.bestTime}</span>
                                        </div>

                                        <div className="galleryBottom">
                                            <div className="galleryPrice">£{d.fromPrice}</div>

                                            <div className="galleryActions">
                                                <Link className="galleryGhostBtn" href={`/destinations/${d.id}`}>
                                                    Details
                                                </Link>
                                                <Link className="galleryPrimaryBtn" href={`/booking/${d.id}`}>
                                                    Book
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
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