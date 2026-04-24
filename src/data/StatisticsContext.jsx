// Data context for statistics (both dashboard and analytics page)
// Avoid having to fetch data from the road on 2 different pages

import { createContext, useState, useContext } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [stats, setStats] = useState([]);

    return (
        <DataContext.Provider value={stats}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () =>  {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be inside a DataProvider');
    }
    return context;
}