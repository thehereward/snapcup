import React from "react";
import DownloadIcon from "../../../images/DownloadIcon";

const DownloadButton = (props: { disabled: boolean; onClick: () => void }) => {
    return (
        <button
            className="special-download-button"
            onClick={props.onClick}
            disabled={props.disabled}
            aria-label="Download current snappable people as CSV."
        >
            <DownloadIcon />
        </button>
    );
};

export default DownloadButton;
