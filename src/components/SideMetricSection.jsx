import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
    return (
        <section className={graphMetric ? ("trade-results-graphic") : ("side-metric-section")} aria-labelledby={titleId}>
            <h3 id={titleId}>{titleValue}</h3>
            {graphMetric && (
                <ResponsiveContainer> {/* Allow to fix issue of page resizing with this recharts import */}
                    <AreaChart responsive data={trades}>
                        <XAxis dataKey='trade_date' />
                        <YAxis width="auto" type="net_pnl" />
                        <Tooltip />
                        <Area type="monotone" dataKey="net_pnl" stroke="#11D473" fill="#11D473" />
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
                            <a href={article.link} className="article-link" target="_blank" rel="noopener noreferrer">{article.tickers}</a>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
