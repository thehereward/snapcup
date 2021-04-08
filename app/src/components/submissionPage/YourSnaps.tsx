import React from "react";
import { useState, useEffect } from "react";
import Snap from "../../types/Snap";
import { streamSubmittedSnapsForCurrentUser } from "../../firebase/snaps/SnapService";
import SnapList from "./SnapList";
import styled, { css } from "styled-components";
// @ts-ignore
import Elle from "../loginPage/Elle.svg";

const YourSnapsHeader = styled.h2`
    font-family: Asap;
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--elle);
    margin-bottom: 25px;
`;

const MiniElleImg = styled.img`
    height: 66px;
    width: auto;
    vertical-align: text-bottom;
    margin-right: 19px;
`;

const YourSnaps: React.FunctionComponent = () => {
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = streamSubmittedSnapsForCurrentUser(
            (updatedSnaps) => setSnaps(updatedSnaps),
            (error) => setError(error.message)
        );
        // clean up function
        return unsubscribe;
    }, [setSnaps, setError]);

    return (
        <div>
            <YourSnapsHeader>
                <MiniElleImg src={Elle} />
                SnapCups
            </YourSnapsHeader>
            {error && <p>Error: {error}</p>}
            {snaps.length > 0 && <SnapList snaps={snaps} />}
        </div>
    );
};

export default YourSnaps;
