import { createContext, useContext } from "react";

const ActionsContext = createContext(null);

export function ActionsProvider({ children }) {
    const deleteTrade = async (id) => {
        try {
            // Pass the id in the route to query the correct trade
            const response = await fetch(`/api/trades/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            
            if (!response.ok) {
                console.error("Failed to delete the trade", data.error);
            }

            return data;
        } catch(error) {
            console.error("Error deleting the trade by id", error.message);
        }
    }

    const value = {
        deleteTrade
    };

    return (
        <ActionsContext.Provider value={value}>
            {children}
        </ActionsContext.Provider>
    );
}

export const useActions = () => {
    const context = useContext(ActionsContext);
    if (!context) {
        throw new Error('useActions must be inside a ActionsProvider');
    }
    return context;
}