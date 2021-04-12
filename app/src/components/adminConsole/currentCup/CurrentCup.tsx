import React from "react";
import AdminCurrentSnapsDisplay from "./AdminCurrentSnapsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";
import { SectionHeaderUnderline } from "../AdminConsoleStyles";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

const CurrentCup: React.FunctionComponent = (props: {
    cup: Entity<Cup> | undefined;
    updateCup: () => void;
    setCup;
}) => {
    return (
        <div className="CurrentCup">
            <CurrentCupHeader cup={props.cup} updateCup={props.updateCup} />
            <SectionHeaderUnderline />
            <AdminCurrentSnapsDisplay
                cup={props.cup}
                updateCup={props.updateCup}
                setCup={props.setCup}
            />
        </div>
    );
};

export default CurrentCup;
