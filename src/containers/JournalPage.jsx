/* Style import */
import '../styles/JournalStyle.css'

import MainHeading from "../components/MainHeading";
import TableRow from "../components/TableRow";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useStatistics } from '../context/StatisticsContext';
import { Link, useNavigate } from 'react-router';
import { useForm } from '../context/FormContext';

export default function JournalPage() {
    const [isLoading, setIsLoading] = useState(true);

    const { refreshTrigger } = useStatistics();
    const { trades, setTrades, setSelectedUpdateTrade } = useForm();

    const navigate = useNavigate();

    // Fetch the trades from database
    const fetchTrades = async () => {
        setIsLoading(true);

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
        } finally {
            // Clean up loading state
            setIsLoading(false);
        }
    }

    const handleAddButton = () => {
        navigate("/tradeForm");
        // set it to null to use default values
        setSelectedUpdateTrade(null);
    }

    // Fetch on inital mount and when dependency value is modified
    useEffect(() => {
        fetchTrades();
    },[refreshTrigger])

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
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <tr>
                                {/* Span through the length */}
                                <td colSpan={6} className='table-loading-element'>Loading...</td>
                            </tr>
                        ) : trades.length === 0 ?(
                            <>
                                <tr>
                                    <td colSpan={6} className='table-loading-element'>No trades saved</td>
                                </tr>
                                <tr>
                                    <td colSpan={6} className='table-loading-element'>Loading demo trades</td>
                                </tr>
                            </>
                        ) : (
                            // Map each fetched trade as a TableRow component
                            trades.map((trade) =>  
                                <TableRow
                                    key={trade.id} // Use the primary key from the database as key index
                                    id={trade.id} // Pass key as a props to retrieve it for CRUD operations
                                    date={trade.trade_date?.slice(0, 10)}
                                    asset={trade.asset} // Refer to the column name in database
                                    direction={trade.direction === 'buy' ? 'Buy (Long)' : 'Sell (Short)'}
                                    outcome={trade.outcome}
                                    pnl={trade.net_pnl}
                                    onTradeDeleted={fetchTrades}
                                />
                            )
                        )}
                    </tbody>
                </table>

                <button type='button' onClick={handleAddButton} className="add-new-trade-button" aria-label="Add a new trade">
                    <span className="material-symbols-outlined">add_2</span>
                </button>
            </main>
        </>
    );
}
