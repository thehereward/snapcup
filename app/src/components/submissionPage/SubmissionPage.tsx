import React, { useState, useEffect } from "react";
import { getCurrentCupIfExists } from "../../firebase/cups/CupService";
import { CupWithId } from "../../types/Cup";
import MentionElements from "../../types/MentionElements";
import { getCurrentUserName } from "../../firebase/users/UserService";
import YourSnaps from "./YourSnaps";
import styled from "styled-components";
import TextBoxIfSnapcupOpen from "./TextBoxIfSnapcupOpen";

const WelcomeMessage = styled.p`
    font-family: var(--asap);
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purple-selected);
    padding-top: 3%;
`;

const SubmissionPage = (props: { snappables: MentionElements[] }) => {
    const [status, setStatus] = useState<string>("Loading...");
    const [cup, setCup] = useState<CupWithId | undefined>(undefined);

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

    return (
        <>
            <WelcomeMessage>
                Welcome, {getCurrentUserName().split(" ")[0]!}
            </WelcomeMessage>
            <TextBoxIfSnapcupOpen
                cup={cup}
                snappables={props.snappables}
                status={status}
            />
            {cup && <YourSnaps cup={cup} />}
        </>
    );
};

export default SubmissionPage;
