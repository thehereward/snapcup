import React from "react";
import { useState, useEffect } from "react";
import Snap from "../../types/Snap";
import { streamSubmittedSnapsForCurrentUser } from "../../firebase/snaps/SnapService";
import SnapList from "./SnapList";
import styled, { css } from "styled-components";
// @ts-ignore
import Elle from "../../images/Elle";

const YourSnapsHeader = styled.h2`
    font-family: Asap;
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purple-selected);
    margin-top: 25px;
    margin-bottom: 25px;
    border: 0px;
    border-bottom: 1px solid;
    border-color: var(--horizontal-divider);
    padding-bottom: 10px;
`;

const SnapCupName = styled.p`
    font-family: Asap;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: var(--purple-selected);
`;

const PublishedStatus = styled(SnapCupName)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
`;

const MiniElleImg = styled(Elle)`
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

    /* Skeleton Function to get snapcup name*/
    const getSnapCupName = () => {
        return "SnapCup";
    };

    /* Skeleton Function to get the status of a snapcup */
    const getPublishedStatus = () => {
        return "Not Yet Published";
    };

    return (
        <div>
            <YourSnapsHeader>
                <MiniElleImg />
                SnapCups
            </YourSnapsHeader>
            <SnapCupName>CupName {getSnapCupName()}</SnapCupName>
            {error && <p>Error: {error}</p>}
            <PublishedStatus>{getPublishedStatus()}</PublishedStatus>
            {snaps.length > 0 && <SnapList snaps={snaps} />}
        </div>
    );
};

export default YourSnaps;
