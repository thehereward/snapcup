import React, { useState, useEffect } from "react";
import { getCurrentCupIfExists } from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";
import MentionElements from "../../types/MentionElements";
import Snappable from "../../types/Snappable";
import { getCurrentUserName } from "../../firebase/users/UserService";
import YourSnaps from "./YourSnaps";
import styled from "styled-components";
import PublishedCups from "../adminConsole/publishedCups/PublishedCups";
import SubmissionBoxWrapper from "./SubmissionBoxWrapper";
import SubmissionTextBox from "./SubmissionTextBox";
import NoTextBoxMessage from "./NoTextBoxMessage";
import { useSnappablePeople } from "../../firebase/hooks/UseSnappablePeopleHook";
import { useCups } from "../../firebase/hooks/UseCupsHook";

const WelcomeMessage = styled.p`
    font-family: var(--asap);
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purple-selected);
    padding-top: 3%;
`;

const toMentionElements = (s: Snappable): MentionElements => {
    return { id: s.id, display: s.fullName };
};

const SubmissionPage = () => {
    const [snappables] = useSnappablePeople();
    const [cups] = useCups();
    const [status, setStatus] = useState<string>("Loading...");
    const [cup, setCup] = useState<Entity<Cup> | undefined>(undefined);

    useEffect(async () => {
        setStatus("Loading...");
        try {
            setCup(await getCurrentCupIfExists());
            setStatus("");
        } catch (err) {
            console.error("Getting cup", err);
            setStatus("There was an unexpected error loading the snapcup.");
        }
    }, [setCup, setStatus]);

    const getMessage = () => {
        if (!cup) {
            return "Apologies, there are no SnapCups at the moment.";
        }
        if (status) {
            return status;
        }
        if (!cup.isOpen && !cup.isPublished) {
            return "Apologies, the SnapCup is closed for new submissions.";
        } else {
            return "Apologies, there is no open SnapCup at the moment.";
        }
    };

    return (
        <>
            <WelcomeMessage>
                Welcome, {getCurrentUserName().split(" ")[0]!}
            </WelcomeMessage>
            <SubmissionBoxWrapper>
                {cup?.isOpen && !cup?.isPublished ? (
                    <SubmissionTextBox
                        cup={cup}
                        snappables={snappables.map(toMentionElements)}
                        user={getCurrentUserName()}
                    />
                ) : (
                    <NoTextBoxMessage message={getMessage()} />
                )}
            </SubmissionBoxWrapper>
            {cup && <YourSnaps cup={cup} />}
            <PublishedCups
                cups={cups.filter((cup) => cup.isPublished == true)}
            />
        </>
    );
};

export default SubmissionPage;
