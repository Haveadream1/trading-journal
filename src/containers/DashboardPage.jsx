import MainHeading from "../components/MainHeading";
import MetricSection from "../components/MetricSection";

export default function DashboardPage({ }) {
    return (
        <main className="dashboard-page">
            <MainHeading 
                titleValue="Dashboard"
                text="Welcome H, here is a global overview of your performance"
            />

            <div className="performance-metrics-grid">
                <MetricSection 
                    titleId="metric-heading-total-pnl" 
                    titleValue="Total P/L" 
                    text="15,150.25 $" 
                />

                <MetricSection 
                    titleId="metric-heading-win-rate" 
                    titleValue="Win Rate" 
                    text="75.2 %" 
                />

                <MetricSection 
                    titleId="metric-heading-profit-factor" 
                    titleValue="Profit factor" 
                    text="2.12" 
                />
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

