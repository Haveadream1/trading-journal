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

    //  ! NOTE: maybe the first graph should be the number of trades

    // TODO: net_pnl should take the previous value and add up
    // TODO: need to consider also negative values
    // !: dashboardPage and analyticsPage share this function, -> put in context ?
    const formatDate = (tradeList) => {
        // To avoid errors when we wait for data
        if (!tradeList) {
            return []; 
        }

        // Loop through each object and format the trade date
        return tradeList.map(trade => ({
            ...trade,
            net_pnl: parseFloat(trade.net_pnl),
            trade_date: trade.trade_date?.slice(0, 10)
        }));
    }

    useEffect(() => {
        console.log(stats.tradeList);
        //formatDate(stats.tradeList);
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
                        titleValue="Total PnL" 
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
                        titleValue="PnL Over time" 
                        graphMetric="true"
                        trades={formatDate(stats.tradeList)}
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