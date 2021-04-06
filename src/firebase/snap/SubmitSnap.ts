import Snap from './Snap'
import firebase from 'firebase/app'
import { SetStateAction, Dispatch } from "react";

const SubmitSnap = async (
  snap: Snap,
  setError: Dispatch<SetStateAction<String>>,
  setConfirmation: Dispatch<SetStateAction<Boolean>>
) => {
  return new Promise(function (resolve, reject) {
    const result = firebase
      .firestore()
      .collection("snaps")
      .add(snap)
      .then(() => {
        setConfirmation(true);
        resolve(true);
      })
      .catch((e) => {
        console.log(e);
        setError(e.toString());
        setConfirmation(false);
        reject(false);
      });
  });
};

export default SubmitSnap;
