import AnalyticSection from "../components/AnalyticSection";
import Header from "../components/Header";
import MainHeading from "../components/MainHeading";

export default function AnalyticsPage() {
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
                            titleId="monthly-results-heading"
                            titleValue="Monthly results"
                            alt="Monthly results graph"
                        />
                        <AnalyticSection
                            titleId="weekly-results-heading"
                            titleValue="Weekly results"
                            alt="Weekly results graph"
                        />
                        <AnalyticSection
                            titleId="biggest-win-heading"
                            titleValue="Biggest win"
                            alt="Biggest win graph"
                        />
                    </div>

                    <div className="analytics-sub-right-grid">
                        <AnalyticSection
                            titleId="account-grow-heading"
                            titleValue="Account grow"
                            alt="Account grow graph"
                        />
                        <AnalyticSection
                            titleId="average-win-loss-heading"
                            titleValue="Average win/loss"
                            alt="Average win/loss grap"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
