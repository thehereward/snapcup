import React from "react";
import { Cup, Entity } from "../../../types";
import SnapList from "../../submissionPage/SnapList";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";

const CurrentSnapsDisplay = (props: { cup: Entity<Cup> }) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div>
            <h2 className="mb-2">{props.cup.name}</h2>
            <p className="styled-horizontal-rule" />
            {<SnapList snaps={snaps} cup={props.cup} />}
        </div>
    );
};

export default CurrentSnapsDisplay;
