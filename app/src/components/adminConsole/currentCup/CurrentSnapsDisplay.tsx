import React from "react";
import {
    CupNameDisplay,
    SectionHeader,
    SectionHeaderUnderline,
} from "../AdminConsoleStyles";
import { Cup, Entity } from "../../../types";
import SnapList from "../../submissionPage/SnapList";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";

const CurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div>
            <div className="d-flex">
                <CupNameDisplay>{props.cup.name}</CupNameDisplay>
            </div>
            <hr />
            <SectionHeader className="mb-2">Snaps</SectionHeader>
            <SectionHeaderUnderline />
            {<SnapList snaps={snaps} cup={props.cup} />}
        </div>
    );
};

export default CurrentSnapsDisplay;
