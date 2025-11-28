import { useEffect } from "react";

export default function FieldsetDiv({
    id,
    label,
    type,
    placeholder,
    ariaLabel,
    options
}) {

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
                <select name={id} id={id} aria-label={ariaLabel} required>
                    {options && 
                        options.map((obj, index) => { // Loop through the passed object, and display an option element for each
                            return <option key={index} value={obj.value}>{obj.text}</option>
                        })
                    }
                </select>
            ):(
                <input type={type} name={id} id={id} placeholder={placeholder} aria-label={ariaLabel} required />
            )}
        </div>
    );
}
