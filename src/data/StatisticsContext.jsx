// Data context for statistics (both dashboard and analytics page)
    // Avoid having to fetch data from the route on 2 different pages

import { createContext, useState, useContext, useEffect } from "react";
import { getDemoStatistics } from "./DemoTradesData";

const DataContext = createContext(null);

export function StatisticsProvider({ children }) {
    const [stats, setStats] = useState({}); // setting up an empty object leave it to be undefined until we fetch data
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // starts with a loading state

    useEffect(() => {
        const fetchStatistics = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/statistics');
                const data = await response.json();

                setIsLoading(false); // after waiting for data, we set loading state to false as success/error is handled after

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
                setIsLoading(false);

                console.error('Error fetching analytics from database', err.message);
            }
        }
        fetchStatistics();
    }, [refreshTrigger]) // refresh the data each time the trigger value change

    // function to increment the trigger value
    const refreshStatistics = () => {
        setRefreshTrigger(prev => prev + 1);
    }

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

    // Define constants for colors used in graph
        // Easier to change when they are regrouped in one context
    const analyticSectionColor = ['#82dfb2', '#cf5a5a'];
    const sideMetricColor = "#11D473";

    const value = {
        stats,
        formatDate,
        analyticSectionColor,
        sideMetricColor,
        refreshStatistics,
        refreshTrigger,
        isLoading
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