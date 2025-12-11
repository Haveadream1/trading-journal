import MainHeading from "../components/MainHeading";
import MetricSection from "../components/MetricSection";
import Header from "../components/Header";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DashboardPage({ }) {
    const trades = [
        { id: 1, asset: 'AAPL', direction: 'Buy', outcome: 'Win', date: '2024-01-15', netPNL: 200},
        { id: 2, asset: 'NVDA', direction: 'Sell', outcome: 'Loss', date: '2024-01-16', netPNL: -100},
        { id: 3, asset: 'AUD/USD', direction: 'Buy', outcome: 'Win', date: '2024-01-17', netPNL: 150},
        { id: 4, asset: 'ETH', direction: 'Sell', outcome: 'Win', date: '2024-01-18', netPNL: 350},
        { id: 5, asset: 'BTC', direction: 'Buy', outcome: 'Loss', date: '2024-01-19', netPNL: -200},
        { id: 6, asset: 'USD coin', direction: 'Sell', outcome: 'Loss', date: '2024-01-20', netPNL: -150},
    ];

    return (
        <>
            <Header />
            <main className="dashboard-page">
                <MainHeading 
                    titleValue="Dashboard"
                    text="Welcome H, here is a global overview of your performance"
                />

                <div className="performance-metrics-grid">
                    <MetricSection 
                        titleId="metric-heading-total-pnl" 
                        titleValue="Total P/L" 
                        text="15,150.25 €" 
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
                    <ResponsiveContainer className="trade-results-graphic"> {/* Allow to fix issue of page resizing with this recharts import */}
                        <AreaChart responsive data={trades}>
                            <XAxis dataKey="date" />
                            <YAxis width="auto" type="number" />
                            <Tooltip />
                            <Area type="monotone" dataKey="netPNL" stroke="#11D473" fill="#11D473" />
                        </AreaChart>
                    </ResponsiveContainer>

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
        </>
    );
}