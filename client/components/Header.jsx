import { Link, useLocation } from "react-router";
import "../styles/HeaderStyle.css";

export default function Header() {
    // We fetch the location obj of the current displayed page with the useLocation hook
    const location = useLocation();
    const path = location.pathname;

    const navLinks = [
        {currentPath: '/', name: 'Dasboard'},
        {currentPath: '/journal', name: 'Journal'},
        {currentPath: '/analytics', name: 'Analytics'}
    ];

    return (
        <header role="banner">
            <div className="icon-title-container">
                {/* hide the icon from screen readers as it's a decorative element */}
                <span className="material-symbols-outlined website-icon" aria-hidden="true">candlestick_chart</span>
                <h2 className="website-title">Trading Journal</h2>
            </div>

            <nav aria-label="Website navigation">
                {navLinks.map(({currentPath, name}) => (
                    <Link
                        // we can use the current path as a key as it's unique
                        key={currentPath} 

                        // redirect to the specified path
                        to={currentPath}

                        // improve accessibility by telling screen readers which link is active
                        aria-current={path === currentPath && 'page'}
                        className='nav-link' 
                    >
                        {name}
                    </Link>
                ))}
            </nav>

            <div className="profile-container">
                <Link to="/profile" className="profile-link" aria-label="View user profile"></Link>
            </div>
        </header>
    );
}
