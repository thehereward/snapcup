import React, { useState, useCallback } from "react";
import { MentionsInput, Mention } from "react-mentions";
import GetExtraLength from "./GetExtraLength";
import CharactersLeftDisplay from "./CharactersLeftDisplay";
import OnSubmitMessageDisplay from "./OnSubmitMessageDisplay";
import SubmissionBoxErrorDisplay from "./SubmissionBoxErrorDisplay";
import validateSnap from "./ValidateSnap";
import { getCurrentUserUid } from "../../firebase/users/UserService";
import { Cup, Entity, MentionElements, Snap, Snappable } from "../../types";
import { submitSnap } from "../../firebase/snaps/SnapService";
import {
    ElleImg,
    SnapCupText,
    SnapItButton,
    LabelText,
} from "./SnapSubmissionStyles";
import { TextBoxStyle } from "./TextBoxStyle";
import { useSnappablePeople } from "../../firebase/hooks/UseSnappablePeopleHook";

export interface Props {
    user: string;
    cup: Entity<Cup>;
}

const toMentionElements = (s: Snappable): MentionElements => {
    return { id: s.id, display: s.fullName };
};

const SubmissionTextBox: React.FunctionComponent = (props: Props) => {
    /* Containing body of the snap */
    const [message, setMessage] = useState<string>("");
    const [confirmation, setConfirmation] = useState<Boolean>(false);
    const [error, setError] = useState<string>("");
    const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);

    const [snappables] = useSnappablePeople(props.cup.id);

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
        if (!validateSnap(resultingSnap, snappedUsers)) {
            setError("Your snap is invalid.");
            setConfirmation(false);
            return;
        }

        (async () => {
            try {
                await submitSnap(resultingSnap, props.cup.id);
                setConfirmation(true);
                setMessage("");
                setSnappedUsers([]);
            } catch (error) {
                console.error(error);
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
        <>
            <div className="d-none d-sm-block col col-lg-5 ">
                <SnapCupText>Add a Snap to the current SnapCup.</SnapCupText>
                <ElleImg className="w-100" />
            </div>
            <div className="col col-lg-7">
                <form>
                    <div className="form-group">
                        <LabelText>Message:</LabelText>
                        <MentionsInput
                            className="form-control finalTextBox"
                            value={message}
                            onChange={handleMessageTextChanged}
                            maxLength={GetExtraLength(snappedUsers)}
                            rows={5}
                            onKeyPress={handleKeyPress}
                            placeholder="You can tag users using @."
                            style={TextBoxStyle}
                        >
                            <Mention
                                style={{
                                    backgroundColor:
                                        "var(--button-hover-border)",
                                    zIndex: 1,
                                    outline: "none",
                                }}
                                className="mentions__mention"
                                trigger="@"
                                data={snappables.map(toMentionElements)}
                                rows={5}
                            />
                        </MentionsInput>
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
                        className={`btn btn-primary ${
                            confirmation ? "success" : ""
                        } ${error ? "error" : ""}`}
                        onClick={handleSubmit}
                    >
                        Snap it
                    </SnapItButton>
                </form>
            </div>
        </>
    );
};

export default SubmissionTextBox;
