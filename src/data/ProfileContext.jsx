import { createContext, useContext, useEffect, useState } from "react";

const FormContext = createContext(null);

export default function ProfileProvider({ children}) {
    const [profileData, setProfileData] = useState({
        "username-input": "Anonymous",
        "motivation-input":  ""
    });

    // Get the profile from local storage for inital mount
    useEffect(() => {
        const getProfile = async () => {
            try {
                const storedProfile = JSON.parse(localStorage.getItem('profile'));
                if (!storedProfile) return

                setProfileData(storedProfile);
            } catch(error) {
                console.error('Failed to retrieve profile from local storage', error);
            }
        }
        getProfile();
    }, []);

    const handleDataChange = (label, value) => {
        setProfileData((prev) => ({
            ...prev,
            [label]: value
        }))
    }

    const storeProfile = (profileData) => {
        // Save profile data into local storage: key, value
        try {
            localStorage.setItem('profile', JSON.stringify(profileData));
            
            // Return a boolean used in the profile form for validation on submit
                // setItem only return an error if an issue, and nothing for success 
            return true;
        } catch(error) {
            console.log('Failed to store the profile in local storage', error);
            return false;
        }
    }

    const value = {
        profileData,
        handleDataChange,
        storeProfile
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}

export const useProfile = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useProfile must be in a FormProvider");
    }
    return context;
}
