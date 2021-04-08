import React from "react";
import Snap from "../../firebase/snaps/Snap";

interface SnapListProps {
    snaps: Snap[];
}

const SnapList: React.FunctionComponent<SnapListProps> = ({ snaps }) => {
    function formatAts(ats: string[]): string {
        return ats.map((s) => `@${s}`).join(" ");
    }

    const listItems = snaps.map((snap: Snap, index: number) => (
        <div className="col-sm-6 col-md-4 mb-2" key={index}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{formatAts(snap.to)}</h5>
                    <p className="card-text">{snap.body}</p>
                </div>
                <div className="card-footer text-muted">{"8 April 2021"}</div>
            </div>
        </div>
    ));

    return <div className="row">{listItems}</div>;
};

export default SnapList;
