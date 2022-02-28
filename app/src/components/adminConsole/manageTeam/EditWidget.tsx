import React, { useState } from "react";

interface Props {
    isEditing: boolean;
    onEditClick: () => void;
    onCancelClick: () => void;
    onSaveClick: () => Promise<void>;
}

const EditWidget = ({
    isEditing,
    onEditClick: onEditToggle,
    onCancelClick,
    onSaveClick,
}: Props) => {
    const [uploading, setUploading] = useState(false);
    const handleSave = async () => {
        setUploading(true);
        await onSaveClick();
        setUploading(false);
    };
    return isEditing ? (
        <>
            <button
                className="btn btn-danger double-width"
                disabled={uploading}
                onClick={onCancelClick}
            >
                X
            </button>
            <button
                className="btn btn-primary double-width"
                disabled={uploading}
                onClick={handleSave}
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
            className="btn btn-outline-primary double-width"
            onClick={onEditToggle}
        >
            🖉
        </button>
    );
};

export default EditWidget;
