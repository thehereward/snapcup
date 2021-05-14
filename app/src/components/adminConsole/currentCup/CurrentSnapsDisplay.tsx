import React from "react";
import { StyledHorizontalRule } from "../../transferable/styles";
import { Cup, Entity } from "../../../types";
import SnapList from "../../submissionPage/SnapList";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";

const CurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div>
            <h2 className="mb-2">{props.cup.name}</h2>
            <StyledHorizontalRule />
            {<SnapList snaps={snaps} cup={props.cup} />}
        </div>
    );
};

export default CurrentSnapsDisplay;
