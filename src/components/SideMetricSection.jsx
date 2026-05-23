import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useStatistics } from "../data/StatisticsContext";

export default function SideMetricSection({ 
    titleId,
    titleValue,
    graphMetric,
    trades,
    assetMetric,
    articleMetric,
    data,
    textAsset,
    textCount
}) {
    const { sideMetricColor, isLoading } = useStatistics();

    // Create a loading render instead of putting everything in the main render for better code readability 
    if (isLoading) {
        return (
            <section className={graphMetric ? ("trade-results-graphic") : ("side-metric-section")} aria-labelledby={titleId}>
                <h3 id={titleId}>{titleValue}</h3>
                {graphMetric && (
                    <p>Loading...</p>
                )}
                {assetMetric && (
                    <>
                        <p className="asset-value">Loading...</p>
                        <p className="trade-count">Loading...</p>
                    </>
                )}
                {articleMetric && (
                    <p>Loading...</p>
                )}
            </section>
        );
    }

    // Main render
    return (
        <section className={graphMetric ? ("trade-results-graphic") : ("side-metric-section")} aria-labelledby={titleId}>
            <h3 id={titleId}>{titleValue}</h3>
            {graphMetric && (
                <ResponsiveContainer> {/* Allow to fix issue of page resizing with this recharts import */}
                    <AreaChart responsive data={trades}>
                        <XAxis dataKey='trade_date' />
                        <YAxis width="auto" type="net_pnl" />
                        <Tooltip />
                        <Area type="monotone" dataKey="net_pnl" stroke={sideMetricColor} fill={sideMetricColor} />
                    </AreaChart>
                </ResponsiveContainer>
            )}
            {assetMetric && (
                <>
                    <p className="asset-value">{textAsset}</p>
                    <p className="trade-count">{textCount}</p>
                </>
            )}
            {articleMetric && (
                <ul className="articles-list">
                    {/* Loop through the fetched data to display the latest articles */}
                    {data.map((article, key) => (
                        <li key={key}>
                            {/* Good practice with external links, use noopener and noreferrer for (security/performance) */}
                            <a href={article.link} className="article-link" target="_blank" rel="noopener noreferrer">
                                {article.tickers}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
