// Data context with states and functions to handle the form inputs change, validation and storage

import { API_BASE } from "../config";

import { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

export function FormProvider({ children }) {
    const [trades, setTrades] = useState([]); // Array to store trades

    const [tradeHistory, setTradeHistory] = useState([]);
    const [validity, setValidity] = useState({
        "asset-symbol": false,
        "trade-date": false,
        "net-pnl": false,
    })

    // Define the structure of the stored data for each trade
    const [formData, setFormData] = useState({
        "trade-details": {  // fieldset
            "asset-symbol": "", // label : value
            "direction-select": "buy"
        },
        "trade-outcome": {
            "trade-date": "",
            "outcome-select": "win",
            "net-pnl": ""
        }
    })

    const [isTradeUpdated, setIsTradeUpdated] = useState(false) // State remembering if we are submitting or updating the trade
    const [updateTradeId, setUpdateTradeId] = useState(null);
    const [selectedUpdateTrade, setSelectedUpdateTrade] = useState(null);

    // Pass the new data in the state without deleting data not targeted
    const handleDataChange = (fieldset, label, value) => {
        setFormData((prev) => ({
            ...prev, // Conserve previous fieldset
            [fieldset]: {
                ...prev[fieldset], // Conserve previous label: value
                [label]: value // Modify value
            }
        }));
    }

    // Define a method to store locally the trades with state
        // Like that the UI update faster than waiting from the server response
        // Improve UX (user experience) and reduce the number of fetch
    const pushTradeToHistory = (trade) => {
        setTradeHistory(prev => {
            return [...prev, trade];
        })
    }

    // Define a method to modify the boolean value depending on validity
    const modifyInputValidity = (label, bool) => {
        setValidity((prev) => ({
            ...prev,
            [label]: bool
        }))
    }

    const submitTrade = async (tradeData) => {
        try {
            // Send the form data to API to save it in the database
            const response = await fetch(`${API_BASE}/api/trades`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Metadata affilied to request to indicate the data type to server
                },
                body: JSON.stringify(tradeData) // Send form values as JSON
            });

            const data = await response.json();  // Parse the JSON response from server
            
            if (response.ok) {
                pushTradeToHistory(data);
                console.log("Successfully saved the trade in the database");

                return true;
            } else {
                console.error("Failed to save the trade", data.error);
                return false;
            }
        } catch(error) {
            console.error("Error submitting the trade", error.message);
            return false
        }
    }
    
    const value = {
        trades,
        setTrades,
        formData,
        isTradeUpdated,
        setIsTradeUpdated,
        updateTradeId,
        setUpdateTradeId,
        selectedUpdateTrade,
        setSelectedUpdateTrade,
        handleDataChange,
        tradeHistory,
        pushTradeToHistory,
        validity,
        modifyInputValidity,
        submitTrade,
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}

export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useForm must be used in a FormProvider");
    }
    return context;
}