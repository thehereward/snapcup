import React, { useState } from "react";

interface Props {
    disabled?: boolean;
    onClick: () => void;
}

const AddSnappableButton = ({ disabled, onClick }: Props) => {
    return (
        <button
            className="btn btn-primary triple-width"
            disabled={disabled}
            onClick={() => onClick()}
        >
            +
        </button>
    );
};

export default AddSnappableButton;
