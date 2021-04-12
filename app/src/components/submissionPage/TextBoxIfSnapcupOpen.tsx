import React, { useState, useEffect } from "react";
import MentionElements from "../../types/MentionElements";
import SubmissionTextBox from "./SubmissionTextBox";
import { getCurrentUserName } from "../../firebase/users/UserService";
import { getCurrentCupIfExists } from "../../firebase/cups/CupService";
import { CupWithId } from "../../types/Cup";
import SubmissionBoxWrapper from "./SubmissionBoxWrapper";

const MessageInBox = ({ message }) => (
    <SubmissionBoxWrapper>
        <div className="col text-light">
            <h3>{message}</h3>
        </div>
    </SubmissionBoxWrapper>
);

const TextBoxIfSnapcupOpen = (props: { snappables: MentionElements[] }) => {
    const [status, setStatus] = useState<string>("Loading...");
    const [cup, setCup] = useState<CupWithId | undefined>(undefined);

    useEffect(() => {
        setStatus("Loading...");
        (async () => {
            try {
                setCup(await getCurrentCupIfExists());
                setStatus("");
            } catch (err) {
                console.error(err);
                setStatus("There was an unexpected error loading the snapcup.");
            }
        })();
    }, [setCup]);

    if (cup?.isOpen) {
        return (
            <SubmissionTextBox
                snappables={props.snappables}
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
