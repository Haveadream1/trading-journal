export default function Header({ }) {
    return (
        <header role="banner">
            <div className="icon-title-container">
                <span className="material-symbols-outlined website-icon" alt="Trading journal icon" loading="lazy">candlestick_chart</span>
                <h2 className="website-title">Trading Journal</h2>
            </div>

            <nav aria-label="Website navigation">
                <a href="/" aria-current="page" className="nav-link nav-link-active">Dashboard</a>
                <a href="/journal" className="nav-link">Journal</a>
                <a href="/analytics" className="nav-link">Analytics</a>
            </nav>

            <div className="profile-container">
                <a href="/profile" className="profile-link" aria-label="View user profile"></a>
            </div>
        </header>
    )
}

{/* <img class="profile-picture" src="" alt="User profile picture" loading="lazy"></img> */}