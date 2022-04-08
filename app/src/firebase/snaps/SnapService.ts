import { Snap, Entity } from "../../types";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getFirestore,
    QueryDocumentSnapshot,
    query,
    orderBy,
    where,
    onSnapshot,
} from "firebase/firestore";
import { getCurrentUserUid } from "../users/UserService";

function getSnapsCollectionFromCupId(cupId: string) {
    const db = getFirestore();
    return collection(db, "cups", cupId, "snaps");
}

export function submitSnap(snap: Snap, cupId: string) {
    const snaps = getSnapsCollectionFromCupId(cupId);
    return addDoc(snaps, snap);
}

export async function deleteSnap(snap: Entity<Snap>, cupId: string) {
    assertHasId(snap);
    try {
        const snaps = getSnapsCollectionFromCupId(cupId);
        deleteDoc(doc(snaps, snap.id));
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
    docSnapshot: QueryDocumentSnapshot<DocumentData>
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

export function streamSubmittedSnapsForCurrentUser(
    onSnapsReceived: (snaps: Entity<Snap>[]) => void,
    onError: (error: Error) => void,
    cupId: string
): () => void {
    const currentUserUid = getCurrentUserUid();
    const snaps = getSnapsCollectionFromCupId(cupId);
    const q = query(
        snaps,
        where("from", "==", currentUserUid),
        orderBy("timestamp", "desc")
    );
    try {
        return onSnapshot(q, (querySnapshot) => {
            const updatedSnaps = querySnapshot.docs.map(docToSnap);
            onSnapsReceived(updatedSnaps);
        });
    } catch (error) {
        onError(error);
    }
}

export function streamAllSnapsInCup(
    onSnapsReceived: (snaps: Entity<Snap>[]) => void,
    onError: (error: Error) => void,
    cupId: string
): () => void {
    const currentUserUid = getCurrentUserUid();
    const snaps = getSnapsCollectionFromCupId(cupId);
    const q = query(snaps, orderBy("timestamp", "desc"));
    try {
        return onSnapshot(q, (querySnapshot) => {
            const updatedSnaps = querySnapshot.docs.map(docToSnap);
            onSnapsReceived(updatedSnaps);
        });
    } catch (error) {
        onError(error);
    }
}
