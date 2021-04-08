import React from "react";
import { useState } from "react";
import { getCurrentUserUid } from "../../firebase/users/UserService";
import Snap from "../../firebase/snaps/Snap";
import { submitSnap } from "../../firebase/snaps/SnapService";

const SubmissionTextBox: React.FunctionComponent = () => {
    const [message, setMessage] = useState<string>("");
    const [confirmation, setConfirmation] = useState<Boolean>(false);
    const [error, setError] = useState<string>("");

    function handleSubmit(event) {
        const uid = getCurrentUserUid();
        event.preventDefault();
        const resultingSnap: Snap = {
            to: [],
            from: uid,
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

    return (
        <div className="SubmissionTextBox">
            <form onSubmit={handleSubmit}>
                <h1>Submit Snap</h1>
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
    );
};

export default SubmissionTextBox;
