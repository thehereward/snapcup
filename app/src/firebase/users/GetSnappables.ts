import firebase from "firebase/app";
import Snappable from "../../types/Snappable";

/* Gets a list of Nicknames that are unique */
export default async function getSnappables(): Promise<Snappable[]> {
    const querySnapshot = await firebase
        .firestore()
        .collection("snappables")
        .get({ source: "server" });
    const result = querySnapshot.docs.map((doc) => {
        const { email, fullName, username } = doc.data();
        return { id: doc.id, email, fullName, username };
    });
    return result;
}
