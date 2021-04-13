import React, { useState, useEffect } from "react";
import { getCurrentCupIfExists } from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";
import MentionElements from "../../types/MentionElements";
import { getCurrentUserName } from "../../firebase/users/UserService";
import YourSnaps from "./YourSnaps";
import styled from "styled-components";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";
import PublishedCups from "../adminConsole/publishedCups/PublishedCups";
import SubmissionBoxWrapper from "./SubmissionBoxWrapper";
import SubmissionTextBox from "./SubmissionTextBox";

const WelcomeMessage = styled.p`
    font-family: var(--asap);
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purple-selected);
    padding-top: 3%;
`;

const SubmissionPage = (props: {
    snappables: MentionElements[];
    publishedCups: Entity<Cup>[];
}) => {
    const [status, setStatus] = useState<string>("Loading...");
    const [cup, setCup] = useState<Entity<Cup> | undefined>(undefined);

    useEffect(() => {
        setStatus("Loading...");
        (async () => {
            try {
                setCup(await getCurrentCupIfExists());
                setStatus("");
            } catch (err) {
                console.error("Getting cup", err);
                setStatus("There was an unexpected error loading the snapcup.");
            }
        })();
    }, [setCup]);

    let textBoxAreaMessage;
    if (cup?.isOpen) {
        textBoxAreaMessage = "";
    } else if (cup) {
        textBoxAreaMessage =
            "Apologies, the SnapCup is closed for new submissions.";
    } else if (status) {
        textBoxAreaMessage = status;
    } else {
        textBoxAreaMessage =
            "Apologies, there is no open SnapCup at the moment.";
    }

    return (
        <>
            <WelcomeMessage>
                Welcome, {getCurrentUserName().split(" ")[0]!}
            </WelcomeMessage>
            <SubmissionBoxWrapper>
                {textBoxAreaMessage ? (
                    <div className="col text-light">
                        <h3>{textBoxAreaMessage}</h3>
                    </div>
                ) : (
                    <SubmissionTextBox
                        cup={cup}
                        snappables={props.snappables}
                        user={getCurrentUserName()}
                    />
                )}
            </SubmissionBoxWrapper>
            {cup && <YourSnaps cup={cup} />}
            <PublishedCups cups={props.publishedCups} />
        </>
    );
};

export default SubmissionPage;
