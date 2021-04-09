import React from "react";
import { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import MentionElements from "../../types/MentionElements";
import GetExtraLength from "./GetExtraLength";
import CharactersLeftDisplay from "./CharactersLeftDisplay";
import OnSubmitMessageDisplay from "./OnSubmitMessageDisplay";
import SubmissionBoxErrorDisplay from "./SubmissionBoxErrorDisplay";
import ValidateSnap from "./ValidateSnap";
import { getCurrentUserUid } from "../../firebase/users/UserService";
import Snap from "../../types/Snap";
import { submitSnap } from "../../firebase/snaps/SnapService";

export interface Props {
    snappables: MentionElements[];
    user: String;
}

const SubmissionTextBox: React.FunctionComponent = (props: Props) => {
    /* Containing body of the snap */
    const [message, setMessage] = useState<string>("");
    const [confirmation, setConfirmation] = useState<Boolean>(false);
    const [error, setError] = useState<string>("");
    const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);

    function handleSubmit(event) {
        const uid = getCurrentUserUid();
        event.preventDefault();
        const ids: string[] = [];
        for (let elem of snappedUsers) {
            ids.push(elem.id);
        }
        const resultingSnap: Snap = {
            to: ids,
            from: uid,
            body: message,
            timestamp: new Date(),
        };
        if (ValidateSnap(resultingSnap, snappedUsers)) {
            try {
                submitSnap(resultingSnap);
                setConfirmation(true);
                setMessage("");
                setSnappedUsers([]);
            } catch (error) {
                setError(error.toString());
            }
        } else {
            setError("Your snap is invalid.");
            setConfirmation(false);
        }
    }

    /* Updates the value in the webhook "message" */
    function handleChange(event, newValue, newPlainTextValue, mentions) {
        setMessage(event.target.value);
        setConfirmation(false);
        setError("");
        setSnappedUsers(mentions);
    }

    return (
        <div className="SubmissionTextBox">
            <form onSubmit={handleSubmit}>
                <h1>Submit Snap</h1>
                <MentionsInput
                    style={{ zIndex: 1 }}
                    value={message}
                    onChange={handleChange}
                    maxLength={GetExtraLength(snappedUsers)}
                >
                    <Mention
                        style={{ backgroundColor: "#daf4fa", zIndex: 0 }}
                        trigger="@"
                        data={props.snappables}
                    />
                </MentionsInput>
                <input type="submit" value="Submit" />
            </form>
            <CharactersLeftDisplay
                snappedUsers={snappedUsers}
                message={message}
            />
            <OnSubmitMessageDisplay confirmation={confirmation} />
            <SubmissionBoxErrorDisplay error={error} />
        </div>
    );
};

export default SubmissionTextBox;
