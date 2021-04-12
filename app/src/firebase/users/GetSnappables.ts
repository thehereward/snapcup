import firebase from "firebase/app";
import Snappable from "../../types/Snappable";

function docToSnappable(
    docSnapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Snappable {
    const { email, fullName, username } = docSnapshot.data();
    return { id: docSnapshot.id, email, fullName, username };
}

/* Gets a list of Nicknames that are unique */
export default async function getSnappables(): Promise<Snappable[]> {
    const querySnapshot = await firebase
        .firestore()
        .collection("snappables")
        .get({ source: "server" });
    const result = querySnapshot.docs.map(docToSnappable);
    return result;
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
