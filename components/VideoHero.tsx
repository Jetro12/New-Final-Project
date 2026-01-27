import Link from "next/link";

export default function VideoHero() {
    const youtubeId = "Scxs7L0vhZ4";

    return (
        <section className="hero">
            <iframe
                className="heroMedia"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&modestbranding=1`}
                title="Roamer Destinations"
                frameBorder={0}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />

            <div className="heroOverlay">
                <h1>Roamer</h1>
                <p>
                    Find stunning destinations, compare options, and book your next escape —
                    all in one clean, fast travel experience.
                </p>

                <div className="heroCtas">
                    <Link className="btn" href="/destinations">
                        Explore destinations
                    </Link>
                    <Link className="btn accent" href="/auth">
                        Sign up / Login
                    </Link>
                </div>
            </div>
        </section>
    );
}
