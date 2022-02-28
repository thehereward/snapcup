import React, { useState } from "react";

interface Props {
    isEditing: boolean;
    uploading: boolean;
    disableEdit: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
    onSaveClick: () => Promise<void>;
}

const EditWidget = ({
    isEditing,
    uploading,
    disableEdit,
    onEditClick,
    onCancelClick,
    onSaveClick,
}: Props) => {
    return isEditing ? (
        <>
            <button
                className="btn btn-danger triple-width"
                disabled={uploading}
                onClick={() => onCancelClick()}
            >
                X
            </button>
            <button
                className="btn btn-primary triple-width"
                disabled={uploading}
                onClick={() => onSaveClick()}
            >
                {uploading ? (
                    <div className="loading-spinner" role="status" />
                ) : (
                    "✓"
                )}
            </button>
        </>
    ) : (
        <button
            className="btn btn-outline-primary triple-width"
            disabled={disableEdit}
            onClick={() => onEditClick()}
        >
            🖉
        </button>
    );
};

export default EditWidget;
