import {
    collection,
    getFirestore,
    addDoc,
    updateDoc,
    doc,
    writeBatch,
} from "firebase/firestore";
import { Snappable } from "../../types";

export async function writeAllSnappablePeople(
    cupId: string,
    snappablePeople: Snappable[]
): Promise<Snappable[]> {
    const db = getFirestore();
    const collectionRef = collection(db, "cups", cupId, "snappablePeople");
    const promises = [];
    const newSnappables = snappablePeople.map((s) => ({ ...s })); // shallow copy

    snappablePeople.forEach((snappable, idx) => {
        const content = {
            // should not contain the id
            email: snappable.email,
            fullName: snappable.fullName,
            username: snappable.username,
        };
        if (snappable.id) {
            const existingDoc = doc(collectionRef, snappable.id);
            promises.push(updateDoc(existingDoc, content));
        } else {
            promises.push(
                addDoc(collectionRef, content).then(
                    (ref) => (newSnappables[idx].id = ref.id)
                )
            );
        }
    });

    await Promise.all(promises);
    return newSnappables;
}
