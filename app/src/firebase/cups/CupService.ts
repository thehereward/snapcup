import { Cup, Entity } from "../../types";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocs,
    getFirestore,
    QueryDocumentSnapshot,
    updateDoc,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

export async function createNewCup(cup: Cup) {
    const db = getFirestore();
    await addDoc(collection(db, "cups"), cup);
}

function docToCupEntity(doc: QueryDocumentSnapshot<DocumentData>): Entity<Cup> {
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
) {
    const db = getFirestore();
    const cupsRef = collection(db, "cups");
    const q = query(cupsRef, orderBy("timeCreated", "desc"));

    return onSnapshot(q, {
        next: (querySnapshot) => {
            const allCups = querySnapshot.docs.map(docToCupEntity);
            onSnapsReceived(allCups);
        },
        error: (error) => {
            onError(error);
        },
    });
}

export function setCupOpenness(cupId, openness): Promise<void> {
    const db = getFirestore();
    const docRef = doc(db, "cups", cupId);
    return updateDoc(docRef, { isOpen: openness });
}

export function setCupPublished(cupId: string): Promise<void> {
    const t = new Date();
    const db = getFirestore();
    const docRef = doc(db, "cups", cupId);
    return updateDoc(docRef, {
        isPublished: true,
        isOpen: false,
        timePublished: t,
    });
}

export async function deleteCup(cupId: string): Promise<void> {
    try {
        const db = getFirestore();
        const docRef = doc(db, "cups", cupId);
        await deleteDoc(docRef);
    } catch (error) {
        throw Error("Error deleting snap " + error.message);
    }
}
