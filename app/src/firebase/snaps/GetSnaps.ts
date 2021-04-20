import firebase from "firebase/app";
import { Snap } from "../../types";

/* Gets a list of Snaps */
export default async function getSnaps(cupId): Promise<Snap[]> {
    const querySnapshot = await firebase
        .firestore()
        .collection(`cups/${cupId}/snaps`)
        .get({ source: "server" });
    const result = querySnapshot.docs.map((doc) => {
        console.log(doc.data());
        const { body, from, to, timestamp } = doc.data();
        return { to, from, body, timestamp };
    });
    return result;
}
