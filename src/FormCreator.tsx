import React, { useEffect, useState } from "react";
import InputRow from "./InputRow";
import TextArea from "./TextArea";
import { DropdownOption } from "./DropdownSelect";

/**
 * Defines the attribues for a form field.
 *
 * @param validation - A function that validates the string value of the user input. Returns an
 *                     error message if validation fails, returns void if the value is accepted.
 */
type FormField = {
    type?: string,
    label?: string,
    placeholder?: string,
    initialValue?: string,
    validation?: (v: string) => string | undefined,
    required?: boolean,
    options?: DropdownOption[],
    onChange?: (v: string) => void,
};

export type FormFields = {
    [key: string]: FormField;
};

export default function FormCreator({
    onSubmit = (e) => { },
    fields = {},
    buttonName = "Submit",
}: {
    onSubmit: (e: any) => void,
    fields: FormFields,
    submitEndpoint?: string,
    buttonName?: string,
}) {
    
    let initial_state = Object.entries(fields).reduce(
            (prev, [name, attrs]) => {
                prev[name] = attrs.initialValue;
                return prev;
            },
            {}
        );
    let [state, setState] = useState(initial_state);
    let [errors, setErrors] = useState({});

    useEffect(() => {
        setState(
            Object.entries(fields).reduce(
                (prev: { [x: string]: string; }, [name, attrs]: [name: string, attrs: FormField]) => {
                    prev[name] = attrs.initialValue || "";
                    return prev;
                },
                {}
            )
        );
    }, [fields]);

    async function handleSubmit(e) {
        // Stop page reloading
        e.preventDefault();

        // TODO: Validate fields
        let errs = {};
        Object.entries(fields).map(
            ([name, attrs]) => {
                let err: string | undefined = undefined;
                if (attrs.required && !state[name]) {
                    err = "This field is required."
                } else {
                    err = validateField(name);
                }
                if (err) {
                    errs[name] = err;
                }
            }
        );

        setErrors(errs);
        if (Object.entries(errs).length > 0){
            console.log(errs);
            return;
        }

        // Submit form asynchronously
        // await superagent
        //     .post(submitEndpoint)
        //     .send(state)
        //     ;

        // TODO: Handle errors (include onError() prop);

        // Call client-supplied processing logic
        onSubmit(state);
    }

    function validateField(name) {
        let attrs = fields[name];
        let err: string | undefined = undefined;
        if (attrs.validation && state[name]) {
            err = attrs.validation(state[name]);
        }
        return err;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        console.log(e.target);
    }

    function handleValidation(e) {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: validateField(name) });
    }

    let form_fields: any[] = [];

    Object.entries(fields).map(
        ([name, attrs]) => {
            let err = errors[name];

            form_fields.push((
                <InputRow
                    key={name}
                    name={name}
                    label={attrs.label}
                    type={attrs.type}
                    placeholder={attrs.placeholder}
                    value={state[name]}
                    onChange={handleChange}
                    error={err}
                    required={attrs.required}
                    onBlur={handleValidation}
                    options={attrs.options}
                    horizontal={false}
                />
            ));
        }
    );

    return (
        <form
            onSubmit={handleSubmit}
        >
            {form_fields}
            <div className="mt-5 has-text-centered">
                <button
                    className="button is-light " type="submit"
                >
                    {buttonName}
                </button>
            </div>
        </form>
    );
}
