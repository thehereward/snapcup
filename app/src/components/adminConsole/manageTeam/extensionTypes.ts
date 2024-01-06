import { Cell, ColumnInstance, Row } from "react-table";

export interface RowState {
    email?: string;
    fullName?: string;
    username?: string;
}

export interface CustomRow extends Row {
    state: RowState;
    setState: React.Dispatch<React.SetStateAction<RowState>>;
    isSelected: boolean;
    toggleRowSelected: (selected?: boolean) => void;
    original: {
        id: string;
        email: string;
        fullName: string;
        username: string;
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
