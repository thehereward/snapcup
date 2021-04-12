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
    return result.indexOf(false) >= 0;
}

export async function getCurrentCupIfExists(): Promise<Cup | undefined> {
    const querySnapshot = await firebase
        .firestore()
        .collection("cups")
        .get({ source: "server" });
    const publishedDocQuery = querySnapshot.docs.find((doc) => {
        return !doc.data().isPublished;
    });
    if (publishedDocQuery) {
        const publishedDoc = publishedDocQuery.data();
        publishedDoc.id = publishedDocQuery.id;
        return publishedDoc as Cup;
    }
    return undefined;
}

export async function GetCupNames(): Promise<string[]> {
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

export async function getCurrentCupName(): Promise<String> {
    const querySnapshot = await firebase
        .firestore()
        .collection("cups")
        .get({ source: "server" });
    const result = querySnapshot.docs.map((doc) => {
        const { isPublished, isOpen, timeCreated, name } = doc.data();
        if (!isPublished) {
            return name;
        } else {
            return undefined;
        }
    });
    return result.find((el) => el !== undefined);
}

export async function getCurrentCupId(): Promise<String> {
    const querySnapshot = await firebase
        .firestore()
        .collection("cups")
        .get({ source: "server" });
    const result = querySnapshot.docs.map((doc) => {
        const { isPublished, isOpen, timeCreated, name } = doc.data();
        if (!isPublished) {
            return doc.id;
        } else {
            return undefined;
        }
    });
    return result.find((el) => el !== undefined);
}

export function setCupOpenness(cupId, openness): Promise<void> {
    return firebase
        .firestore()
        .collection("cups")
        .doc(cupId)
        .update({ isOpen: openness });
}

export function setCupPublished(cupId: string): Promise<void> {
    return firebase
        .firestore()
        .collection("cups")
        .doc(cupId)
        .update({ isPublished: true });
}
