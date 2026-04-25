// Data context for statistics (both dashboard and analytics page)
// Avoid having to fetch data from the road on 2 different pages

import { createContext, useState, useContext, useEffect } from "react";

const DataContext = createContext(null);

export function StatisticsProvider({ children }) {
    const [stats, setStats] = useState({}); // setting up an empty object leave it to be undefined until we fetch data

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch('/api/statistics');
                const data = await response.json();

                if (response.ok) {
                    console.log('Successfully fetched statistics data');
                    setStats(data);
                } else {
                    console.error('Failed to fetch statistics data', data.error);
                }
            } catch (err) {
                console.error('Error fetching analytics from database', err.message);
            }
        }
        fetchStatistics();
    }, [])

    return (
        <DataContext.Provider value={stats}>
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