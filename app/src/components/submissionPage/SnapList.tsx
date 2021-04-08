import React from "react";
import Snap from "../../firebase/snaps/Snap";

interface SnapListProps {
    snaps: Snap[];
}

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const SnapList: React.FunctionComponent<SnapListProps> = ({ snaps }) => {
    function formatAts(ats: string[]): string {
        return ats.map((s) => `@${s}`).join(" ");
    }

    function formatTimestamp(date: Date) {
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hrs = date.getHours();
        const mins = date.getMinutes();
        return `${day} ${month} ${year} at ${hrs}:${mins}`;
    }

    const listItems = snaps.map((snap: Snap, index: number) => (
        <div className="col-sm-6 col-md-4 mb-2" key={index}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{formatAts(snap.to)}</h5>
                    <p className="card-text">{snap.body}</p>
                </div>
                <div className="card-footer text-muted">
                    {formatTimestamp(snap.timestamp)}
                </div>
            </div>
        </div>
    ));

    return <div className="row">{listItems}</div>;
};

export default SnapList;
