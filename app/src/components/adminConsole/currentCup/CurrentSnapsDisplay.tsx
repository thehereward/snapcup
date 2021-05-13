import React from "react";
import { SectionHeader, SectionHeaderUnderline } from "../AdminConsoleStyles";
import { Cup, Entity } from "../../../types";
import SnapList from "../../submissionPage/SnapList";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";

const CurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div>
            <SectionHeader className="mb-2">{props.cup.name}</SectionHeader>
            <SectionHeaderUnderline />
            {<SnapList snaps={snaps} cup={props.cup} />}
        </div>
    );
};

export default CurrentSnapsDisplay;
