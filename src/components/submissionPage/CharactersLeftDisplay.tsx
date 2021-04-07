import MentionElements from "../../types/MentionElements";
import GetExtraLength from './GetExtraLength'
import React from "react";

/* Calculate the amount of characters left for you to use*/
export const GetCharacterCountRemaining = (message: String, snappedUsers: MentionElements[]) => {
    return GetExtraLength(snappedUsers) - message.length
}

const CharactersLeftDisplay: React.FunctionComponent = (props: { snappedUsers: MentionElements[], message: string }) => {
    return <p>There are {GetCharacterCountRemaining(props.message, props.snappedUsers)} characters remaining</p>
}

//characters left display
export default CharactersLeftDisplay;