export default function Footer() {
    return (
        <footer className="footer">
            <div className="sitefooterGrid">
                <div>
                    <div className="sitefooterTitle">Roamer</div>
                    <p className="muted">Discover places. Book experiences. Travel smarter.</p>
                </div>
                <div>
                    <div className="sitefooterTitle">Links</div>
                    <p className="muted">Home · Destinations · Booking</p>
                </div>
                <div>
                    <div className="sitefooterTitle">Support</div>
                    <p className="muted">help@roamer.example</p>
                </div>
            </div>
            <div className="footerBottom muted">© {new Date().getFullYear()} Roamer</div>
        </footer>
    );
}
