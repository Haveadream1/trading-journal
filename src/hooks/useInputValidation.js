// Custom hook to clean component, enable also single responsibility

import { useState } from "react";
import { useForm } from "../context/FormContext";

export const useInputValidation = () => {
    const {handleDataChange, modifyInputValidity} = useForm();
    const [valid, setValid] = useState(false); // Use state to render the validity of an input
    const [errorMessage, setErrorMessage] = useState(); // Allow to display an error message depending of the input

    // Check that the input is not empty
    const checkAsset = (asset) => {
        if (asset === "") {
            setValid(false); // Locally defined state, used to conditionally render the element
            modifyInputValidity("asset-symbol", false); // Global state defined in the context to check the all form validity
            setErrorMessage("Please enter a valid asset name");
        } else {
            setValid(true);
            modifyInputValidity("asset-symbol", true);
            setErrorMessage("");
        }
    }

    // Check the user picked date is not in the future
    const checkDate = (userPickedDate) => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0); // Normalize the hours so we can compare only the dates

        // Parse the received date
        const chosenDate = new Date(userPickedDate);
        chosenDate.setHours(0, 0, 0, 0);

        // Compare date objects
        if (chosenDate > todayDate) {
            setValid(false);
            modifyInputValidity("trade-date", false);
            setErrorMessage("Please enter a date earlier or equal to today");
        } else {
            setValid(true);
            modifyInputValidity("trade-date", true);
            setErrorMessage("");
        }
    }

    // Check that pnl has a valid value
    const checkPNL = (pnl) => {
        if (pnl === "0") {
            setValid(false);
            modifyInputValidity("net-pnl", false);
            setErrorMessage("Please enter a value different than zero");
        } else if (pnl.startsWith("0")) {
            setValid(false);
            modifyInputValidity("net-pnl", false);
            setErrorMessage("Please enter a value that does not start with zero");
        } else if (parseFloat(pnl) < 0) {
            setValid(false);
            modifyInputValidity("net-pnl", false);
            setErrorMessage("Please do not input a negative value, the conversion is automatically handled");
        } else if (String(pnl).length > 10) {
            setValid(false);
            modifyInputValidity("net-pnl", false);
            setErrorMessage("Please enter a smaller number");
        } else {
            setValid(true);
            modifyInputValidity("net-pnl", true);
            setErrorMessage("");
        }
    }

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const label = e.target.id;
        const fieldset = e.target.parentElement.parentElement.id;

        // Handle only the input that need a verification
        switch (label) {
            case "asset-symbol":
                checkAsset(value);
                break;
            case "net-pnl":
                checkPNL(value);
                break;
            case "trade-date":
                checkDate(value);
                break;
        }
        handleDataChange(fieldset, label, value);
    }

    return { valid, errorMessage, onChangeHandler }
}