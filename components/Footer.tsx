export default function Footer() {
    return (
        <footer className="footer">
            <div className="siteFooterGrid">
                <div>
                    <div className="siteFooterTitle">Roamer</div>
                    <p className="muted">Discover places. Book experiences. Travel smarter.</p>
                </div>
                <div>
                    <div className="siteFooterTitle">Links</div>
                    <p className="muted">Home · Destinations · Booking</p>
                </div>
                <div>
                    <div className="siteFooterTitle">Support</div>
                    <p className="muted">help@roamer.uk</p>
                </div>
            </div>
            <div className="footerBottom muted">© {new Date().getFullYear()} Roamer</div>
        </footer>
    );
}