import React from "react";
import { CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupDeleteButton from "./CurrentCupDeleteButton";
import ExportSnaps from "../ExportSnaps";
import { Cup, Entity } from "../../../types";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div className="d-flex row">
            <CupNameDisplay className="flex-grow-1 col-12 col-lg-1">
                {props.cup.name}
            </CupNameDisplay>
            <ExportSnaps cup={props.cup} className="col-12 col-lg" />
            <CurrentCupOpennessButton
                cup={props.cup}
                className="col-12 col-lg"
            />
            <CurrentCupPublishButton
                cup={props.cup}
                className="col-12 col-lg"
            />
            <CurrentCupDeleteButton
                cup={props.cup}
                className="warning col-12 col-lg"
            />
        </div>
    );
};

export default AdminCurrentSnapsDisplay;
