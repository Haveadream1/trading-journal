/* Style import */
import '../styles/AnalyticsStyle.css'

import AnalyticSection from "../components/AnalyticSection";
import Header from "../components/Header";
import MainHeading from "../components/MainHeading";
import { useStatistics } from "../data/StatisticsContext";

export default function AnalyticsPage() {
    const {stats, formatDate} = useStatistics();

    const createAverageDataObj = (avgWin, avgLoss) => {
        // this check allows 0 values, contrary to !avgWin
        if (avgWin === undefined || avgLoss === undefined) {
            return [];
        }

        return [
            {name: 'Average win', value: avgWin},
            {name: 'Average loss', value: avgLoss}
        ];
    }

    // Debuggin purpose
    // useEffect(() => {
    //     console.log(formatDate(stats.tradeList), stats.avgWin, stats.avgLoss);
    // }, []);

    return (
        <>
            <Header />
            <main className="analytics-page">
                <MainHeading 
                    titleValue="Analytics"
                    text="Discover your results in a simple way"
                />

                <div className="analytics-grid">
                    <div className="analytics-sub-left-grid">
                        <AnalyticSection
                            titleId="number-trades-per-date-heading"
                            titleValue="Number of trades per date"
                            numberTradesPerDateGraph="true"
                            tradesData={formatDate(stats.tradeList)}
                        />

                        <AnalyticSection
                            titleId="weekly-results-heading"
                            titleValue="Weekly results"
                            text={`+ ${stats.weeklyPnl} €`}
                        />

                        <AnalyticSection
                            titleId="biggest-win-heading"
                            titleValue="Biggest win"
                            text={`${stats.biggestWin} €`}
                        />
                    </div>

                    <div className="analytics-sub-right-grid">
                        <AnalyticSection
                            titleId="total-number-trades-heading"
                            titleValue="Total number of trades"
                            text={`${stats.totalTrades}`}
                        />

                        <AnalyticSection
                            titleId="average-graph-heading"
                            titleValue="Average Win/Loss"
                            averageGraph="true"
                            avgData={createAverageDataObj(stats.avgWin, stats.avgLoss)}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
