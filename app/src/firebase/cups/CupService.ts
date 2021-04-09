import Cup from "../../types/Cup";
import firebase from "firebase/app";

export async function createNewCup(cup: Cup) {
    await firebase.firestore().collection("cups").add(cup);
}

export async function getExistsUnpublished() {
    const querySnapshot = await firebase
        .firestore()
        .collection("cups")
        .get({ source: "server" });
    const result = querySnapshot.docs.map((doc) => {
        const { isPublished, isOpen, timeCreated, name } = doc.data();
        return isPublished;
    });
    return result.includes(false);
}

export async function GetCupNames(): Promise<String[]> {
    const querySnapshot = await firebase
        .firestore()
        .collection("cups")
        .get({ source: "server" });
    const result = querySnapshot.docs.map((doc) => {
        const { isPublished, isOpen, timeCreated, name } = doc.data();
        return name;
    });
    return result;
}
