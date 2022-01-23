import { MentionElements } from "../../types";
import GetExtraLength from "./GetExtraLength";
import React from "react";
import styled from "styled-components";

import { HelperText } from "./SnapSubmissionStyles";

const CharactersLeft = styled(HelperText)`
    text-align: right;
    color: var(--text-normal);
`;

/* Calculate the amount of characters left for you to use*/
export const GetCharacterCountRemaining = (
    message: string,
    snappedUsers: MentionElements[]
) => {
    return GetExtraLength(snappedUsers) - message.length;
};

const CharactersLeftDisplay = (props: {
    snappedUsers: MentionElements[];
    message: string;
}) => {
    return (
        <CharactersLeft>
            There are{" "}
            {GetCharacterCountRemaining(props.message, props.snappedUsers)}{" "}
            characters remaining
        </CharactersLeft>
    );
};

export default CharactersLeftDisplay;
