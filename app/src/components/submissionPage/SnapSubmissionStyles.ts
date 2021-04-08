import styled from "styled-components";
import { MentionsInput } from "react-mentions";

/* A list of styled components for SubmissionTextBox.tsx */

export const ElleImg = styled.img`
    width: 100%;
    max-height: 250px;
`;

export const LeftSideOfScreen = styled.div`
    height: 430px;
    background-color: #7040d6;
    border-radius: 10px 0px 0px 10px;
    padding: 5%;
    @media (max-width: 576px) {
        display: none;
    }
`;

export const RightSideOfScreen = styled.div`
    height: 430px;
    background-color: #7040d6;
    border-radius: 0px 10px 10px 0px;
    padding: 5%;
    @media (max-width: 576px) {
        border-radius: 10px 10px 10px 10px;
        height: 400px;
        margin-top: 10px;
    }
`;

export const SnapCupText = styled.p`
    text-align: center;
    font-family: var(--asap);
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #ffffff;
`;

export const SnapCupTextArea = styled(MentionsInput)`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    width: 95%;
    resize: none;
    background-color: #ffffff;
    height: 180px;
`;

export const TaggedTeamMembers = styled.input`
    width: 95%;
    background-color: #7040d6;
    border: 0px;
    border-bottom: 1px solid;
    border-color: #ffffff;
`;

export const LabelText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #faf8f8;
    margin-bottom: 5px;
`;

export const HelperText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #faf8f8;
    margin-right: 10px;
`;

export const SnapItButton = styled.button`
    margin-left: 5%;
    margin-right: auto;
    width: 85%;
    background: #a07ee8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 0px;
    &:hover {
        background-color: #3a09a2;
        border: 0px;
    }
    &:focus {
        background-color: #3a09a2;
        border: 0px;
        box-shadow: none;
    }
`;
