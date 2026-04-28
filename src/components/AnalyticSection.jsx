import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function AnalyticSection({
    titleId,
    titleValue,
    text,
    numberTradesPerDateGraph,
    averageGraph,
    tradesData,
    avgData
}) {
    // Note: colors differents from css styles
    const COLORS = ['#82dfb2', '#cf5a5a'];

    return (
        <section className="analytic-section" aria-labelledby={titleId}>
            <h2 id={titleId}>{titleValue}</h2>
            {text && (
                <p>{text}</p>
            )}
            {numberTradesPerDateGraph && (
                <ResponsiveContainer>
                    <BarChart responsive data={tradesData}>
                        <XAxis dataKey="trade_date" />
                        <YAxis dataKey="trade_count"/>
                        <Bar dataKey="trade_count" fill={COLORS[0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {averageGraph && (
                <ResponsiveContainer>
                    <PieChart responsive>
                        {/* datakey has avgData.value, we just map to assign colors to cell depending on index */}
                        <Pie data={avgData} label="name" dataKey="value">
                            {avgData.map((data, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            )}
        </section>
    );
}