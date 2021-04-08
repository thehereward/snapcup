import MentionElements from "../../types/MentionElements";
import GetExtraLength from "./GetExtraLength";
import React from "react";
import styled from "styled-components";

const HelperText = styled.p`
    text-align: right;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #faf8f8;
    margin-right: 10px;
`;

/* Calculate the amount of characters left for you to use*/
export const GetCharacterCountRemaining = (
    message: String,
    snappedUsers: MentionElements[]
) => {
    return GetExtraLength(snappedUsers) - message.length;
};

const CharactersLeftDisplay: React.FunctionComponent = (props: {
    snappedUsers: MentionElements[];
    message: string;
}) => {
    return (
        <HelperText>
            There are{" "}
            {GetCharacterCountRemaining(props.message, props.snappedUsers)}{" "}
            characters remaining
        </HelperText>
    );
};

export default CharactersLeftDisplay;
