import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useStatistics } from "../context/StatisticsContext";

export default function AnalyticSection({   
    titleId,
    titleValue,
    text,
    numberTradesPerDateGraph,
    averageGraph,
    tradesData,
    avgData
}) {
    const { analyticSectionColor, isLoading } = useStatistics();

    // Loading render separate from main render
    if (isLoading) {
        return (
            <section className="analytic-section" aria-labelledby={titleId}>
                <h2 id={titleId}>{titleValue}</h2>
                {text && (
                    <p>Loading...</p>
                )}
                {numberTradesPerDateGraph && (
                    <p>Loading...</p>
                )}
                {averageGraph && (
                    <p>Loading...</p>
                )}
            </section>
        )
    }

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
                        <Bar dataKey="trade_count" fill={analyticSectionColor[0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {averageGraph && (
                <ResponsiveContainer>
                    <PieChart responsive>
                        {/* datakey has avgData.value, we just map to assign colors to cell depending on index */}
                        <Pie data={avgData} label="name" dataKey="value">
                            {avgData.map((data, index) => (
                                <Cell key={index} fill={analyticSectionColor[index % analyticSectionColor.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            )}
        </section>
    );
}
