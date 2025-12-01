import { createContext, useContext, useState } from "react";

const FormContext = createContext(null); 
// Give default value for easier unit testing  

export default function FormProvider({ children }) {
    const [tradeHistory, setTradeHistory] = useState([]); // Array to store trades
    const [validity, setValidity] = useState({
        "asset-symbol": false,
        "trade-date": false,
        "net-pnl": false,
    })

    // Define the structure and give default values
    const [formData, setFormData] = useState({
        "trade-details": {  // fieldset
            "asset-symbol": "BTC/USD", // label : value
            "direction-select": "Buy (Long)"
        },
        "trade-outcome": {
            "trade-date": "",
            "outcome-select": "",
            "net-pnl": "2500.51"
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

    // Define a method to store temporary the trades with react
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