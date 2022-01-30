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
import Elle from "../../images/Elle";
import { useSnappablePeople } from "../../firebase/hooks/UseSnappablePeopleHook";

export interface Props {
    user: string;
    cup: Entity<Cup>;
}

const toMentionElements = (s: Snappable): MentionElements => {
    return { id: s.id, display: s.fullName };
};

const byFullName = (a: Snappable, b: Snappable) =>
    a.fullName.localeCompare(b.fullName);

function anyMatch(snappable: Snappable, query: string) {
    query = query.toUpperCase();
    return (
        snappable.email.toUpperCase().includes(query) ||
        snappable.fullName.toUpperCase().includes(query) ||
        snappable.username.toUpperCase().includes(query)
    );
}

const SubmissionTextBox = (props: Props) => {
    /* Containing body of the snap */
    const [message, setMessage] = useState<string>("");
    const [confirmation, setConfirmation] = useState<Boolean>(false);
    const [error, setError] = useState<string>("");
    const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);

    const [snappables] = useSnappablePeople(props.cup.id);

    function filterSnappables(query: string) {
        return snappables
            .filter((s) => anyMatch(s, query))
            .sort(byFullName)
            .map(toMentionElements);
    }

    const handleSubmit = useCallback(
        (event) => {
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
        },
        [snappedUsers, getCurrentUserUid]
    );

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
                <p className="font-weight-bold colour-text-normal text-center font-size-20">
                    Add a Snap to the Snap Cup!
                </p>
                <Elle className="elle-image w-100" />
            </div>
            <div className="col col-lg-7">
                <form className="d-flex flex-column">
                    <div className="form-group">
                        <p className="font-family-open-sans font-weight-bold colour-text-normal mb-1 font-size-14">
                            Message:
                        </p>
                        <MentionsInput
                            className="mentions"
                            value={message}
                            onChange={handleMessageTextChanged}
                            maxLength={GetExtraLength(snappedUsers)}
                            rows={5}
                            onKeyPress={handleKeyPress}
                            placeholder="You can tag users using @."
                        >
                            <Mention
                                className="mentions__mention"
                                trigger="@"
                                data={filterSnappables}
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
                    <button
                        type="submit"
                        className={`rounded-lg mx-4 btn btn-primary snap-it-button colour-text-normal shadow-lg mt-2 ${
                            confirmation ? "success" : ""
                        } ${error ? "error" : ""}`}
                        onClick={handleSubmit}
                    >
                        Snap!
                    </button>
                </form>
            </div>
        </>
    );
};

export default SubmissionTextBox;
