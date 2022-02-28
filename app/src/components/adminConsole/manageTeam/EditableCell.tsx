import React from "react";
import { CustomCell } from "./extensionTypes";

interface Props {
    cell: CustomCell;
    accessor: string;
    disabled: boolean;
    updateData: (value: string) => void;
}

const EditableCell = ({ cell, accessor, disabled, updateData }: Props) => {
    const [newValue, setNewValue] = React.useState(
        cell.row.state[accessor] || cell.value
    );

    const onChange = (e) => {
        setNewValue(e.target.value);
    };

    // Triggerred when component comes out of focus
    const onBlur = () => {
        updateData(newValue);
    };

    return (
        <div className="center-aligned overflow-break-word">
            {cell.row.isSelected ? (
                <input
                    type="text"
                    className="form-control"
                    value={newValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                />
            ) : (
                <div>{String(cell.value)}</div>
            )}
        </div>
    );
};

export default EditableCell;
