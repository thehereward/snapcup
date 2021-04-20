import firebase from "firebase/app";
import { Snappable } from "../../types";

function docToSnappable(
    docSnapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Snappable {
    const { email, fullName, username } = docSnapshot.data();
    return { id: docSnapshot.id, email, fullName, username };
}

export function streamAllSnappablePeople(
    onPeopleReceived: (people: Snappable[]) => void,
    onError: (error: Error) => void
): () => void {
    const collectionRef = firebase.firestore().collection("snappables");
    return collectionRef.onSnapshot({
        next: (querySnapshot) => {
            const updated = querySnapshot.docs.map(docToSnappable);
            onPeopleReceived(updated);
        },
        error: (error) => {
            onError(error);
        },
    });
}
