import React, { useCallback } from "react";
import DownloadIcon from "../../../images/DownloadIcon";
import { StyledDownloadButton } from "../AdminConsoleStyles";

const DownloadButton = (props: { disabled: boolean; onClick: () => void }) => {
    const onClick = useCallback(props.onClick, []);

    return (
        <StyledDownloadButton onClick={onClick} disabled={props.disabled}>
            <DownloadIcon />
        </StyledDownloadButton>
    );
};

export default DownloadButton;
