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
// @ts-ignore
import Elle from "../../images/Elle.svg";
import {
    ElleImg,
    LeftSideOfScreen,
    RightSideOfScreen,
    SnapCupTextArea,
    SnapCupText,
    SnapItButton,
    LabelText,
    TaggedTeamMembers,
    HelperText,
} from "./SnapSubmissionStyles";

export interface Props {
    snappables: MentionElements[];
    user: String;
}

const SubmissionTextBox: React.FunctionComponent = (props: Props) => {
    /* Containing body of the snap */
    const [message, setMessage] = useState<string>("");
    const [confirmation, setConfirmation] = useState<Boolean>(false);
    const [error, setError] = useState<String>("");
    const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);

    function handleSubmit(event) {
        const uid = getCurrentUserUid();
        event.preventDefault();
        const ids: String[] = [];
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
        <div className="container-sm">
            <div className="row justify-content-md-center">
                <LeftSideOfScreen className="col-sm col-lg-5">
                    <SnapCupText>
                        Add a Snap to the current SnapCup.
                    </SnapCupText>
                    <ElleImg src={Elle} className="w-100" />
                </LeftSideOfScreen>
                <RightSideOfScreen className="col-sm col-lg-5">
                    <form>
                        <div>
                            <LabelText>Tag Team Members</LabelText>
                            <TaggedTeamMembers
                                type="text"
                                className="form-control"
                            />
                            <HelperText>
                                Enter their email address or use the @ symbol
                            </HelperText>
                        </div>
                        <div className="form-group">
                            <LabelText>Message:</LabelText>
                            <SnapCupTextArea
                                className="form-control"
                                value={message}
                                onChange={handleChange}
                                maxLength={GetExtraLength(snappedUsers)}
                                rows={5}
                                placeholder="You can tag users using @."
                            >
                                <Mention
                                    style={{
                                        backgroundColor: "#daf4fa",
                                        zIndex: 0,
                                    }}
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
                </RightSideOfScreen>
            </div>
        </div>
    );
};

export default SubmissionTextBox;
