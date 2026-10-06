// Custom hook to clean the component
    // Allow easier testing, keeping the component dumb

import { useActions } from "../context/ActionsContext";
import { useForm } from "../context/FormContext";
import { useStatistics } from "../context/StatisticsContext";

export const useTradeActions = (tradeId, onTradeDeleted) => {
    const { deleteTrade} = useActions();
    const { refreshStatistics } = useStatistics();
    const { setIsTradeUpdated, setUpdateTradeId, trades, setSelectedUpdateTrade } = useForm();

    const fetchTradeById = (selectedId) => {
        // Loop through the list of trades object
        Object.values(trades).forEach(trade => {
            // Return the trade that was selected for update
            if (trade.id === selectedId) {
                // Store trade in a state
                setSelectedUpdateTrade(trade);
            }
        })
    }

    const handleEditClick = () => {
        console.log("Trade edited with the following id: ", tradeId);

        fetchTradeById(tradeId);
        setIsTradeUpdated(true);
        setUpdateTradeId(tradeId);
    }

    const handleDeleteClick = async () => {
        try {
            // Function return a boolean depending on success/failure
            const success =  await deleteTrade(tradeId);

            if (success) {
                console.log("Trade deleted", tradeId);

                // When trade is deleted function is called causing the refresh in the parent to run
                onTradeDeleted?.() // Optional function invocation, avoid to mock it for test
                refreshStatistics(); // Call to refresh statistics data
            } else {
                console.error("Failed to delete the trade");
            }
        } catch (error) {
            console.error("Error while deleting the trade", error.message);
        }
    }

    return { handleEditClick, handleDeleteClick };
};
