import firebase from "firebase/app";
import "firebase/auth";
import { UserProfile } from "../../types/UserProfile";

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
    };
    firebase.firestore().collection("users").doc(user.uid).set(profileData);
    return profileData;
}

async function getOrCreateUserProfile(
    user: firebase.User
): Promise<UserProfile> {
    const currentProfile = await getCurrentUserProfile(user);
    return currentProfile ?? createUserProfile(user);
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
        if (user) {
            const profile = await getOrCreateUserProfile(user);
            cb(profile);
        }
    });
}
