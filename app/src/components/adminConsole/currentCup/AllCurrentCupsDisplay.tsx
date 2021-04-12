import React from "react";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";
import AdminCurrentSnapsDisplay from "./AdminCurrentSnapsDisplay";
import { MessageDisplay } from "../AdminConsoleStyles";

const AllCurrentCupsDisplay: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
    updateCups: () => void;
    setCups;
}) => {
    const cupsList = props.cups.map((cup) => {
        return (
            <div key={cup.id}>
                <AdminCurrentSnapsDisplay
                    cup={cup}
                    updateCups={props.updateCups}
                    setCups={props.setCups}
                />
            </div>
        );
    });
    if (props.cups.length > 0) {
        return <div>{cupsList}</div>;
    } else {
        return (
            <MessageDisplay>
                No cup yet. Create a new cup to let your users get snapping!
            </MessageDisplay>
        );
    }
};

export default AllCurrentCupsDisplay;
