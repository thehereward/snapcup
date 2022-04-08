import { collection, getFirestore, doc, writeBatch } from "firebase/firestore";
import { Snappable } from "../../types";

export function updateSnappablePeople(
    cupId: string,
    snappablePeople: Snappable[]
): Snappable[] {
    const db = getFirestore();
    const collectionRef = collection(db, "cups", cupId, "snappablePeople");
    const newSnappables = snappablePeople.map((s) => ({ ...s })); // shallow copy

    const batch = writeBatch(db);
    snappablePeople.forEach((snappable, idx) => {
        const content = {
            // should not contain the id
            email: snappable.email,
            fullName: snappable.fullName,
            username: snappable.username,
        };
        if (snappable.id) {
            const existingDoc = doc(collectionRef, snappable.id);
            batch.update(existingDoc, content);
        } else {
            const newDoc = doc(collectionRef);
            newSnappables[idx].id = newDoc.id;
            batch.set(newDoc, content); // will create new
        }
    });

    // performs writes in background
    batch.commit().catch((err) => {
        alert("Error updating snappables");
        console.error(err);
    });
    return newSnappables;
}
