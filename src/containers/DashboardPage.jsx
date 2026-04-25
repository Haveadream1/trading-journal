import MainHeading from "../components/MainHeading";
import MetricSection from "../components/MetricSection";
import Header from "../components/Header";
import SideMetricSection from "../components/SideMetricSection";
import { useData } from "../data/DataContext";
import { useStatistics } from '../data/StatisticsContext'
import { useEffect } from "react";

export default function DashboardPage() {
    const articles = useData();
    const stats = useStatistics();

    useEffect(() => {
        console.log(stats);
    }, [])

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
                        // text="15,150.25 €" 
                        text={`${stats.totalPnl} €`}
                    />

                    <MetricSection 
                        titleId="metric-heading-win-rate" 
                        titleValue="Win Rate" 
                        // text="75.2 %" 
                        text={`${stats.winRate} %`}
                    />

                    <MetricSection 
                        titleId="metric-heading-profit-factor" 
                        titleValue="Profit factor" 
                        // text="2.12" 
                        text={`${stats.profitFactor}`}
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
                        textAsset={`${stats.mostTradedAsset}`}
                        textCount={`${stats.mostTradedAssetCount} trades`}
                    />

                    <SideMetricSection 
                        titleId="side-metric-heading-articles" 
                        titleValue="Recent financial articles:"
                        data={articles} 
                        articleMetric="true" 
                    />
                </div>
            </main>
        </>
    );
}