/* Style import */
import '../styles/DashboardStyle.css'

import MainHeading from "../components/MainHeading";
import MetricSection from "../components/MetricSection";
import Header from "../components/Header";
import SideMetricSection from "../components/SideMetricSection";
import { useData } from "../context/ArticlesContext";
import { useStatistics } from '../context/StatisticsContext'
import { useProfile } from '../context/ProfileContext';

export default function DashboardPage() {
    const articles = useData();
    const {stats, formatDate} = useStatistics();
    const { profileData } = useProfile();

    // Debugging purpose
    // useEffect(() => {
    //     console.log(stats.tradeList);
    // }, [])

    return (
        <>
            <Header />
            <main className="dashboard-page">
                <MainHeading 
                    titleValue="Dashboard"
                    text={`Welcome ${profileData["username-input"]}, here is a global overview of your performance`}
                />

                <div className="performance-metrics-grid">
                    <MetricSection 
                        titleId="metric-heading-total-pnl" 
                        titleValue="Total PnL" 
                        text={`${stats.totalPnl} €`}
                    />

                    <MetricSection 
                        titleId="metric-heading-win-rate" 
                        titleValue="Win Rate" 
                        text={`${stats.winRate} %`}
                    />

                    <MetricSection 
                        titleId="metric-heading-profit-factor" 
                        titleValue="Profit factor" 
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