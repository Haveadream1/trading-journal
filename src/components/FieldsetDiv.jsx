import { useEffect } from "react";
import { useForm } from "../data/FormContext";

export default function FieldsetDiv({
    id,
    label,
    type,
    placeholder,
    ariaLabel,
    options
}) {
    const {formData, handleDataChange} = useForm();

    // Form verification:
        // Date cannot be in the future
        // PNL cannot be 0

    const showSuccess = (element) => {
        element.classList.remove("invalid");
        element.classList.add("valid");
    }

    const showError = (element) => {
        element.classList.add("invalid");
        element.classList.remove("valid");
    }

    const checkDate = (chosendDate, element) => {
        const currentDate = new Date().toLocaleDateString();
        const currentFormatedDate = currentDate.split(". ").join("-").slice(0, -1); // YYYY MM DD

        const chosenDate = new Date(chosendDate).toLocaleDateString();
        const chosenFormatedDate = chosenDate.split(". ").join("-").slice(0, -1);

        if (chosenFormatedDate > currentFormatedDate) {
            showError(element);
        } else {
            showSuccess(element);
        }
    }

    const checkPNL = (pnl, element) => {
        if (pnl === "0") {
            showError(element);
        } else {
            showSuccess(element);
        }
    }

    const onChangeHandler = (e) => {
        const element = e.target
        const value = e.target.value;
        const label = e.target.id;
        const fieldset = e.target.parentElement.parentElement.id;

        // Handle only the input that need a verification
        switch (label) {
            case "net-pnl":
                checkPNL(value, element);
                break;
            case "trade-date":
                checkDate(value, element);
                break;
        }

        handleDataChange(fieldset, label, value)
    }

    useEffect(() => {
        if (options) {
            options.map((value) => {
                console.log(value)
            })
        }
    }, [])

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
                <input type={type} name={id} id={id} placeholder={placeholder} aria-label={ariaLabel} onChange={onChangeHandler} required />
            )}
        </div>
    );
}
