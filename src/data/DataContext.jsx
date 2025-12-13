// Fetch the data from the *Financial Modeling Prep API*
// Only need one call and we can they use the data
// The current goal is to fetch a list of recent news for our dataList

import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [articles, setArticles] = useState([]); // Avoid NULL as default when fetching data

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ! Do not push API key to github
                const response = await fetch();
                if (!response.ok) {
                    throw new Error("Failed to fetch data", error);
                }

                const result = await response.json();
                setArticles(result); // Pass the fetched data in the state
            } catch (error) {
                throw new Error("An error was catched while fetching data", error);
            }
        }
        fetchData();
    }, [])
    
    return (
        <DataContext.Provider value={articles}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used inside a DataProvider");
    }
    return context;
}
