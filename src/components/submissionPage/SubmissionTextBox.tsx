import React from 'react';
import { useState, useEffect } from 'react';
import Snap from '../../firebase/snap/Snap';
import firebase from 'firebase/app'
import SubmitSnap from '../../firebase/snap/SubmitSnap';
import { MentionsInput, Mention } from 'react-mentions';
import GetSnappables from '../../firebase/users/GetSnappables';
import MentionElements from '../../types/MentionElements';


const SubmissionTextBox: React.FunctionComponent = () => {
  /* Containing body of the snap */
  const [message, setMessage] = useState<string>("");
  const [confirmation, setConfirmation] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");
  const [snappedUsers, setSnappedUsers] = useState<MentionElements[]>([]);
  const [snappableUsers, setSnappableUsers] = useState<MentionElements[]>([]);

  useEffect(() => {
    const res = GetSnappables().then((res) => { setSnappableUsers(res) }).catch((err) => console.log("Unable to fetch snappable users."));
  }, [])

  function handleSubmit(event) {
    //TODO: Get auth().userID
    event.preventDefault();
    const resultingSnap: Snap = {
      to: [""],
      from: firebase.auth().currentUser.uid,
      body: message,
      timestamp: new Date()
    };
    const res = SubmitSnap(resultingSnap, setError, setConfirmation).then(
      () => {
        setMessage("");
      }
    );
  }

  /* Updates the value in the webhook "message" */
  function handleChange(event) {
    setMessage(event.target.value)
    setConfirmation(false)
    setError("")
  }


  function handleAddMention(id: string, display: string) {
    setSnappedUsers(snappedUsers.push({ id: id, display: display }))
  }

  /* Returns the length of the metadata characters */
  /*
  function getExtraLength() {
    let total = 280;
    snappedUsers.forEach(function (elem) {
      total += (elem.length() + 4)
    })
    return total
  }
  */

  return (
    <div className="SubmissionTextBox">
      <form onSubmit={handleSubmit}>
        <h1>
          Submit Snap
          </h1>
        <MentionsInput value={message} onChange={handleChange} maxLength={280}>
          <Mention
            trigger="@"
            data={snappableUsers}
          />
        </MentionsInput>
        <input type="submit" value="Submit" />
      </form>
      <p>There are {280 - message.length} characters remaining</p>
      {confirmation && <p>Snap submitted!</p>}
      {error != "" && <p>{error}</p>}
    </div>
  );
}

export default SubmissionTextBox;
