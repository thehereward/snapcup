import React from "react";
import { CustomCell, CustomRow } from "./extensionTypes";

interface Props {
    cell: CustomCell;
    updateData: (value: string) => void;
}

const EditableCell = ({ cell, updateData }: Props) => {
    // We need to keep and update the state of the cell normally
    const [newValue, setNewValue] = React.useState(cell.value);

    const onChange = (e) => {
        setNewValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateData(newValue);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setNewValue(cell.value);
    }, [cell.value]);

    return cell.row.state.isEditing ? (
        <input
            type="text"
            className="form-control"
            value={newValue}
            onChange={onChange}
            onBlur={onBlur}
        />
    ) : (
        <div>{String(cell.value)}</div>
    );
};

export default EditableCell;
