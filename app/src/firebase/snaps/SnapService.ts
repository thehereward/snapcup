import Snap from "../../types/Snap";
import { Entity } from "../../types/Entity";
import firebase from "firebase/app";
import { getCurrentUserUid } from "../users/UserService";

export async function submitSnap(snap: Snap) {
    await firebase.firestore().collection("snaps").add(snap);
}

export async function deleteSnap(snap: Entity<Snap>) {
    assertHasId(snap);
    try {
        await firebase.firestore().collection("snaps").doc(snap.id).delete();
    } catch (error) {
        throw Error("Error deleting snap " + error.message);
    }
}

function assertHasId(snap: Entity<Snap>) {
    if (!snap.id) {
        throw Error("Cannot delete snap - snap has no id");
    }
}

function docToSnap(
    docSnapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Entity<Snap> {
    const data = docSnapshot.data();
    const id = docSnapshot.id;
    return {
        body: data.body,
        timestamp: data.timestamp.toDate(),
        to: data.to,
        from: data.from,
        id: id,
    };
}

// returns an unsubscribe function
export function streamSubmittedSnapsForCurrentUser(
    onSnapsReceived: (snaps: Entity<Snap>[]) => void,
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
                const updatedSnaps = querySnapshot.docs.map(docToSnap);
                onSnapsReceived(updatedSnaps);
            },
            error: (error) => {
                onError(error);
            },
        });
}

export function streamNumberOfSnapsForSnappable(
    onNumberReceived: (numSnaps: number) => void,
    onError: (error: Error) => void,
    snappableId: String
): () => void {
    return firebase
        .firestore()
        .collection("snaps")
        .where("to", "array-contains", snappableId)
        .onSnapshot({
            next: (querySnapshot) => {
                onNumberReceived(querySnapshot.docs.length);
            },
            error: (error) => {
                onError(error);
            },
        });
}
