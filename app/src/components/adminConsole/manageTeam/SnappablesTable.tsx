import React from "react";
import { Entity, Snap, Snappable } from "../../../types";
import { countSnapsForUser } from "./CountSnapsForUser";
import { useTable, useSortBy, useFlexLayout } from "react-table";

const SnappablesTable = (props: {
    snappables: Entity<Snappable>[];
    currentSnaps?: Entity<Snap>[];
}) => {
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
            },
            {
                Header: "Full Name",
                accessor: "fullName",
            },
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: "Snaps Received",
                accessor: "numSnaps",
            },
        ],
        []
    );

    const data = React.useMemo(
        () =>
            props.snappables
                .sort((a: Snappable, b: Snappable) =>
                    a.fullName.localeCompare(b.fullName)
                )
                .map((p: Snappable) => ({
                    id: p.id,
                    email: p.email,
                    fullName: p.fullName,
                    username: p.username,
                    numSnaps: countSnapsForUser(p.id, props.currentSnaps),
                })),
        [props.snappables, props.currentSnaps]
    );

    const table = useTable(
        { defaultColumn, columns, data },
        useSortBy,
        useFlexLayout
    );

    return (
        <table {...table.getTableProps()} className="table  table-hover">
            <thead>
                {table.headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
                                scope="col"
                            >
                                {column.render("Header")}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? " ▾"
                                            : " ▴"
                                        : ""}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...table.getTableBodyProps()}>
                {table.rows.map((row) => {
                    table.prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="overflow_break_word"
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default SnappablesTable;
