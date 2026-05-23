import { useState } from "react";
import { useForm } from "../data/FormContext";

export default function FieldsetDiv({
    id,
    label,
    type,
    placeholder,
    ariaLabel,
    options,
    select, 
    input,
    datalist,
    listId,
    defaultValue
}) {
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
            setErrorMessage("Please do not input a negative value, the conversion is automatically handled")
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

    // Debugging purpose
    // useEffect(() => {
    //     if (options) {
    //         options.map((value) => {
    //             console.log(value);
    //         })
    //     }
    // }, []);

    return (
        <div>
            <label htmlFor={id}>{label}<span className="required">*</span></label>
            {/* Conditional rendering */}
            {select && (
                <select name={id} id={id} aria-label={ariaLabel} onChange={onChangeHandler} defaultValue={defaultValue} required>
                    {options && 
                        // Loop through the passed object, and display an option element for each
                        options.map((obj, index) => {
                            return <option key={index} value={obj.value}>{obj.text}</option>
                        })
                    }
                </select>
            )}
            {input && (
                <input type={type} list={listId} name={id} id={id} className={valid ? "valid" : "invalid"} defaultValue={defaultValue} placeholder={placeholder} aria-label={ariaLabel} onChange={onChangeHandler} required />
            )}
            {datalist && (
                <datalist id={listId} defaultValue={defaultValue}>
                    {options &&
                        options.map((asset, index) => {
                            return <option key={index} value={asset}></option>
                        })
                    }
                </datalist>
            )}
            {valid ? (
                <small></small>
            ):(
                <small>{errorMessage}</small>
            )}
        </div>
    );
}
