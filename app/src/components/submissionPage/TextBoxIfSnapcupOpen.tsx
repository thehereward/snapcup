import React from "react";
import MentionElements from "../../types/MentionElements";
import SubmissionTextBox from "./SubmissionTextBox";
import { getCurrentUserName } from "../../firebase/users/UserService";
import SubmissionBoxWrapper from "./SubmissionBoxWrapper";

const MessageInBox = ({ message }) => (
    <SubmissionBoxWrapper>
        <div className="col text-light">
            <h3>{message}</h3>
        </div>
    </SubmissionBoxWrapper>
);

const TextBoxIfSnapcupOpen = ({ cup, snappables, status }) => {
    if (cup?.isOpen) {
        return (
            <SubmissionTextBox
                cup={cup}
                snappables={snappables}
                user={getCurrentUserName()}
            />
        );
    } else if (cup) {
        return (
            <MessageInBox message="Apologies, the SnapCup is closed for new submissions." />
        );
    } else if (status) {
        return <MessageInBox message={status} />;
    } else {
        return (
            <MessageInBox message="Apologies, there is no open SnapCup at the moment." />
        );
    }
};

export default TextBoxIfSnapcupOpen;
