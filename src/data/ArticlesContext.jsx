// Fetch the a list of recent financial articles from the *Financial Modeling Prep API*
    // We need to make sure we have only one call when the entire page refresh, put a limit too

import { createContext, useContext, useEffect, useState } from "react";
import { demoArticles } from "./DemoArticles";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [articles, setArticles] = useState([]); // Avoid NULL as default when fetching data
    
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://financialmodelingprep.com/stable/fmp-articles?page=0&limit=2&apikey=${API_KEY+'d'}`;

    // dotenv is used for Node.js environment
        // as we are in React, we must prefix our key in the .env file VITE_
        // and import it with: import.meta.env. followed by the name of key

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
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
