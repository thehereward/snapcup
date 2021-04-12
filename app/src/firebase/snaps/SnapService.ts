import Snap from "../../types/Snap";
import { Entity } from "../../types/Entity";
import firebase from "firebase/app";
import { getCurrentUserUid } from "../users/UserService";

function getSnapsCollectionFromCupId(cupId: string) {
    return firebase
        .firestore()
        .collection("cups")
        .doc(cupId)
        .collection("snaps");
}

export async function submitSnap(snap: Snap, cupId: string) {
    console.log(JSON.stringify(firebase.auth().currentUser));
    console.log(cupId);
    await getSnapsCollectionFromCupId(cupId).add(snap);
}

export async function deleteSnap(snap: Entity<Snap>, cupId: string) {
    assertHasId(snap);
    try {
        await getSnapsCollectionFromCupId(cupId).doc(snap.id).delete();
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
    onError: (error: Error) => void,
    cupId: string
): () => void {
    const currentUserUid = getCurrentUserUid();
    return getSnapsCollectionFromCupId(cupId)
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
