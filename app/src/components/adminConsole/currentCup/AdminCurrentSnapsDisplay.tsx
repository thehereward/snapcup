import React from "react";
import { MessageDisplay, CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOptionsBar from "./CurrentCupOptionsBar";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    return (
        <div className="d-flex">
            <CupNameDisplay>{props.cup.name}</CupNameDisplay>
            <div className="flex-grow-1" />
            <CurrentCupOptionsBar cup={props.cup} />
        </div>
    );
};

export default AdminCurrentSnapsDisplay;
