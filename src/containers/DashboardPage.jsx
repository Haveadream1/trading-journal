import MainHeading from "../components/MainHeading";
import MetricSection from "../components/MetricSection";
import Header from "../components/Header";
import SideMetricSection from "../components/SideMetricSection";

export default function DashboardPage({ }) {
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
                    <SideMetricSection 
                        titleId="metric-heading-graph" 
                        titleValue="Trades graphic" 
                        graphMetric="true" 
                    />

                    <SideMetricSection 
                        titleId="side-metric-heading-asset" 
                        titleValue="Most traded asset" 
                        assetMetric="true" 
                    />

                    <SideMetricSection 
                        titleId="side-metric-heading-economic-even" 
                        titleValue="Upcoming economic red events:" 
                        economicMetric="true" 
                    />
                </div>
            </main>
        </>
    );
}