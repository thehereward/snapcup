import React from "react";
import { useState, useEffect } from "react";
import Snap from "../../firebase/snap/Snap";
import SubmitSnap from "../../firebase/snap/SubmitSnap";
import { MentionsInput, Mention } from "react-mentions";
import MentionElements from "../../types/MentionElements";

const SubmissionTextBox: React.FunctionComponent = (props) => {
  /* Containing body of the snap */
  const [message, setMessage] = useState<string>("");
  const [confirmation, setConfirmation] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");
  const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(props);
    const ids: string[] = [];
    for (let elem of snappedUsers) {
      ids.push(elem.id);
    }
    const resultingSnap: Snap = {
      to: ids,
      from: props.user,// firebase.auth().currentUser.uid,
      body: message,
      timestamp: new Date(),
    };
    const res = SubmitSnap(resultingSnap, setError, setConfirmation).then(
      () => {
        setMessage("");
      }
    );
    setSnappedUsers([]);
  }

  /* Updates the value in the webhook "message" */
  function handleChange(event, newValue, newPlainTextValue, mentions) {
    setMessage(event.target.value);
    setConfirmation(false);
    setError("");
    setSnappedUsers(mentions);
  }

  /* Returns the length of the metadata characters */
  function getExtraLength() {
    let total = 280;
    for (var elem of snappedUsers) {
      total = total + elem.id.length + 4;
    }
    return total;
  }

  return (
    <div className="SubmissionTextBox">
      <form onSubmit={handleSubmit}>
        <h1>Submit Snap</h1>
        <MentionsInput
          style={{ "zIndex": 1 }}
          value={message}
          onChange={handleChange}
          maxLength={getExtraLength()}
        >
          <Mention style={{ "backgroundColor": "#daf4fa", "zIndex": 0 }} trigger="@" data={props.snappables} />
        </MentionsInput>
        <input type="submit" value="Submit" />
      </form>
      <p>
        There are {getExtraLength() - message.length} characters
                remaining
            </p>
      {confirmation && <p>Snap submitted!</p>}
      {error != "" && <p>{error}</p>}
    </div>
  );
};

export default SubmissionTextBox;
