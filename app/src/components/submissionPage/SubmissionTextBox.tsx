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
import styled from "styled-components";

export interface Props {
    snappables: MentionElements[];
    user: String;
}

const LeftSideOfScreen = styled.div`
    height: 370px;
    background-color: #7040d6;
    border-radius: 10px 0px 0px 10px;
    padding: 5%;
    @media (max-width: 576px) {
        display: none;
    }
`;

const RightSideOfScreen = styled.div`
    height: 370px;
    background-color: #7040d6;
    border-radius: 0px 10px 10px 0px;
    padding: 5%;
    @media (max-width: 576px) {
        border-radius: 10px 10px 10px 10px;
        height: 370px;
        margin-top: 10px;
    }
`;

const SnapCupText = styled.p`
    text-align: center;
    font-family: var(--asap);
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #ffffff;
`;

const SnapCupTextArea = styled(MentionsInput)`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    width: 95%;
    resize: none;
    background-color: #ffffff;
    height: 120px;
`;

const TaggedTeamMembers = styled.input`
    width: 95%;
    background-color: #7040d6;
    border: 0px;
    border-bottom: 1px solid;
    border-color: #ffffff;
`;

const LabelText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #faf8f8;
    margin-bottom: 5px;
`;

const HelperText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #faf8f8;
    margin-right: 10px;
`;

const SnapItButton = styled.button`
    margin-left: 5%;
    margin-right: auto;
    width: 85%;
    background: #a07ee8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 0px;
    &:hover {
        background-color: #3a09a2;
        border: 0px;
    }
    &:focus {
        background-color: #3a09a2;
        border: 0px;
        box-shadow: none;
    }
`;

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

    /* 
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
    */

    return (
        <div className="container-sm">
            <div className="row justify-content-md-center">
                <LeftSideOfScreen className="col-sm col-lg-5">
                    <SnapCupText>
                        Add a Snap to the current SnapCup.
                    </SnapCupText>
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
