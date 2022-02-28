import { Cell, ColumnInstance, Row } from "react-table";

export interface RowState {
    email: string;
    fullName: string;
    username: string;
    isEditing: boolean;
}

export interface CustomRow extends Row {
    state: RowState;
    setState: React.Dispatch<React.SetStateAction<RowState>>;
    original: {
        id: string;
    };
}

export interface CustomColumn extends ColumnInstance {
    getSortByToggleProps: () => any;
    isSorted: boolean;
    isSortedDesc: boolean;
}

export interface CustomCell extends Cell {
    value: string;
    row: CustomRow;
}
