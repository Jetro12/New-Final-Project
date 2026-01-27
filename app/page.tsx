import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";

const packages = [
    {
        id: "dubai",
        title: "Dubai & Abu Dhabi",
        nights: "11 Days 10 Nights",
        price: "£3,499",
        image:
            "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        id: "sahara",
        title: "Urban & Desert Duo",
        nights: "8 Days 7 Nights",
        price: "£2,199",
        image:
            "https://images.pexels.com/photos/3873672/pexels-photo-3873672.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        id: "marrakesh",
        title: "Marrakesh Escape",
        nights: "6 Days 5 Nights",
        price: "£1,199",
        image:
            "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
];

const articles = [
    {
        id: "uae-ramadan",
        title: "Travelling during Ramadan in the UAE",
        date: "06 Dec 2026",
        image:
            "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        id: "dubai-guide",
        title: "A quick guide to exploring Dubai",
        date: "01 Dec 2026",
        image:
            "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
        id: "agents-tips",
        title: "Travel agent tips: booking smarter",
        date: "28 Nov 2026",
        image:
            "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
];

export default function HomePage() {
    return (
        <div className="homePage">
            <section className="homeHeroSection">
                <HeroCarousel />
                <SearchBar />
            </section>

            {/* PACKAGES */}
            <section className="sectionWrap sectionLight sectionAfterHero">
                <div className="wrap">
                    <div className="sectionHead">
                        <h2>Curated packages</h2>
                        <p>Hand-picked trips with clear pricing and quick booking.</p>
                    </div>

                    <div className="cardGrid">
                        {packages.map((p) => (
                            <div className="infoCard" key={p.id}>
                                <img className="infoCardImg" src={p.image} alt={p.title} />
                                <div className="infoCardBody">
                                    <div className="infoCardTitle">{p.title}</div>
                                    <div className="infoCardMeta">{p.nights}</div>
                                    <div className="infoCardPrice">{p.price}</div>
                                    <Link className="btnPrimary" href={`/booking/${p.id}`}>
                                        Book now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="centerActions">
                        <Link className="btnGhost" href="/destinations">
                            Explore all destinations →
                        </Link>
                    </div>
                </div>
            </section>

            {/* EVENTS + ABOUT */}
            <section className="sectionWrap sectionSoft">
                <div className="wrap">
                    <div className="split">
                        <div>
                            <div className="sectionHead left">
                                <h2>Events & conventions</h2>
                                <p>Plan your travel around experiences happening in top cities.</p>
                            </div>

                            <div className="miniGrid">
                                <div className="miniCard">
                                    <img
                                        src="https://images.pexels.com/photos/358229/pexels-photo-358229.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                        alt="event"
                                    />
                                    <div className="miniCardBody">
                                        <div className="miniCardTitle">Beyond the Skyline</div>
                                        <div className="miniCardMeta">19 Oct 2026</div>
                                    </div>
                                </div>

                                <div className="miniCard">
                                    <img
                                        src="https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                        alt="event"
                                    />
                                    <div className="miniCardBody">
                                        <div className="miniCardTitle">FutureX: Innovation</div>
                                        <div className="miniCardMeta">06 Oct 2026</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="aboutBox">
                            <h3>About Roamer</h3>
                            <p>
                                Roamer makes trip planning simple: discover destinations, compare
                                options, and book in a few clicks.
                            </p>
                            <Link className="btnPrimary" href="/destinations">
                                Start exploring
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ARTICLES */}
            <section className="sectionWrap sectionDark">
                <div className="wrap">
                    <div className="sectionHead">
                        <h2>Travel articles</h2>
                        <p>Short reads to help you plan smarter.</p>
                    </div>

                    <div className="cardGrid">
                        {articles.map((a) => (
                            <div className="infoCard darkCard" key={a.id}>
                                <img className="infoCardImg" src={a.image} alt={a.title} />
                                <div className="infoCardBody">
                                    <div className="infoCardTitle">{a.title}</div>
                                    <div className="infoCardMeta">{a.date}</div>
                                    <button className="btnGhost" type="button">
                                        Read →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="sectionWrap sectionLight">
                <div className="wrap">
                    <div className="sectionHead">
                        <h2>What travellers say</h2>
                        <p>Real feedback from people using Roamer.</p>
                    </div>

                    <div className="testimonialCard">
                        <div className="avatar" />
                        <div>
                            <div className="testimonialName">Joseph David</div>
                            <div className="testimonialText">
                                “Roamer made it ridiculously easy to find a destination and plan
                                the trip.”
                            </div>
                            <div className="testimonialMeta">Customer</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section className="sectionWrap sectionContact">
                <div className="wrap footerWrap">
                    <div className="footerGrid">
                        <div className="footerInfo">
                            <h3>Contact</h3>
                            <p>Questions or reservations.</p>

                            <div className="footerMeta">
                                <span>support@roamer.example</span>
                                <span>+44 0000 000000</span>
                            </div>
                        </div>

                        <form className="footerForm" onSubmit={(e) => e.preventDefault()}>
                            <input className="footerField" placeholder="Full name" />
                            <input className="footerField" placeholder="Email" />
                            <textarea className="footerField" rows={3} placeholder="Message" />
                            <button className="footerBtn" type="button">
                                Send
                            </button>
                        </form>
                    </div>

                    <div className="footerBottom">© {new Date().getFullYear()} Roamer</div>
                </div>
            </section>
        </div>
    );
}
