import React from "react";
import SubmissionTextBox from "./SubmissionTextBox";
import MentionElements from "../../types/MentionElements";
import { getCurrentUserName } from "../../firebase/users/UserService";
import YourSnaps from "./YourSnaps";
import styled from "styled-components";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";
import PublishedCups from "../adminConsole/publishedCups/PublishedCups";

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
    return (
        <>
            <WelcomeMessage>
                Welcome, {getCurrentUserName().split(" ")[0]!}
            </WelcomeMessage>
            <SubmissionTextBox
                snappables={props.snappables}
                user={getCurrentUserName()}
            />
            <YourSnaps />
            <PublishedCups cups={props.publishedCups} />
        </>
    );
};

export default SubmissionPage;
