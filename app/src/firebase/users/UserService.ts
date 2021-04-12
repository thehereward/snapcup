import firebase from "firebase/app";
import "firebase/auth";
import { UserProfile } from "../../types/UserProfile";
import { Entity } from "../../types/Entity";

async function getCurrentUserProfile(
    user: firebase.User
): Promise<UserProfile | null> {
    const docRef = firebase.firestore().collection("users").doc(user.uid);
    const doc = await docRef.get();
    if (doc.exists && doc.data()) {
        return doc.data() as UserProfile;
    } else {
        return null;
    }
}

function createUserProfile(user: firebase.User): UserProfile {
    const profileData = {
        isAdmin: false,
        email: user.email,
        displayName: user.displayName,
    };
    firebase.firestore().collection("users").doc(user.uid).set(profileData);
    return profileData;
}

async function getOrCreateUserProfile(
    user: firebase.User
): Promise<UserProfile> {
    try {
        return await getCurrentUserProfile(user); // Will throw error if it can't find
    } catch {
        return createUserProfile(user);
    }
}

export async function signIn() {
    if (process.env.REACT_APP_EMULATE_FIREBASE) {
        await firebase
            .auth()
            .signInWithEmailAndPassword("test@test.com", "testtest");
        return;
    }
    const provider = new firebase.auth.OAuthProvider("microsoft.com");
    provider.setCustomParameters({
        prompt: process.env.REACT_APP_PROMPT,
        // Only users from a particular Azure AD tenant to sign into the application
        tenant: process.env.REACT_APP_TENANT,
    });
    await firebase.auth().signInWithPopup(provider);
}

export async function signOut() {
    firebase.auth().signOut();
}

export function getCurrentUserName(): string {
    return firebase.auth().currentUser.displayName;
}

export function getCurrentUserUid(): string {
    return firebase.auth().currentUser.uid;
}

export function onAuthStateChanged(cb: (p: UserProfile) => void) {
    firebase.auth().onAuthStateChanged(async (user) => {
        console.log("onauthchanged", user);
        if (user) {
            const profile = await getOrCreateUserProfile(user);
            cb(profile);
        }
    });
}

function docToUserProfile(
    docSnapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Entity<UserProfile> {
    const data = docSnapshot.data();
    const id = docSnapshot.id;
    return {
        email: data.email,
        displayName: data.displayName,
        isAdmin: data.isAdmin,
        id: id,
    };
}

export function streamAllUserProfiles(
    onSnapsReceived: (snaps: Entity<UserProfile>[]) => void,
    onError: (error: Error) => void
): () => void {
    const collectionRef = firebase.firestore().collection("users");
    return collectionRef.onSnapshot({
        next: (querySnapshot) => {
            const updatedSnaps = querySnapshot.docs.map(docToUserProfile);
            onSnapsReceived(updatedSnaps);
        },
        error: (error) => {
            onError(error);
        },
    });
}

export async function updateAdmin(userId: string, isAdmin: boolean) {
    const docRef = firebase.firestore().collection("users").doc(userId);
    docRef.update({ isAdmin: isAdmin });
}
