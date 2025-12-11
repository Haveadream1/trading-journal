import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import AnalyticSection from "../components/AnalyticSection";
import Header from "../components/Header";
import MainHeading from "../components/MainHeading";


export default function AnalyticsPage() {
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
        <>
            <Header />
            <main className="analytics-page">
                <MainHeading 
                    titleValue="Analytics"
                    text="Discover you results in a simple way"
                />

                <div className="analytics-grid">
                    <div className="analytics-sub-left-grid">
                        <ResponsiveContainer className="analytic-graph">
                            <BarChart responsive data={trades}>
                                <XAxis dataKey="date" />
                                <YAxis dataKey="netPNL"/>
                                <Bar dataKey="netPNL" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>

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

                        <ResponsiveContainer className="analytic-graph">
                            <PieChart responsive>
                                <Pie 
                                    data={data}
                                    labelLine={false}
                                    label="name"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </>
    );
}
