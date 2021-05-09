import React, { useState, useEffect } from "react";
import { getCurrentCupIfExists } from "../../firebase/cups/CupService";
import { Cup, Entity } from "../../types";
import { getCurrentUserName } from "../../firebase/users/UserService";
import YourSnaps from "../submissionPage/YourSnaps";
import styled from "styled-components";
import PublishedCups from "../adminConsole/publishedCups/PublishedCups";
import SubmissionBoxWrapper from "../submissionPage/SubmissionBoxWrapper";
import SubmissionTextBox from "../submissionPage/SubmissionTextBox";
import NoTextBoxMessage from "../submissionPage/NoTextBoxMessage";
import { useCups } from "../../firebase/hooks/UseCupsHook";

const WelcomeMessage = styled.p`
    font-family: var(--asap);
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purple-selected);
    padding-top: 3%;
`;

const SubmissionPage = () => {
    const [cups] = useCups();
    const [status, setStatus] = useState<string>("Loading...");
    const [cup, setCup] = useState<Entity<Cup> | undefined>(undefined);

    function isAcceptingSnaps(cup?: Entity<Cup>) {
        if (!cup) {
            return false;
        }
        if (!cup.isOpen) {
            return false;
        }

        return true;
    }

    useEffect(async () => {
        setStatus("Loading...");
        try {
            setCup(await getCurrentCupIfExists());
            setStatus("");
        } catch (err) {
            console.error("Getting cup", err);
            setStatus("There was an unexpected error loading the Snap Cup.");
        }
    }, [setCup, setStatus]);

    const getMessage = () => {
        if (!cup) {
            return "Uh oh! We're not collecting snaps right now. Try again later.";
        }
        if (status) {
            return status;
        }
        if (!cup.isOpen && !cup.isPublished) {
            return "Uh oh! We're not collecting snaps right now. Try again later.";
        } else {
            return "Uh oh! We're not collecting snaps right now. Try again later.";
        }
    };

    return (
        <>
            <WelcomeMessage>
                Welcome, {getCurrentUserName().split(" ")[0]!}
            </WelcomeMessage>
            <SubmissionBoxWrapper>
                {cup?.isOpen && !cup?.isPublished ? (
                    <SubmissionTextBox cup={cup} user={getCurrentUserName()} />
                ) : (
                    <NoTextBoxMessage message={getMessage()} />
                )}
            </SubmissionBoxWrapper>
            {cup && isAcceptingSnaps(cup) && <YourSnaps cup={cup} />}
            <PublishedCups
                cups={cups.filter((cup) => cup.isPublished == true)}
            />
        </>
    );
};

export default SubmissionPage;
