import React from "react";
import { useState, useEffect } from "react";
import { Snap } from "../../types";
import { streamSubmittedSnapsForCurrentUser } from "../../firebase/snaps/SnapService";
import SnapList from "./SnapList";
import styled, { css } from "styled-components";
// @ts-ignore
import SectionHeading from "../transferable/SectionHeading";

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
    font-family: var(--asap);
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

const YourSnaps: React.FunctionComponent = ({ cup }) => {
    const [snaps, setSnaps] = useState<Snap[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = streamSubmittedSnapsForCurrentUser(
            (updatedSnaps) => setSnaps(updatedSnaps),
            (error) => setError(error.message),
            cup.id
        );
        // clean up function
        return unsubscribe;
    }, [setSnaps, setError, cup]);

    return (
        <div>
            <SectionHeading title={"Your Snaps"} />
            <SnapCupName>Current cup: {cup.name}</SnapCupName>
            {error && <p>Error: {error}</p>}
            <PublishedStatus>
                {cup.isPublished ? "Published" : "Not yet published."}
            </PublishedStatus>
            {snaps.length > 0 && <SnapList snaps={snaps} cup={cup} />}
        </div>
    );
};

export default YourSnaps;
