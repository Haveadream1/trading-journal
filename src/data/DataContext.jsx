
// Fetch the data from the *Financial Modeling Prep API*
// Only need one call and we can they use the data
// The current goal is to fetch a list of 50 most commons assets for our dataList


import { createContext, useContext } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    
    return (
        <DataContext.Provider value={value}>
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