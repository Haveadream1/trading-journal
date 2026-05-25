import { useInputValidation } from "../hooks/useInputValidation";

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
    defaultValue,
    step
}) {
    const {valid, errorMessage, onChangeHandler} = useInputValidation();

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
                <input 
                    type={type} 
                    list={listId}
                    name={id} 
                    id={id} 
                    step={step}
                    className={valid ? "valid" : "invalid"} 
                    defaultValue={defaultValue} 
                    placeholder={placeholder} 
                    aria-label={ariaLabel} 
                    onChange={onChangeHandler} 
                    required 
                />
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
