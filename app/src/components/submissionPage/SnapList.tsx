import React from "react";
import Snap from "../../firebase/snaps/Snap";

interface SnapListProps {
    snaps: Snap[];
}

const SnapList: React.FunctionComponent<SnapListProps> = ({ snaps }) => {
    const listItems = snaps.map((snap: Snap, index: number) => (
        <li key={index}>{snap.body}</li>
    ));

    return <ul>{listItems}</ul>;
};

export default SnapList;
