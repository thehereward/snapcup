import Snap from "./Snap";
import firebase from "firebase/app";
import "firebase/auth";

export async function submitSnap(snap: Snap) {
    await firebase.firestore().collection("snaps").add(snap);
}

function docToSnap(data: any) {
    return {
        body: data.body,
        timestamp: data.timestamp.toDate(),
        to: data.to,
        from: data.from,
    };
}

async function getSubmittedSnaps(user: firebase.User): Promise<Snap[]> {
    try {
        const userSnaps = await firebase
            .firestore()
            .collection("snaps")
            .where("from", "==", user.uid.toString())
            .orderBy("timestamp", "desc")
            .get();
        return userSnaps.docs.map((doc) => docToSnap(doc.data()));
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getSubmittedSnapsForCurrentUser(): Promise<Snap[]> {
    const currentUser = firebase.auth().currentUser;
    const snaps = await getSubmittedSnaps(currentUser);
    return snaps;
}
