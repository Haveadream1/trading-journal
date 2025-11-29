import { createContext, useContext, useState } from "react";

const FormContext = createContext(null); 
// Give default value for easier unit testing  

export default function FormProvider({ children }) {

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
    
    const value = {
        formData,
        handleDataChange
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