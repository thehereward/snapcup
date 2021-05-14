import React from "react";
import DownloadIcon from "../../../images/DownloadIcon";

const DownloadButton = (props: { disabled: boolean; onClick: () => void }) => {
    return (
        <button
            className="special-download-button"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <DownloadIcon />
        </button>
    );
};

export default DownloadButton;
