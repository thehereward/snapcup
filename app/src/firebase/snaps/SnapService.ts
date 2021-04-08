import Snap from "./Snap";
import firebase from "firebase/app";
import "firebase/auth";

export async function submitSnap(snap: Snap) {
    await firebase.firestore().collection("snaps").add(snap);
}

async function getSubmittedSnaps(user: firebase.User): Promise<Snap[]> {
    // .orderBy("timestamp", "desc")
    const userSnaps = await firebase
        .firestore()
        .collection("snaps")
        .where("from", "==", user.uid.toString())
        .get();
    return userSnaps.docs.map((d) => d.data() as Snap);
}

export async function getSubmittedSnapsForCurrentUser(): Promise<Snap[]> {
    const currentUser = firebase.auth().currentUser;
    const snaps = await getSubmittedSnaps(currentUser);
    return snaps;
}
