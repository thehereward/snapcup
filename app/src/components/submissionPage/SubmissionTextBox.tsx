import React, { useState, useCallback } from "react";
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
import {
    ElleImg,
    SnapCupTextArea,
    SnapCupText,
    SnapItButton,
    LabelText,
    TaggedTeamMembers,
    HelperText,
} from "./SnapSubmissionStyles";
import SubmissionBoxWrapper from "./SubmissionBoxWrapper";

export interface Props {
    snappables: MentionElements[];
    user: string;
}

const SubmissionTextBox: React.FunctionComponent = (props: Props) => {
    /* Containing body of the snap */
    const [message, setMessage] = useState<string>("");
    const [confirmation, setConfirmation] = useState<Boolean>(false);
    const [error, setError] = useState<string>("");
    const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);

    const handleSubmit = useCallback((event) => {
        const uid = getCurrentUserUid();
        event.preventDefault();
        const ids = snappedUsers.map((u: MentionElements) => u.id);
        const resultingSnap: Snap = {
            to: ids,
            from: uid,
            body: message,
            timestamp: new Date(),
        };
        if (!ValidateSnap(resultingSnap, snappedUsers)) {
            setError("Your snap is invalid.");
            setConfirmation(false);
            return;
        }

        (async () => {
            try {
                await submitSnap(resultingSnap);
                setConfirmation(true);
                setMessage("");
                setSnappedUsers([]);
            } catch (error) {
                setError("There was an error submitting the snap!");
            }
        })();
    });

    /* Updates the value in the webhook "message" */
    function handleMessageTextChanged(
        event,
        newValue,
        newPlainTextValue,
        mentions
    ) {
        setMessage(event.target.value);
        setConfirmation(false);
        setError("");
        setSnappedUsers(mentions);
    }

    /* Allows ctrl-enter to submit the form*/
    function handleKeyPress(e) {
        if (e.charCode == 13 && e.ctrlKey == true) {
            handleSubmit(e);
        }
    }

    return (
        <SubmissionBoxWrapper>
            <div className="d-none d-sm-block col col-lg-5 ">
                <SnapCupText>Add a Snap to the current SnapCup.</SnapCupText>
                <ElleImg className="w-100" />
            </div>
            <div className="col col-lg-7">
                <form>
                    <div className="form-group">
                        <LabelText>Message:</LabelText>
                        <SnapCupTextArea
                            className="form-control finalTextBox"
                            value={message}
                            onChange={handleMessageTextChanged}
                            maxLength={GetExtraLength(snappedUsers)}
                            rows={5}
                            onKeyPress={handleKeyPress}
                            placeholder="You can tag users using @."
                        >
                            <Mention
                                style={{
                                    backgroundColor: "#daf4fa",
                                    zIndex: 0,
                                    outline: "none",
                                }}
                                className="mentions__mention"
                                trigger="@"
                                data={props.snappables}
                                rows={5}
                            />
                        </SnapCupTextArea>
                        {confirmation ? (
                            <OnSubmitMessageDisplay
                                confirmation={confirmation}
                            />
                        ) : (
                            <CharactersLeftDisplay
                                snappedUsers={snappedUsers}
                                message={message}
                            />
                        )}
                        {error ? (
                            <SubmissionBoxErrorDisplay error={error} />
                        ) : null}
                    </div>
                    <SnapItButton
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >
                        Snap it
                    </SnapItButton>
                </form>
            </div>
        </SubmissionBoxWrapper>
    );
};

export default SubmissionTextBox;
