import React from "react";
import { Cup, Entity } from "../../../types";
import CupListItem from "./CupListItem";
import { MessageDisplay } from "../AdminConsoleStyles";

const AllCurrentCupsDisplay: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    const cupsList = props.cups.map((cup) => {
        return (
            <div key={cup.id}>
                <CupListItem cup={cup} />
            </div>
        );
    });
    if (props.cups.length > 0) {
        return (
            <div>{cupsList.reduce((prev, next) => [prev, <hr />, next])}</div>
        );
    } else {
        return (
            <MessageDisplay>
                No cup yet. Create a new cup to let your users get snapping!
            </MessageDisplay>
        );
    }
};

export default AllCurrentCupsDisplay;
