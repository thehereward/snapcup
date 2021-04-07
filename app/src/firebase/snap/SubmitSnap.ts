import Snap from "./Snap";
import firebase from "firebase/app";

export default async function submitSnap(snap: Snap) {
    await firebase.firestore().collection("snaps").add(snap);
}
