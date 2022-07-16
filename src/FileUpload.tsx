import { useRef } from "react";

export default function FileUpload({
    label,
    on_upload
}) {
    let fileUploadRef = useRef<HTMLInputElement>();

    return (
        <div className="field has-text-centered">
            {/* <div className="field-label is-normal">
                <label className="label">{label}</label>
            </div> */}
            <div className="field-body">
                <div className="field">
                <p className="control">
                    <input
                        type="file"
                        onChange={on_upload}
                        // classNameName="is-hidden"
                        ref={fileUploadRef}
                        hidden
                    />
                    <button
                        className="button is-fullwidth"
                        onClick={() => fileUploadRef.current.click()}
                    >
                        Upload Image
                    </button>
                </p>
                </div>
            </div>
        </div>
    );
}