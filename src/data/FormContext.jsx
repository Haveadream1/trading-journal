// Data context with states and functions to handle the form inputs change, validation and storage
import { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

export default function FormProvider({ children }) {
    const [tradeHistory, setTradeHistory] = useState([]); // Array to store trades
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
    
    const value = {
        formData,
        handleDataChange,
        tradeHistory,
        pushTradeToHistory,
        validity,
        modifyInputValidity,
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