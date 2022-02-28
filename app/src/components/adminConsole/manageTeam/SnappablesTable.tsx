import React, { useMemo, useState } from "react";
import { Entity, Snap, Snappable } from "../../../types";
import { countSnapsForUser } from "./CountSnapsForUser";
import {
    useTable,
    useSortBy,
    useFlexLayout,
    useRowState,
    useRowSelect,
} from "react-table";
import EditableCell from "./EditableCell";
import EditWidget from "./EditWidget";
import SnappableRow from "./SnappableRow";
import SnappableHeader from "./SnappableHeader";
import { CustomCell, CustomColumn, CustomRow } from "./extensionTypes";
import { uploadSnappables } from "../csvTools/csvManager";

interface Props {
    cupId: string;
    snappables: Entity<Snappable>[];
    currentSnaps?: Entity<Snap>[];
    setSnappables: React.Dispatch<React.SetStateAction<Snappable[]>>;
}

const SnappablesTable = ({
    cupId,
    snappables,
    currentSnaps,
    setSnappables,
}: Props) => {
    const [editing, setEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    const clickHandlers = useMemo(
        () => ({
            onEdit: (row: CustomRow) => {
                row.toggleRowSelected();
                setEditing(true);
            },
            onCancel: (row: CustomRow) => {
                row.toggleRowSelected();
                setEditing(false);
            },
            onSave: async (row: CustomRow) => {
                setUploading(true);
                const newSnappables: Snappable[] = snappables.map((snappable) =>
                    snappable.id == row.original.id
                        ? {
                              id: snappable.id,
                              email: row.state.email || snappable.email,
                              fullName:
                                  row.state.fullName || snappable.fullName,
                              username:
                                  row.state.username || snappable.username,
                          }
                        : snappable
                );

                await uploadSnappables(cupId, newSnappables);
                setSnappables(newSnappables);
                row.setState((s) => ({ ...s, isEditing: false }));
                setUploading(false);
                setEditing(false);
            },
        }),
        [snappables]
    );

    const defaultCellGenerator = (cell: CustomCell, accessor: string) => (
        <EditableCell
            initialValue={cell.value}
            newValue={cell.row.state[accessor]}
            editing={cell.row.isSelected}
            disabled={uploading}
            updateData={(val) =>
                cell.row.setState((s) => ({ ...s, [accessor]: val }))
            }
        />
    );

    const defaultColumn = React.useMemo(
        () => ({
            width: 2, // width is used for both the flex-basis and flex-grow
        }),
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: "Email",
                accessor: "email", // must match property keys on data objects
                Cell: (cell) => defaultCellGenerator(cell, "email"),
            },
            {
                Header: "Full Name",
                accessor: "fullName",
                Cell: (cell) => defaultCellGenerator(cell, "fullName"),
            },
            {
                Header: "Username",
                accessor: "username",
                Cell: (cell) => defaultCellGenerator(cell, "username"),
            },
            {
                Header: "Snaps Received",
                accessor: "numSnaps",
                Cell: ({ value }) => (
                    <div className="center-aligned">{String(value)}</div>
                ),
            },
            {
                width: 1,
                accessor: "[editButton]",
                Cell: (cell: CustomCell) => (
                    <EditWidget
                        isEditing={cell.row.isSelected}
                        uploading={uploading}
                        disableEdit={editing}
                        onEditClick={() => clickHandlers.onEdit(cell.row)}
                        onCancelClick={() => clickHandlers.onCancel(cell.row)}
                        onSaveClick={() => clickHandlers.onSave(cell.row)}
                    />
                ),
                disableSortBy: true,
            },
        ],
        [clickHandlers, uploading, editing]
    );

    const data = React.useMemo(
        () =>
            snappables.map((p: Snappable) => ({
                ...p,
                numSnaps: countSnapsForUser(p.id, currentSnaps),
            })),
        [snappables, currentSnaps]
    );

    const table = useTable(
        {
            defaultColumn,
            columns,
            data,
        },
        useSortBy,
        useFlexLayout,
        useRowState,
        useRowSelect
    );

    return (
        <table {...table.getTableProps()} className="table table-hover">
            <thead>
                {table.headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <SnappableHeader
                                key={column.id}
                                columnInstance={
                                    (column as unknown) as CustomColumn
                                }
                            />
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...table.getTableBodyProps()}>
                {table.rows.map((row) => {
                    table.prepareRow(row);
                    return (
                        <SnappableRow
                            key={row.id}
                            rowInstance={(row as unknown) as CustomRow}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default SnappablesTable;
