import React from "react";
import { CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOptionsBar from "./CurrentCupOptionsBar";
import { Cup, Entity } from "../../../types";
import SnapList from "../../submissionPage/SnapList";
import styled from "styled-components";
import { useSnapsInCup } from "../../../firebase/hooks/UseSnapsInCupHook";

const PublishedStatus = styled(CupNameDisplay)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
`;

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
    updateCups: () => void;
}) => {
    const [snaps] = useSnapsInCup(props.cup.id);

    return (
        <div>
            <div className="d-flex">
                <div>
                    <CupNameDisplay>{props.cup.name}</CupNameDisplay>
                    <PublishedStatus>
                        {props.cup.isPublished
                            ? "Published"
                            : "Not yet published."}
                    </PublishedStatus>
                </div>
                <div className="flex-grow-1" />
                <CurrentCupOptionsBar
                    cup={props.cup}
                    updateCups={props.updateCups}
                />
            </div>
            {snaps.length > 0 && <SnapList snaps={snaps} cup={props.cup} />}
        </div>
    );
};

export default AdminCurrentSnapsDisplay;
