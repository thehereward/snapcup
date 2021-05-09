import React from "react";
import { Cup, Entity } from "../../../types";
import CupListItem from "./CupListItem";
import { MessageDisplay } from "../AdminConsoleStyles";

const AllCurrentCupsDisplay: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    const cups = props.cups;

    if (cups.length == 0) {
        return (
            <MessageDisplay>
                No cup yet. Create a new cup to let your users get snapping!
            </MessageDisplay>
        );
    }

    const cupsList = cups.map((cup) => {
        return <CupListItem key={cup.id} cup={cup} />;
    });
    return (
        <div>
            {cupsList.reduce((prev, next, index) => [
                prev,
                <hr key={`hr-${index}`} />,
                next,
            ])}
        </div>
    );
};

export default AllCurrentCupsDisplay;
