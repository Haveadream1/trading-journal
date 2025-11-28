import MainHeading from "../components/MainHeading";

export default function AnalyticsPage() {
    return (
        <main className="analytics-page">
            <MainHeading 
                titleValue="Analytics"
                text="Discover you results in a simple way"
            />

            <div className="analytics-grid">
                <div className="analytics-sub-left-grid">
                    <section className="analytic-section" aria-labelledby="monthly-results-heading">
                        <h2 id="monthly-results-heading">Monthly results</h2>
                        <img src="" alt="Monthly results graph" loading="lazy" />
                    </section>

                    <section className="analytic-section" aria-labelledby="weekly-results-heading">
                        <h2 id="weekly-results-heading">Weekly results</h2>
                        <img src="" alt="Weekly results graph" loading="lazy" />
                    </section>

                    <section className="analytic-section" aria-labelledby="biggest-win-heading">
                        <h2 id="biggest-win-heading">Biggest win</h2>
                        <img src="" alt="Biggest win graph" loading="lazy" />
                    </section>
                </div>

                <div className="analytics-sub-right-grid">
                    <section className="analytic-section" aria-labelledby="account-grow-heading">
                        <h2 id="account-grow-heading">Account grow</h2>
                        <img src="" alt="Account grow graph" loading="lazy" />
                    </section>

                    <section className="analytic-section" aria-labelledby="average-win-loss-heading">
                        <h2 id="average-win-loss-heading">Average win/loss</h2>
                        <img src="" alt="Average win/loss graph" loading="lazy" />
                    </section>
                </div>
            </div>
        </main>
    );
}