import React from "react";
import DropdownSelect from "./DropdownSelect";

type Props = {
    label: string,
    name: string,
    placeholder: string,
    type: string,
    horizontal: string,
    value: string,
    onChange: (_) => { },
    error: string | null | undefined,
    required: boolean,
    onBlur: (_) => { },
    options: any[],
}

export default function InputRow({
    label,
    name,
    placeholder = "",
    type = "text",
    horizontal = true,
    value = undefined,
    onChange = (_) => { },
    error = null,
    required = false,
    onBlur = (_) => { },
    options = undefined,
}) {
    return <div className={`field ${horizontal ? "is-horizontal" : null}`}>
        <div className="field-label has-text-left is-normal">
            <label
                className="label"
                htmlFor={name}
            >
                {
                    required
                    && <span className="has-text-danger">* </span>
                }
                {label}
            </label>
        </div>
        <div className="field-body">
            <div className="field">
                <Input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    isError={!!error}
                    onBlur={onBlur}
                    options={options}
                />
                {
                    error
                        ? <p className="help is-danger has-text-left">
                            {error}
                        </p>
                        : null
                }
            </div>

        </div>
    </div >;
}

function Input({
    name,
    placeholder = "",
    type = "text",
    value = undefined,
    onChange = (e) => { },
    onBlur = (e) => { },
    isError = false,
    options = undefined,
}) {
    switch (type) {
        case "textarea": {
            return (
                <p className="control is-expanded">
                    <textarea
                        className={`textarea ${isError ? 'is-danger has-text-danger' : null}`}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </p>
            );
            break;
        }
        case "dropdown": {
            return (
                <p className="control is-expanded">
                    <DropdownSelect
                        label={""}
                        name={""}
                        options={options || []}
                        value={value}
                    />
                </p>
            );
            break;
        }
        case "multiselect": {
            //TODO:
            return (<></>);
        }
        case "currency": {
            return (
                <p className="control is-expanded has-icons-left">
                    <input
                        className={`input ${isError ? 'is-danger has-text-danger' : null}`}
                        type="number"
                        step={.01}
                        placeholder={placeholder}
                        name={name}
                        value={(value || 0) / 100}
                        onChange={(e) => {
                            e.target.valueAsNumber = e.target.valueAsNumber * 100;
                            onChange(e);
                        }}
                        onBlur={onBlur}
                    />
                    <span className="icon is-medium is-left">
                        $
                    </span>
                </p>
            )
        }
        default: {
            return (
                <p className="control is-expanded">
                    <input
                        className={`input ${isError ? 'is-danger has-text-danger' : null}`}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </p>
            );
            break;
        }
    }
}