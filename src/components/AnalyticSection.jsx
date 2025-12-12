import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function AnalyticSection({
    titleId,
    titleValue,
    text,
    monthlyGraph,
    averageGraph
}) {
    const trades = [
        { id: 1, asset: 'AAPL', direction: 'Buy', outcome: 'Win', date: '2024-01-15', netPNL: 200},
        { id: 2, asset: 'NVDA', direction: 'Sell', outcome: 'Loss', date: '2024-01-16', netPNL: -100},
        { id: 3, asset: 'AUD/USD', direction: 'Buy', outcome: 'Win', date: '2024-01-17', netPNL: 150},
        { id: 4, asset: 'ETH', direction: 'Sell', outcome: 'Win', date: '2024-01-18', netPNL: 350},
        { id: 5, asset: 'BTC', direction: 'Buy', outcome: 'Loss', date: '2024-01-19', netPNL: -200},
        { id: 6, asset: 'USD coin', direction: 'Sell', outcome: 'Loss', date: '2024-01-20', netPNL: -150},
    ];

    const PNLtrades = [
        { id: 1, asset: 'AAPL', direction: 'Buy', outcome: 'Win', date: '2024-01-15', netPNL: 200, fill: '#00C49F'},
        { id: 2, asset: 'NVDA', direction: 'Sell', outcome: 'Loss', date: '2024-01-16', netPNL: -100, fill:  '#d41111'},
    ];

    // Look at example from recharts if we need to change the type of graphs
    const data = [
        { name: 'Average win', value: 70 }, // represents percents
        { name: 'Average loss', value: 30 },
    ];
    const COLORS = ['#00C49F', '#c41a00ff'];

    return (
        <section className="analytic-section" aria-labelledby={titleId}>
            <h2 id={titleId}>{titleValue}</h2>
            {text && (
                <p>{text}</p>
            )}
            {monthlyGraph && (
                <ResponsiveContainer>
                    <BarChart responsive data={trades}>
                        <XAxis dataKey="date" />
                        <YAxis dataKey="netPNL"/>
                        <Bar dataKey="netPNL" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            )}
            {averageGraph && (
                <ResponsiveContainer>
                    <PieChart responsive>
                        <Pie data={data} label="name" dataKey="value">
                            {data.map((key, index) => (
                                <Cell key={key} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            )}
        </section>
    );
}
{/*  Assign key to identify elements with REACT, follor fill as recharts docs */}