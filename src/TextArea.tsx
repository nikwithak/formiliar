export default function TextArea({
    label,
    name,
    placeholder = "",
    horizontal = true,
    onChange = (e) => {},
    value = undefined,
}) {
    return <div className={`field ${horizontal ? "is-horizontal" : null}`}>
        <div className="field-label is-normal">
            <label
                htmlFor={name}
                className="label"
            >
                {label}
            </label>
        </div>
        <div className="field-body">
            <div className="field">
                <p className="control is-expanded">
                    <textarea
                        className="textarea"
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                </p>
            </div>
        </div>
    </div>;
}
