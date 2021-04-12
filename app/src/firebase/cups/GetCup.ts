import firebase from "firebase/app";
import Snap from "../../types/Snap";

/* Gets a list of Snaps */
export default async function getSnapsFromCupID(
    cupID: string
): Promise<Snap[]> {
    const querySnapshot = await firebase
        .firestore()
        .collection(`cups/${cupID}/snaps`)
        .get();
    console.log(querySnapshot);
    const result = querySnapshot.docs.map((doc) => {
        console.log(doc.data());
        const { body, from, to, timestamp } = doc.data();
        return { body, from, to, timestamp };
    });
    return result;
}
