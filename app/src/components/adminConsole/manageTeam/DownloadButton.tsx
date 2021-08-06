import React from "react";
import DownloadIcon from "../../../images/DownloadIcon";

const DownloadButton = (props: {
    disabled: boolean;
    onClick: () => void;
    label: string;
}) => {
    return (
        <button
            className="special-download-button"
            onClick={props.onClick}
            disabled={props.disabled}
            aria-label={props.label}
        >
            <DownloadIcon />
        </button>
    );
};

export default DownloadButton;
