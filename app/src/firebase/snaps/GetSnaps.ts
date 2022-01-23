import {
    collection,
    getFirestore,
    getDocsFromServer,
} from "firebase/firestore";
import { Snap } from "../../types";

/* Gets a list of Snaps */
export default async function getSnaps(cupId: string): Promise<Snap[]> {
    const db = getFirestore();
    const collectionRef = collection(db, "cups", cupId, "snaps");
    const querySnapshot = await getDocsFromServer(collectionRef);
    const result = querySnapshot.docs.map((doc) => {
        console.log(doc.data());
        const { body, from, to, timestamp } = doc.data();
        return { to, from, body, timestamp };
    });
    return result;
}
