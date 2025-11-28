import MainHeading from "../components/MainHeading";

export default function DashboardPage({ }) {
    return (
        <main className="dashboard-page">
            <MainHeading 
                h1="Dashboard"
                text="Welcome H, here is a global overview of your performance"
            />

            <div className="performance-metrics-grid">
                <section className="metric-section" aria-labelledby="metric-heading-total-pnl">
                    <h3 id="metric-heading-total-pnl">Total P/L</h3>
                    <p className="metric-value">15,150.25 $</p>
                </section>

                <section className="metric-section" aria-labelledby="metric-heading-win-rate">
                    <h3 id="metric-heading-win-rate">Win Rate</h3>
                    <p className="metric-value">75.2 %</p>
                </section>

                <section className="metric-section" aria-labelledby="metric-heading-profit-factor">
                    <h3 id="metric-heading-profit-factor">Profit factor</h3>
                    <p className="metric-value">2.12</p>
                </section>
            </div>

            <div className="graphic-metrics-grid">
                <img className="trade-results-graphic" src="" alt="Trade graphic" loading="lazy" />

                <section className="side-metric-section" aria-labelledby="side-metric-heading-asset">
                    <h3 id="side-metric-heading-asset">Most traded asset</h3>
                    <p className="asset-value">XAU / USD</p>
                    <p className="trade-count">48 Trades</p>
                </section>

                <section className="side-metric-section" aria-labelledby="side-metric-heading-economic-event">
                    <h3 id="side-metric-heading-economic-event">Upcoming economic red events:</h3>
                    <ul className="economic-event-list">
                        <li className="economic-event-value">Core PPI / 2  PM / USD</li>
                        <li className="economic-event-value">Retail sales / 2: 30PM / CHF</li>
                    </ul>
                </section>
            </div>
        </main>
    );
}

