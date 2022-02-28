import React from "react";

interface Props<T> {
    initialValue: T;
    newValue?: T;
    editing: boolean;
    disabled: boolean;
    updateData: (value: T) => void;
}

type value = string | number;
const EditableCell = ({
    initialValue,
    newValue,
    editing,
    disabled,
    updateData,
}: Props<value>) => {
    const [modifiedValue, setModifiedValue] = React.useState(
        newValue || initialValue
    );

    const onChange = (e) => {
        setModifiedValue(e.target.value);
    };

    // Triggerred when component comes out of focus
    const onBlur = () => {
        updateData(modifiedValue);
    };

    return (
        <div className="center-aligned overflow-break-word">
            {editing ? (
                <input
                    type="text"
                    className="form-control"
                    value={modifiedValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                />
            ) : (
                <div>{String(initialValue)}</div>
            )}
        </div>
    );
};

export default EditableCell;
