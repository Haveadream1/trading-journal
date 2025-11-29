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

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const label = e.target.id;
        const fieldset = e.target.parentElement.parentElement.id;
        console.log(fieldset, label, value)
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
