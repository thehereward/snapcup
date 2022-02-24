import React, { useMemo } from "react";
import { Entity, Snap, Snappable } from "../../../types";
import { countSnapsForUser } from "./CountSnapsForUser";
import { useTable, useSortBy, useFlexLayout, useRowState } from "react-table";
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
    const clickHandlers = useMemo(
        () => ({
            onEdit: (row: CustomRow) => {
                row.setState((s) => ({ ...s, isEditing: true }));
            },
            onCancel: (row: CustomRow) => {
                row.setState((s) => ({ ...s, isEditing: false }));
            },
            onSave: async (row: CustomRow) => {
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
            },
        }),
        [snappables]
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
                Cell: (cell: CustomCell) => (
                    <EditableCell
                        cell={cell}
                        updateData={(val) =>
                            cell.row.setState((s) => ({ ...s, email: val }))
                        }
                    />
                ),
            },
            {
                Header: "Full Name",
                accessor: "fullName",
                Cell: (cell: CustomCell) => (
                    <EditableCell
                        cell={cell}
                        updateData={(val) =>
                            cell.row.setState((s) => ({ ...s, fullName: val }))
                        }
                    />
                ),
            },
            {
                Header: "Username",
                accessor: "username",
                Cell: (cell: CustomCell) => (
                    <EditableCell
                        cell={cell}
                        updateData={(val) =>
                            cell.row.setState((s) => ({ ...s, username: val }))
                        }
                    />
                ),
            },
            {
                Header: "Snaps Received",
                accessor: "numSnaps",
                Cell: ({ value }) => String(value),
            },
            {
                width: 1,
                accessor: "[editButton]",
                Cell: (cell: CustomCell) => (
                    <EditWidget
                        isEditing={cell.row.state.isEditing}
                        onEditClick={() => clickHandlers.onEdit(cell.row)}
                        onCancelClick={() => clickHandlers.onCancel(cell.row)}
                        onSaveClick={() => clickHandlers.onSave(cell.row)}
                    />
                ),
            },
        ],
        [clickHandlers]
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
            initialRowStateAccessor: () => ({ isEditing: false }),
        },
        useSortBy,
        useFlexLayout,
        useRowState
    );

    return (
        <table {...table.getTableProps()} className="table  table-hover">
            <thead>
                {table.headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <SnappableHeader
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
                            key={row.values.id}
                            rowInstance={(row as unknown) as CustomRow}
                        />
                    );
                })}
            </tbody>
        </table>
    );
};

export default SnappablesTable;
