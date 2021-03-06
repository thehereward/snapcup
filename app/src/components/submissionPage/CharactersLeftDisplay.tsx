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
        <div className="text-end font-family-open-sans fw-bold colour-text-normal font-size-12 me-1">
            There are{" "}
            {GetCharacterCountRemaining(props.message, props.snappedUsers)}{" "}
            characters remaining
        </div>
    );
};

export default CharactersLeftDisplay;
