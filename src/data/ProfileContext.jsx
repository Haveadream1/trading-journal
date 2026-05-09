import { createContext, useContext } from "react";

const FormContext = createContext(null);

export default function ProfileProvider({ children}) {

    const value = {

    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}

export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useForm must be in a FormProvider");
    }
    return context;
}
