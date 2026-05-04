// Fetch the a list of recent financial articles from the *Financial Modeling Prep API*
    // We need to make sure we have only one call when the entire page refresh, put a limit too

import { createContext, useContext, useEffect, useState } from "react";
import { demoArticles } from "./DemoArticles";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [articles, setArticles] = useState([]); // Avoid NULL as default when fetching data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/articles');
                const result = await response.json();

                if (response.ok) {
                    console.log('Sucessfully fetched financials articles from API');
                    setArticles(result);
                } else {
                    console.error('Failed to fetch financials articles from API, demo data displayed', result.error);
                    setArticles(demoArticles);
                }
            } catch (error) {
               console.error("An error was catched while fetching data, demo data displayed", error);
               setArticles(demoArticles);
            }
        }
        fetchData();
    }, []) // Empty dependency, run only once when the website loads
    
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
