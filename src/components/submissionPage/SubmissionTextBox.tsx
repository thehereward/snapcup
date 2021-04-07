import React from "react";
import { useState, useEffect } from "react";
import Snap from "../../firebase/snap/Snap";
import SubmitSnap from "../../firebase/snap/SubmitSnap";
import { MentionsInput, Mention } from "react-mentions";
import MentionElements from "../../types/MentionElements";
import GetExtraLength from './GetExtraLength'
import CharactersLeftDisplay from './CharactersLeftDisplay'
import OnSubmitMessageDisplay from './OnSubmitMessageDisplay'
import SubmissionBoxErrorDisplay from './SubmissionBoxErrorDisplay'
import ValidateSnap from './ValidateSnap'

export interface Props {
  snappables: MentionElements[],
  user: String
}

const SubmissionTextBox: React.FunctionComponent = (props: Props) => {
  /* Containing body of the snap */
  const [message, setMessage] = useState<string>("");
  const [confirmation, setConfirmation] = useState<Boolean>(false);
  const [error, setError] = useState<String>("");
  const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(props);
    const ids: String[] = [];
    for (let elem of snappedUsers) {
      ids.push(elem.id);
    }
    const resultingSnap: Snap = {
      to: ids,
      from: props.user,
      body: message,
      timestamp: new Date(),
    };
    if (ValidateSnap(resultingSnap, snappedUsers)) {
      const res = SubmitSnap(resultingSnap, setError, setConfirmation).then(
        () => {
          setMessage("");
        }
      );
      setSnappedUsers([]);
    } else {
      setError("there was an error with the creation of the snap, log out and log in again.")
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
    <div className="SubmissionTextBox">
      <form onSubmit={handleSubmit}>
        <h1>Submit Snap</h1>
        <MentionsInput
          style={{ "zIndex": 1 }}
          value={message}
          onChange={handleChange}
          maxLength={GetExtraLength(snappedUsers)}
        >
          <Mention style={{ "backgroundColor": "#daf4fa", "zIndex": 0 }} trigger="@" data={props.snappables} />
        </MentionsInput>
        <input type="submit" value="Submit" />
      </form>
      <CharactersLeftDisplay snappedUsers={snappedUsers} message={message} />
      <OnSubmitMessageDisplay confirmation={confirmation} />
      <SubmissionBoxErrorDisplay error={error} />
    </div>
  );
};

export default SubmissionTextBox;
