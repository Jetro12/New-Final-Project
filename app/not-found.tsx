import Link from "next/link";

export default function NotFound() {
    return (
        <div className="page">
            <section className="section">
                <h2>Page not found</h2>
                <p className="muted">That page doesn’t exist. Let’s get you back on track.</p>
                <Link className="btn" href="/">
                    Go home
                </Link>
            </section>
        </div>
    );
}
