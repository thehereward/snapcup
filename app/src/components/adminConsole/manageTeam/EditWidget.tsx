import React, { useState } from "react";

interface Props {
    isEditing: boolean;
    uploading: boolean;
    disableEdit: boolean;
    disableSave: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
    onSaveClick: () => void;
}

const EditWidget = ({
    isEditing,
    uploading,
    disableEdit,
    disableSave,
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
                ✕
            </button>
            <button
                className="btn btn-primary triple-width"
                disabled={disableSave || uploading}
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
