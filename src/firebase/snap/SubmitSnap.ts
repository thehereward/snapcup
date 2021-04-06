import Snap from './Snap'
import firebase from 'firebase/app'
/* Submits a snap to the firebase collection*/
/* Submits a snap to the firebase collection*/

const SubmitSnap = (snap : Snap): boolean => {
    /*
    firebase.firestore().collection("snaps").doc("snap1").set(snap)
    .then(() => {
        return true;
    })
    .catch((error) => {
        return false;
    });
    8?
    /* restore database implementation */
    return true
}
export default SubmitSnap