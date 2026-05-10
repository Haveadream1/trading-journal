import { createContext, useContext } from "react";

const ActionsContext = createContext(null);

export function ActionsProvider({ children }) {

    const values = {

    };

    return (
        <ActionsContext.Provider values={values}>
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