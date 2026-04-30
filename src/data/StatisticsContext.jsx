// Data context for statistics (both dashboard and analytics page)
    // Avoid having to fetch data from the route on 2 different pages

import { createContext, useState, useContext, useEffect } from "react";
import { getDemoStatistics } from "./DemoData";

const DataContext = createContext(null);

export function StatisticsProvider({ children }) {
    const [stats, setStats] = useState({}); // setting up an empty object leave it to be undefined until we fetch data

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('/api/statistics');
                const data = await response.json();

                if (data.totalTrades === 0) {
                    console.log("Database table is empty, we display demo trades");
                    setStats(getDemoStatistics());
                } else {
                    if (response.ok) {
                        console.log('Successfully fetched statistics data');
                        setStats(data);
                    } else {
                        console.error('Failed to fetch statistics data', data.error);
                        setStats(getDemoStatistics());
                    }
                }
            } catch (err) { 
                console.error('Error fetching analytics from database', err.message);
            }
        }
        fetchStatistics();
    }, [])

    const formatDate = (tradeList) => {
        // To avoid errors when we wait for data
        if (!tradeList) {
            return []; 
        }

        // Loop through each object and format the attributes
        return tradeList.map(trade => ({
            ...trade,
            net_pnl: parseFloat(trade.net_pnl),
            trade_date: trade.trade_date?.slice(0, 10),
            trade_count: parseInt(trade.trade_count)
        }));
    }

    const value = {
        stats,
        formatDate
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export const useStatistics = () =>  {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useStatistics must be inside a StatisticsProvider');
    }
    return context;
}