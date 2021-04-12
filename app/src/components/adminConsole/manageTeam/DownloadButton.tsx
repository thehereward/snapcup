import React from "react";
import DownloadIcon from "../../../images/DownloadIcon";
import { StyledDownloadButton } from "../AdminConsoleStyles";

const DownloadButton = (props: { disabled: boolean; onClick: () => void }) => {
    return (
        <StyledDownloadButton onClick={props.onClick} disabled={props.disabled}>
            <DownloadIcon />
        </StyledDownloadButton>
    );
};

export default DownloadButton;
