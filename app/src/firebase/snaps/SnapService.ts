import Snap from "../../types/Snap";
import firebase from "firebase/app";
import { getCurrentUserUid } from "../users/UserService";

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

// returns an unsubscribe function
export function streamSubmittedSnapsForCurrentUser(
    onSnapsRecieved: (snaps: Snap[]) => void,
    onError: (error: Error) => void
): () => void {
    const currentUserUid = getCurrentUserUid();
    return firebase
        .firestore()
        .collection("snaps")
        .where("from", "==", currentUserUid)
        .orderBy("timestamp", "desc")
        .onSnapshot({
            next: (querySnapshot) => {
                const updatedSnaps = querySnapshot.docs.map((docSnapshot) =>
                    docToSnap(docSnapshot.data())
                );
                onSnapsRecieved(updatedSnaps);
            },
            error: (error) => {
                onError(error);
            },
        });
}
