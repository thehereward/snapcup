import { Cup, Entity } from "../../types";
import firebase from "firebase/app";

export async function createNewCup(cup: Cup) {
    await firebase.firestore().collection("cups").add(cup);
}

function docToCupEntity(
    doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Entity<Cup> {
    const {
        isPublished,
        isOpen,
        timeCreated,
        name,
        timePublished,
    } = doc.data();
    return {
        isPublished: isPublished,
        isOpen: isOpen,
        timeCreated: timeCreated,
        name: name,
        timePublished: timePublished,
        id: doc.id,
    };
}

export function streamAllCups(
    onSnapsReceived: (cups: Entity<Cup>[]) => void,
    onError: (error: Error) => void
): () => void {
    return firebase
        .firestore()
        .collection("cups")
        .orderBy("timeCreated", "desc")
        .onSnapshot({
            next: (querySnapshot) => {
                onSnapsReceived(querySnapshot.docs.map(docToCupEntity));
            },
            error: (error) => {
                onError(error);
            },
        });
}

export function setCupOpenness(cupId, openness): Promise<void> {
    return firebase
        .firestore()
        .collection("cups")
        .doc(cupId)
        .update({ isOpen: openness });
}

export function setCupPublished(cupId: string): Promise<void> {
    const t = new Date();
    return firebase
        .firestore()
        .collection("cups")
        .doc(cupId)
        .update({ isPublished: true, isOpen: false, timePublished: t });
}

export async function deleteCup(cupId: string): Promise<void> {
    try {
        await firebase.firestore().collection("cups").doc(cupId).delete();
    } catch (error) {
        throw Error("Error deleting snap " + error.message);
    }
}
