import React from "react";
import { MessageDisplay, CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOptionsBar from "./CurrentCupOptionsBar";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup> | undefined;
    updateCup: () => void;
    setCup;
}) => {
    if (!(props.cup == undefined)) {
        return (
            <div className="d-flex">
                <CupNameDisplay>{props.cup.name}</CupNameDisplay>
                <div className="flex-grow-1" />
                <CurrentCupOptionsBar
                    cup={props.cup}
                    setCup={props.setCup}
                    updateCup={props.updateCup}
                />
            </div>
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
