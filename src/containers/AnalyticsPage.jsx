import AnalyticSection from "../components/AnalyticSection";
import Header from "../components/Header";
import MainHeading from "../components/MainHeading";
import { useStatistics } from "../data/StatisticsContext";

export default function AnalyticsPage() {
    const stats = useStatistics();

    // TODO: if we keep total number of trades, then need to check in the code if we need to replace account-grow
    return (
        <>
            <Header />
            <main className="analytics-page">
                <MainHeading 
                    titleValue="Analytics"
                    text="Discover you results in a simple way"
                />

                <div className="analytics-grid">
                    <div className="analytics-sub-left-grid">
                        <AnalyticSection
                            titleId="monthly-graph-heading"
                            titleValue="Monthly PNL"
                            monthlyGraph="true"
                        />

                        <AnalyticSection
                            titleId="weekly-results-heading"
                            titleValue="Weekly results"
                            text="+856,40 €"
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
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
