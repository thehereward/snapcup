import React = require("react");
import { useState, useEffect } from 'react';
import Snap from '../../firebase/snap/Snap';
import SubmitSnap from '../../firebase/snap/SubmitSnap';


const SubmissionTextBox:React.FunctionComponent = () => {
  /* Containing body of the snap */
  const [message, setMessage] = useState<string>("");
  const [charactersLeft, setCharactersLeft] = useState<Number>(280);
  const [confirmation, setConfirmation] = useState<Boolean>(false);
  const [error,setError] = useState<string>("");
  
  function handleSubmit(event){
    //TODO: Get auth().userID
    event.preventDefault();
    const resultingSnap : Snap = {
      to : [""], 
      from: "", 
      body: message, 
      timestamp: new Date()
    };
    const res = SubmitSnap(resultingSnap, setError, setConfirmation).then(
      () => {
        setMessage("");
        setCharactersLeft(280);
      }
    );
  }

  /* Updates the value in the webhook "message" */
  function handleChange(event){
    setMessage(event.target.value)
    setCharactersLeft(280 - event.target.value.length)
    setConfirmation(false)
    setError("")
  }

  return (
    <div className="SubmissionTextBox">
        <form onSubmit={handleSubmit}>
            <h1>
                Submit Snap
            </h1>
            <textarea value={message} onChange={handleChange} maxLength={280}/>
            <input type="submit" value="Submit" />
        </form>
        <p>There are {charactersLeft} characters remaining</p>
        {confirmation && <p>Snap submitted!</p>}
        {error != "" && <p>{error}</p>}
    </div>
  );
}

export default SubmissionTextBox;
