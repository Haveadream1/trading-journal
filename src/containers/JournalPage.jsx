/* Style import */
import '../styles/JournalStyle.css'

import MainHeading from "../components/MainHeading";
import TableRow from "../components/TableRow";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function JournalPage() {
    const [trades, setTrades] = useState([]);

    // Debugging purpose
    // useEffect(() => {
    //     console.log(tradeHistory, formData);
    // }, [tradeHistory, formData]);

    // Only fetch when the component is mounted
    useEffect(() => {
        // Fetch the trades from database
        const fetchTrades = async () => {
            try {
                const response = await fetch('/api/trades'); // Simplier form because GET don't need to send data in body
                const data = await response.json();
                
                if (response.ok) {
                    console.log('Successfully fetched trades');
                    setTrades(data);
                } else {
                    console.error('Failed to fetch trades', data.error);
                }

            } catch (err) {
                console.error('Error fetching trades from database', err.message);
            }
        }
        fetchTrades();
    },[])

    return (
        <>
            <Header />
            <main className="journal-page">
                <MainHeading 
                    titleValue="Trade journal"
                    text="A complete history of your recent trades"
                />

                <table>
                    <thead>
                        <tr className="table-heading-row">
                            <th>Date</th>
                            <th>Asset</th>
                            <th>Direction</th>
                            <th>Outcome</th>
                            <th>Net PnL</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* // For now use the data stored in the context before switching to SQL and Node.js */}
                        {trades.length > 0 ? (
                            // Map each fetched trade as a TableRow component
                            trades.map((trade) =>  
                                <TableRow
                                    key={trade.id} // Use the primary key from the database as key index
                                    date={trade.trade_date?.slice(0, 10)}
                                    asset={trade.asset} // Refer to the column name in database
                                    direction={trade.direction}
                                    outcome={trade.outcome}
                                    pnl={trade.net_pnl}
                                />
                            )
                        ):(
                            <>
                                <tr>
                                    <td>No saved trades yet</td> 
                                </tr>
                                <tr>
                                    <td>(Demo data displayed on Dashboard and analytics page)</td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>

                <a href="/tradeForm" className="add-new-trade-button" aria-label="Add a new trade">
                    <span className="material-symbols-outlined">add_2</span>
                </a>
            </main>
        </>
    );
}
