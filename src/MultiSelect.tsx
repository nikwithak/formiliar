import React from "react";

export default function MultiSelect({ children }) {
    return (
        <div className="tabs is-toggle is-fullwidth" role="select">
            <ul>
                {children}
            </ul>
        </div>
    );
}
export function MultiSelectOption({
    active = false, onSelect = () => { }, children,
}) {
    return (
        <li className={active && "is-active"}>
            <a onClick={onSelect}>
                {children}
            </a>
        </li>
    );
}
