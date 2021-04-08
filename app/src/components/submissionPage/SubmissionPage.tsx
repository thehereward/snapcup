import React from "react";
import SubmissionTextBox from "./SubmissionTextBox";
import { getCurrentUserName } from "../../firebase/AuthService";
import styled from "styled-components";

const WelcomeMessage = styled.p`
    font-family: var(--asap);
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purp-selected);
    padding-top: 3%;
`;

const SubmissionPage = () => {
    return (
        <>
            <WelcomeMessage>
                Welcome, {getCurrentUserName().split(" ")[0]!}
            </WelcomeMessage>
            <SubmissionTextBox />
        </>
    );
};

export default SubmissionPage;
