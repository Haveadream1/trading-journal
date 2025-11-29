import { Link, useLocation } from "react-router";

export default function Header({ }) {
    const location = useLocation();
    const path = location.pathname;
    // With the path fetched of the current displayed page thanks to the router
    // We can render conditionally if the page is the one currently rendered

    return (
        <header role="banner">
            <div className="icon-title-container">
                <span className="material-symbols-outlined website-icon" alt="Trading journal icon" loading="lazy">candlestick_chart</span>
                <h2 className="website-title">Trading Journal</h2>
            </div>

            <nav aria-label="Website navigation">
                <Link 
                    to="/" 
                    aria-current={path === '/' && 'page'}
                    className="nav-link">
                    Dashboard
                </Link>
                <Link
                    to="/journal"
                    aria-current={path === '/journal' && 'page'}
                    className="nav-link">
                    Journal
                </Link>
                <Link 
                    to="/analytics" 
                    aria-current={path === '/analytics' && 'page'}
                    className="nav-link">
                    Analytics
                </Link>
            </nav>

            <div className="profile-container">
                <Link to="/profile" className="profile-link" aria-label="View user profile"></Link>
            </div>
        </header>
    );
}
