import React from "react";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupDeleteButton from "./CurrentCupDeleteButton";
import ExportSnaps from "../ExportSnaps";
import { Cup, Entity } from "../../../types";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";
import { Link } from "react-router-dom";

const AdminCurrentSnapsDisplay = (props: { cup: Entity<Cup> }) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div className="row">
            <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                <Link
                    to={`/manage/cups/${props.cup.id}`}
                    className="fw-bold colour-secondary colour-primary-on-hover font-size-22 col-12 text-decoration-none"
                >
                    {props.cup.name}
                </Link>
                <p className="col-12">
                    <span className="badge bg-dark">
                        Contains {snaps.length}{" "}
                        {snaps.length == 1 ? "snap" : "snaps"}
                    </span>
                </p>
            </div>
            <div className="col-12 col-md-2 col-lg-2 col-xl-2">
                <CurrentCupOpennessButton cup={props.cup} />
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 stack">
                <ExportSnaps cup={props.cup} />
                <CurrentCupPublishButton cup={props.cup} />
                <CurrentCupDeleteButton cup={props.cup} />
            </div>
        </div>
    );
};

export default AdminCurrentSnapsDisplay;
