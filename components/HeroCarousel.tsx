"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type Slide = {
    id: string;
    title: string;
    subtitle: string;
    hero: string;
    thumbs: string[];
};

const slides: Slide[] = [
    {
        id: "indonesia",
        title: "INDONESIA",
        subtitle: "Breathtaking islands & volcano views",
        hero: "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1600",
        thumbs: [
            "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
    },
    {
        id: "thailand",
        title: "THAILAND",
        subtitle: "Temples, beaches, and street food",
        hero: "https://images.pexels.com/photos/358229/pexels-photo-358229.jpeg?auto=compress&cs=tinysrgb&w=1600",
        thumbs: [
            "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/615327/pexels-photo-615327.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
    },
    {
        id: "bali",
        title: "BALI",
        subtitle: "Turquoise waters & calm escapes",
        hero: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600",
        thumbs: [
            "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
    },
];

function initials(name?: string | null) {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    const a = parts[0]?.[0] ?? "U";
    const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return (a + b).toUpperCase();
}

export default function HeroCarousel() {
    const { data: session, status } = useSession();
    const user = session?.user;

    const [index, setIndex] = useState<number>(0);
    const slide = slides[index];
    const dots = useMemo(() => slides.map((s) => s.id), []);

    useEffect(() => {
        const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="roamerHeroStage">
            <div className="roamerHeroCard">
                <div className="roamerTopbar">
                    <Link href="/" className="roamerBrandLink" aria-label="Roamer Home">
                        <span className="roamerBrandMark">➤</span>
                        <span className="roamerBrandText">Roamer</span>
                    </Link>

                    <div className="roamerNavCenter">
                        <Link href="/destinations" className="roamerNavLink">
                            Destinations
                        </Link>
                        <Link href="/booking/dubai" className="roamerNavLink">
                            Booking
                        </Link>
                    </div>

                    <div className="roamerNavRight">
                        {status === "loading" ? (
                            <span className="roamerLink roamerLinkPill" style={{ opacity: 0.75 }}>
                Loading…
              </span>
                        ) : user ? (
                            <Link
                                href="/profile"
                                className="roamerLink roamerLinkPill"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "8px 12px",
                                }}
                                aria-label="Go to profile"
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt="Profile"
                                        referrerPolicy="no-referrer"
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 999,
                                            objectFit: "cover",
                                            border: "1px solid rgba(255,255,255,0.25)",
                                        }}
                                    />
                                ) : (
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 999,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 900,
                                            background: "rgba(255,255,255,0.12)",
                                            border: "1px solid rgba(255,255,255,0.22)",
                                            color: "rgba(255,255,255,0.92)",
                                        }}
                                    >
                    {initials(user.name)}
                  </span>
                                )}
                                <span style={{ fontWeight: 900 }}>Profile</span>
                            </Link>
                        ) : (
                            <Link href="/auth" className="roamerLink roamerLinkPill">
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>

                <div className="roamerMain" style={{ backgroundImage: `url(${slide.hero})` }}>
                    <div className="roamerOverlay" />

                    <div className="roamerLeft">
                        <div className="roamerKicker">Explore the world</div>
                        <div className="roamerTitle">{slide.title}</div>
                        <div className="roamerSub">{slide.subtitle}</div>

                        <div className="roamerActions">
                            <Link className="roamerBtn" href="/destinations">
                                Explore
                            </Link>
                            <button
                                type="button"
                                className="roamerBtn ghost"
                                onClick={() => setIndex((i) => (i + 1) % slides.length)}
                            >
                                Next
                            </button>
                        </div>

                        <div className="roamerDots">
                            {dots.map((d, i) => (
                                <button
                                    key={d}
                                    type="button"
                                    className={`roamerDot ${i === index ? "active" : ""}`}
                                    onClick={() => setIndex(i)}
                                    aria-label={`Go to ${d}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="roamerRight">
                        {slide.thumbs.map((src, i) => (
                            <button
                                key={`${slide.id}-${i}`}
                                type="button"
                                className={`roamerThumb t${i + 1}`}
                                onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
                                aria-label="Next slide"
                            >
                                <img
                                    src={src}
                                    alt="preview"
                                    loading="eager"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    onError={(e) => {
                                        // If a thumb fails, fall back to the current hero image
                                        e.currentTarget.src = slide.hero;
                                    }}
                                />
                                <div className="roamerPlay">▶</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
