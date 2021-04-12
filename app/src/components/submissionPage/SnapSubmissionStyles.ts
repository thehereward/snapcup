import styled from "styled-components";
import { MentionsInput } from "react-mentions";
// @ts-ignore
import Elle from "../../images/Elle";

export const ElleImg = styled(Elle)`
    max-height: 250px;
`;

export const SnapSubmissionColumnDiv = styled.div`
    background-color: var(--purple-textbox);
    padding-top: 3%;
    padding-bottom: 3%;
    border-radius: 10px 10px 10px 10px;
`;

export const SnapCupText = styled.p`
    text-align: center;
    font-family: var(--asap);
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: white;
`;

export const SnapCupTextArea = styled(MentionsInput)`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    width: 95%;
    resize: none;
    background-color: white;
    height: 180px;
    outline: none;
`;

export const TaggedTeamMembers = styled.input`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    width: 95%;
    background-color: var(--purple-textbox);
    border: 0px;
    border-bottom: 1px solid;
    border-color: white;
    &:focus {
        outline: none;
        border: 0px;
        border-bottom: 1px solid;
        border-color: white;
    }
`;

export const LabelText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: var(--text-normal);
    margin-bottom: 5px;
`;

export const HelperText = styled(LabelText)`
    font-size: 12px;
    line-height: 16px;
    margin-right: 10px;
`;

export const SnapItButton = styled.button`
    margin-left: 5%;
    margin-right: auto;
    width: 85%;
    background: var(--purple-button-default);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 0px;
    &:hover {
        background-color: var(--purple-button-hover);
        border: 2px solid var(--button-hover-border);
        box-sizing: border-box;
        box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    }
    &:focus {
        background-color: var(--purple-button-focus);
        border: 0px;
        box-shadow: none;
    }
    &:active {
        background-color: var(--purple-button-focus);
        border: 0px;
        box-shadow: none;
    }
`;
