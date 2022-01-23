import { MentionElements } from "../../types";
import GetExtraLength from "./GetExtraLength";
import React from "react";

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
        <p className="characters-left-text">
            There are{" "}
            {GetCharacterCountRemaining(props.message, props.snappedUsers)}{" "}
            characters remaining
        </p>
    );
};

export default CharactersLeftDisplay;
