import React from "react";
import { CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupDeleteButton from "./CurrentCupDeleteButton";
import ExportSnaps from "../ExportSnaps";
import { Cup, Entity } from "../../../types";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";
import { Link } from "react-router-dom";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div className="row">
            <CupNameDisplay className="col-12 col-md-4 col-lg-6 col-xl-4">
                <Link to={`/manage/cups/${props.cup.id}`}>
                    {props.cup.name}
                </Link>
                <span className="badge badge-pill badge-light ml-2">
                    Snaps Sent: {snaps.length}
                </span>
            </CupNameDisplay>
            <div className="col-12 col-md-8 col-lg-6 col-xl-8 stack">
                <ExportSnaps cup={props.cup} />
                <CurrentCupOpennessButton cup={props.cup} />
                <CurrentCupPublishButton cup={props.cup} />
                <CurrentCupDeleteButton cup={props.cup} />
            </div>
        </div>
    );
};

export default AdminCurrentSnapsDisplay;
