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
                            titleId="monthly-graph-heading"
                            titleValue="Monthly PNL"
                            monthlyGraph="true"
                        />

                        <AnalyticSection
                            titleId="weekly-results-heading"
                            titleValue="Weekly results"
                            text="+856,40 €"
                        />

                        <AnalyticSection
                            titleId="biggest-win-heading"
                            titleValue="Biggest win"
                            text="250,24 €"
                        />
                    </div>

                    <div className="analytics-sub-right-grid">
                        <AnalyticSection
                            titleId="account-grow-heading"
                            titleValue="Monthly account grow"
                            text="+32%"
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
