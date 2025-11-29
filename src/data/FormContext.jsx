import { createContext, useContext, useState } from "react";

const FormContext = createContext(null); 
// Give default value for easier unit testing  

export default function FormProvider({ children }) {

    // Define the structure and give default values
    const [formData, setFormData] = useState({
        tradeDetails: {
            asset: "BTC/USD",
            direction: ""
        },
        tradeOutcome: {
            date: "",
            outcome: "",
            netPNL: "2500.51"
        }
    })
    
    const value = {};

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