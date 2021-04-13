import React, { useState, useEffect } from "react";
import { MessageDisplay, CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOptionsBar from "./CurrentCupOptionsBar";
import { streamAllSnapsInCup } from "../../../firebase/snaps/SnapService";
import Cup from "../../../types/Cup";
import Snap from "../../../types/Snap";
import { Entity } from "../../../types/Entity";
import SnapList from "../../submissionPage/SnapList";
import styled from "styled-components";

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
    const [snaps, setSnaps] = useState<Entity<Snap>[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = streamAllSnapsInCup(
            (updatedSnaps) => setSnaps(updatedSnaps),
            (error) => setError(error.message),
            props.cup.id
        );
        // clean up function
        return unsubscribe;
    }, [setSnaps, setError, props.cup]);

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
