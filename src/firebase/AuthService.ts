import firebase from "firebase/app";
import "firebase/auth";

export interface ProfileData {
    isAdmin: boolean;
    isSnapper: boolean;
}

async function getCurrentUserProfile(
    user: firebase.User
): Promise<ProfileData | null> {
    const docRef = firebase.firestore().collection("users").doc(user.uid);
    const doc = await docRef.get();
    if (doc.exists && doc.data()) {
        return doc.data() as ProfileData;
    } else {
        return null;
    }
}

function createUserProfile(user: firebase.User): ProfileData {
    const profileData = {
        isAdmin: false,
        isSnapper: true,
    };
    firebase.firestore().collection("users").doc(user.uid).set(profileData);
    return profileData;
}

async function getOrCreateUserProfile(
    user: firebase.User
): Promise<ProfileData> {
    const currentProfile = await getCurrentUserProfile(user);
    return currentProfile ?? createUserProfile(user);
}

export async function signIn() {
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

export function getCurrentUserName(): String {
    return firebase.auth().currentUser.displayName;
}

export function onAuthStateChanged(cb: (p: ProfileData) => void) {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            const profile = await getOrCreateUserProfile(user);
            cb(profile);
        }
    });
}
