import React from "react";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    isCup: Boolean;
}) => {
    if (props.isCup) {
        return (
            <p></p> //grid of current snaps, or polite 'no snaps yet' message
        );
    } else {
        return (
            <p>No cup yet. Create a new cup to let your users get snapping!</p>
        );
    }
};

export default AdminCurrentSnapsDisplay;
