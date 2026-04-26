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
    // const trades = [
    //     { id: 1, asset: 'AAPL', direction: 'Buy', outcome: 'Win', date: '2024-01-15', netPNL: 200},
    //     { id: 2, asset: 'NVDA', direction: 'Sell', outcome: 'Loss', date: '2024-01-16', netPNL: -100},
    //     { id: 3, asset: 'AUD/USD', direction: 'Buy', outcome: 'Win', date: '2024-01-17', netPNL: 150},
    //     { id: 4, asset: 'ETH', direction: 'Sell', outcome: 'Win', date: '2024-01-18', netPNL: 350},
    //     { id: 5, asset: 'BTC', direction: 'Buy', outcome: 'Loss', date: '2024-01-19', netPNL: -200},
    //     { id: 6, asset: 'USD coin', direction: 'Sell', outcome: 'Loss', date: '2024-01-20', netPNL: -150},
    // ];

    // ! 2 issues data is not ordered, negative values are not represented
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
                    {data.map((article, key) => (  // Loop through the fetched data to display the latest articles
                        <li key={key}>
                            <a href={article.link} className="article-link" target="_blank" rel="noopener noreferrer">{article.tickers}</a>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}