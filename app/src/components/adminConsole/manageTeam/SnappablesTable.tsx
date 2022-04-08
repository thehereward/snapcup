import React, { useMemo, useState } from "react";
import { Entity, Snap, Snappable } from "../../../types";
import { countSnapsForUser } from "./CountSnapsForUser";
import {
    useTable,
    useSortBy,
    useFlexLayout,
    useRowState,
    useRowSelect,
    TableOptions,
} from "react-table";
import AddSnappableButton from "./AddSnappableButton";
import EditableCell from "./EditableCell";
import EditWidget from "./EditWidget";
import SnappableRow from "./SnappableRow";
import SnappableHeader from "./SnappableHeader";
import { CustomCell, CustomColumn, CustomRow } from "./extensionTypes";
import { writeAllSnappablePeople } from "../../../firebase/users/SetSnappables";

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
    const [creatingNew, setCreatingNew] = useState(false);
    const [editing, setEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    const clickHandlers = useMemo(
        () => ({
            onEdit: (row: CustomRow) => {
                row.toggleRowSelected(true);
                setEditing(true);
            },
            onCancel: (row: CustomRow) => {
                row.toggleRowSelected(false);
                row.setState({
                    email: row.original.email,
                    username: row.original.username,
                    fullName: row.original.fullName,
                });
                setCreatingNew(false);
                setEditing(false);
            },
            onSave: async (modifiedRow: CustomRow, allRows: CustomRow[]) => {
                setUploading(true);
                try {
                    const modifiedSnappable = {
                        id: modifiedRow.original.id,
                        email: modifiedRow.state.email,
                        fullName: modifiedRow.state.fullName,
                        username: modifiedRow.state.username,
                    };
                    const [
                        updatedSnappableSingle,
                    ] = await writeAllSnappablePeople(cupId, [
                        modifiedSnappable,
                    ]);
                    const updatedSnappableList = allRows.map((row) =>
                        row.original.id === modifiedRow.original.id
                            ? updatedSnappableSingle
                            : row.original
                    );
                    setSnappables(updatedSnappableList);
                } catch (e) {
                    console.error(e);
                    alert("Error uploading snappables");
                } finally {
                    modifiedRow.toggleRowSelected(false);
                    setUploading(false);
                    setEditing(false);
                    setCreatingNew(false);
                }
            },
        }),
        []
    );

    const defaultCellGenerator = (
        cell: CustomCell,
        disabled: boolean,
        accessor: string,
        placeholder: string | number
    ) => (
        <EditableCell
            initialValue={cell.value}
            newValue={cell.row.state[accessor]}
            editing={cell.row.isSelected || cell.row.original.id === undefined}
            disabled={disabled}
            placeholder={placeholder}
            updateData={(val) =>
                cell.row.setState((s) => ({ ...s, [accessor]: val }))
            }
        />
    );

    const defaultColumn = {
        width: 2, // width is used for both the flex-basis and flex-grow
    };

    const columns = React.useMemo(
        () => [
            {
                id: "usernameCol",
                Header: "Username",
                accessor: "username",
                Cell: (cell) =>
                    defaultCellGenerator(cell, uploading, "username", "EllWoo"),
            },
            {
                id: "fullNameCol",
                Header: "Full Name",
                accessor: "fullName",
                Cell: (cell) =>
                    defaultCellGenerator(
                        cell,
                        uploading,
                        "fullName",
                        "Elle Woods"
                    ),
            },
            {
                id: "emailCol",
                Header: "Email",
                accessor: "email", // must match property keys on data objects
                Cell: (cell) =>
                    defaultCellGenerator(
                        cell,
                        uploading,
                        "email",
                        "elle.woods@stanford.edu"
                    ),
            },
            {
                id: "numSnapsCol",
                Header: "Snaps Received",
                accessor: "numSnaps",
                Cell: ({ value }) => (
                    <div className="center-aligned">{String(value)}</div>
                ),
            },
            {
                width: 1,
                accessor: "[editButton]", // ignored
                Header: ({ setSortBy }) => (
                    <AddSnappableButton
                        disabled={editing}
                        onClick={() => {
                            setSortBy([]);
                            setCreatingNew(true);
                            setEditing(true);
                        }}
                    />
                ),
                Cell: ({
                    row: thisRow,
                    rows: allRows,
                }: {
                    row: CustomRow;
                    rows: CustomRow[];
                }) => {
                    const allValuesFilled = Object.values(thisRow.state).every(
                        (val) => !!val
                    );
                    const editingThisRow =
                        thisRow.isSelected || thisRow.original.id === undefined;
                    return (
                        <EditWidget
                            isEditing={editingThisRow}
                            uploading={uploading}
                            disableEdit={editing && !editingThisRow}
                            disableSave={!allValuesFilled}
                            onEditClick={() => clickHandlers.onEdit(thisRow)}
                            onCancelClick={() =>
                                clickHandlers.onCancel(thisRow)
                            }
                            onSaveClick={() =>
                                clickHandlers.onSave(thisRow, allRows)
                            }
                        />
                    );
                },
                disableSortBy: true,
            },
        ],
        [clickHandlers, uploading, editing]
    );

    const data = React.useMemo(() => {
        const rowData = snappables.map((p: Snappable) => ({
            ...p,
            numSnaps: countSnapsForUser(p.id, currentSnaps),
        }));
        if (creatingNew) {
            rowData.unshift({
                id: undefined,
                fullName: undefined,
                email: undefined,
                username: undefined,
                numSnaps: 0,
            });
        }
        return rowData;
    }, [snappables, currentSnaps, creatingNew]);

    const table = useTable(
        ({
            defaultColumn,
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: "usernameCol",
                        desc: false,
                    },
                ],
            },
            autoResetSortBy: false,
            initialRowStateAccessor: (row: CustomRow) => ({
                username: row.original.username,
                fullName: row.original.fullName,
                email: row.original.email,
            }),
        } as unknown) as TableOptions<object>,
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
                {table.rows.map((row: CustomRow) => {
                    table.prepareRow(row);
                    return <SnappableRow key={row.id} rowInstance={row} />;
                })}
            </tbody>
        </table>
    );
};

export default SnappablesTable;
