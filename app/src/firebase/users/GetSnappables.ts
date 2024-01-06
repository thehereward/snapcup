import {
    collection,
    DocumentData,
    getFirestore,
    QueryDocumentSnapshot,
    onSnapshot,
    getDocs,
    query,
} from "firebase/firestore";
import { Snappable } from "../../types";

function docToSnappable(
    docSnapshot: QueryDocumentSnapshot<DocumentData>
): Snappable {
    const { email, fullName, username } = docSnapshot.data();
    return { id: docSnapshot.id, email, fullName, username };
}

export function streamAllSnappablePeople(
    onPeopleReceived: (people: Snappable[]) => void,
    onError: (error: Error) => void,
    cupId: string
): () => void {
    const db = getFirestore();
    const collectionRef = collection(db, "cups", cupId, "snappablePeople");

    return onSnapshot(collectionRef, {
        next: (querySnapshot) => {
            const updated = querySnapshot.docs.map(docToSnappable);
            onPeopleReceived(updated);
        },
        error: (error) => {
            onError(error);
        },
    });
}

export async function getAllSnappablePeopleOnce(
    cupId: string
): Promise<Snappable[]> {
    const db = getFirestore();
    const collectionRef = collection(db, "cups", cupId, "snappablePeople");
    const querySnapshot = await getDocs(query(collectionRef));
    return querySnapshot.docs.map(docToSnappable);
}
