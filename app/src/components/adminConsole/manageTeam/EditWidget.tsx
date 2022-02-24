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
                className="btn btn-danger"
                disabled={uploading}
                onClick={onCancelClick}
            >
                X
            </button>
            <button
                className="btn btn-primary"
                disabled={uploading}
                onClick={handleSave}
            >
                ✓
            </button>
        </>
    ) : (
        <button className="btn btn-purple" onClick={onEditToggle}>
            🖉
        </button>
    );
};

export default EditWidget;
