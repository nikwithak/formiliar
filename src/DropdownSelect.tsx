export type DropdownOption = {
    name: string,
    value: string,
};

type Props = {
    label: string,
    name: string,
    horizontal?: boolean,
    value?: string,
    onChange?: (_) => void,
    error?: string,
    required?: boolean,
    options: DropdownOption[],
}

export default function DropdownSelect({
    label,
    name,
    horizontal = true,
    value = undefined,
    onChange = (_) => { },
    error = null,
    required = false,
    options,
}: Props) {
    return (
        <div className="field-body">
            {/* <div className="field"> */}
                <div className="select is-fullwidth">
                    <select
                        className="is-fullwidth"
                        // onSelect={onChange}
                    >
                        {options.map(opt => (
                            <option
                                value={opt.value}
                                selected={opt.value === value}
                            >
                                {opt.name}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    error
                        ? <p className="help is-danger has-text-left">
                            {error}
                        </p>
                        : null
                }
            {/* </div> */}

        </div>
    );
}

function Input({
    name,
    placeholder = "",
    type = "text",
    value = undefined,
    onChange = (e) => { },
    onBlur = (e) => { },
    isError = false,
}) {
    switch (type) {
        case "textarea": {
            return (
                <textarea
                    className={`textarea ${isError ? 'is-danger has-text-danger' : null}`}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            );
            break;
        }
        default: {
            return (
                <input
                    className={`input ${isError ? 'is-danger has-text-danger' : null}`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            );
            break;
        }
    }
}