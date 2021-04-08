import React from "react";
import { useState } from "react";
import Snap from "../../firebase/snap/Snap";
import submitSnap from "../../firebase/snap/SubmitSnap";
import styled from "styled-components";

const LeftSideOfScreen = styled.div`
    height: 400px;
    background-color: #7040d6;
    border-radius: 10px 0px 0px 10px;
    padding: 5%;
    @media (max-width: 576px) {
        display: none;
    }
`;

const RightSideOfScreen = styled.div`
    height: 400px;
    background-color: #7040d6;
    border-radius: 0px 10px 10px 0px;
    padding: 5%;
    @media (max-width: 576px) {
        border-radius: 10px 10px 10px 10px;
    }
`;

const SnapCupText = styled.p`
    font-family: var(--asap);
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    color: #ffffff;
`;

const SnapCupTextArea = styled.textarea`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    width: 95%;
    resize: none;
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
`;

const HelperText = styled.p`
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #faf8f8;
`;

const SnapItButton = styled.button`
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    background: #a07ee8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 0px;
    &:hover {
        background: #3a09a2;
        border: 0px;
    }
    &:visited {
        background: #3a09a2;
        border: 0px;
    }
`;

const SubmissionTextBox: React.FunctionComponent = () => {
    const [message, setMessage] = useState<string>("");
    const [confirmation, setConfirmation] = useState<Boolean>(false);
    const [error, setError] = useState<string>("");

    function handleSubmit(event) {
        event.preventDefault();
        const resultingSnap: Snap = {
            to: [],
            from: "",
            body: message,
            timestamp: new Date(),
        };
        try {
            submitSnap(resultingSnap);
            setConfirmation(true);
        } catch (error) {
            setError(error.toString());
        }
    }

    function handleMessageTextChanged(event) {
        setMessage(event.target.value);
        setConfirmation(false);
        setError("");
    }

    /* old text box
    <div className="SubmissionTextBox">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={handleMessageTextChanged}
                    maxLength={280}
                />
                <input type="submit" value="Submit" />
            </form>
            <p>There are {280 - message.length} characters remaining</p>
            {confirmation && <p>Snap submitted!</p>}
            {error != "" && <p>{error}</p>}
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
                                onChange={handleMessageTextChanged}
                                maxLength={280}
                                rows={5}
                                placeholder="You can tag users using @."
                            />
                            <HelperText>
                                You have {280 - message.length} Characters
                                Remaining
                            </HelperText>
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
