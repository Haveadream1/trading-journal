import { createContext, useContext } from "react";

const FormContext = createContext(null); 
// Give default value for easier unit testing  

export default function FormProvider({ children }) {
    
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