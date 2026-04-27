import { useEffect } from "react";
import AnalyticSection from "../components/AnalyticSection";
import Header from "../components/Header";
import MainHeading from "../components/MainHeading";
import { useStatistics } from "../data/StatisticsContext";

export default function AnalyticsPage() {
    const stats = useStatistics();

    const formatDate = (tradeList) => {
        // To avoid errors when we wait for data
        if (!tradeList) {
            return []; 
        }

        // Loop through each object and format the trade date
        return tradeList.map(trade => ({
            ...trade,
            net_pnl: parseFloat(trade.net_pnl),
            trade_date: trade.trade_date?.slice(0, 10),
            trade_count: parseInt(trade.trade_count)
        }));
    }

    const createAverageDataObj = (avgWin, avgLoss) => {
        if (!avgWin || !avgLoss) {
            return [];
        }

        const avgData = [
            {name: 'Average win', value: avgWin},
            {name: 'Average loss', value: avgLoss}
        ];
        return avgData;
    }

    useEffect(() => {
        console.log(formatDate(stats.tradeList), stats.avgWin, stats.avgLoss);
    }, []);

    // TODO: if we keep total number of trades, then need to check in the code if we need to replace account-grow
    return (
        <>
            <Header />
            <main className="analytics-page">
                <MainHeading 
                    titleValue="Analytics"
                    text="Discover you results in a simple way"
                />

                {/* // ! change ID and class name of monthly */}
                <div className="analytics-grid">
                    <div className="analytics-sub-left-grid">
                        <AnalyticSection
                            titleId="monthly-graph-heading"
                            titleValue="Numbers of trades per date"
                            monthlyGraph="true"
                            trades={formatDate(stats.tradeList)}
                        />

                        <AnalyticSection
                            titleId="weekly-results-heading"
                            titleValue="Weekly results"
                            // text="+856,40 €"
                            text={`+ ${stats.weeklyPnl} €`}
                        />

                        <AnalyticSection
                            titleId="biggest-win-heading"
                            titleValue="Biggest win"
                            // text="250,24 €"
                            text={`${stats.biggestWin} €`}
                        />
                    </div>

                    <div className="analytics-sub-right-grid">
                        {/* <AnalyticSection
                            titleId="account-grow-heading"
                            titleValue="Monthly account grow"
                            text="+32%"
                        /> */}
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
