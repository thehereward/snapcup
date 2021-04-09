import React from "react";
import { MessageDisplay } from "../AdminConsoleStyles";
const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    isCup: Boolean;
}) => {
    if (props.isCup) {
        return (
            <p></p> //grid of current snaps, or polite 'no snaps yet' message
        );
    } else {
        return (
            <MessageDisplay>
                No cup yet. Create a new cup to let your users get snapping!
            </MessageDisplay>
        );
    }
};

export default AdminCurrentSnapsDisplay;
