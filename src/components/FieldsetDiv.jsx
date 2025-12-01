import { useEffect, useState } from "react";
import { useForm } from "../data/FormContext";

export default function FieldsetDiv({
    id,
    label,
    type,
    placeholder,
    ariaLabel,
    options
}) {
    const {formData, handleDataChange, modifyInputValidity} = useForm();
    const [valid, setValid] = useState(false); // Use state to render the validity of an input
    const [errorMessage, setErrorMessage] = useState(); // Allow to display an error message depending of the input

    // Asset input cannot be empty
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

    // Date cannot be in the future
    const checkDate = (chosendDate) => {
        const currentDate = new Date().toLocaleDateString();
        const currentFormatedDate = currentDate.split(". ").join("-").slice(0, -1); // YYYY MM DD

        const chosenDate = new Date(chosendDate).toLocaleDateString();
        const chosenFormatedDate = chosenDate.split(". ").join("-").slice(0, -1);

        if (chosenFormatedDate > currentFormatedDate) {
            setValid(false);
            modifyInputValidity("trade-date", false);
            setErrorMessage("Please enter a date earlier or equal to today");
        } else {
            setValid(true);
            modifyInputValidity("trade-date", true);
            setErrorMessage("");
        }
    }

    // PNL input cannot be set at 0
    const checkPNL = (pnl) => {
        if (pnl === "0") {
            setValid(false);
            modifyInputValidity("net-pnl", false);
            setErrorMessage("Please enter a value different than zero");
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

    useEffect(() => {
        if (options) {
            options.map((value) => {
                console.log(value);
            })
        }
    }, []);

    return (
        <div>
            <label htmlFor={id}>{label}<span className="required">*</span></label>
            {/* Conditional rendering */}
            {type === "select" ? (
                <select name={id} id={id} aria-label={ariaLabel} onChange={onChangeHandler} required>
                    {options && 
                        options.map((obj, index) => { // Loop through the passed object, and display an option element for each
                            return <option key={index} value={obj.value}>{obj.text}</option>
                        })
                    }
                </select>
            ):(
                <input type={type} name={id} id={id} className={valid ? "valid" : "invalid"} placeholder={placeholder} aria-label={ariaLabel} onChange={onChangeHandler} required />
            )}
            {valid ? (
                <small></small>
            ):(
                <small>{errorMessage}</small>
            )}
        </div>
    );
}
