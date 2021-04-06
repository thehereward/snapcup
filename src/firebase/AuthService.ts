import firebase from "firebase/app";
import "firebase/auth";

interface ProfileData {
    isAdmin: boolean;
    isSnapper: boolean;
}

function assertUserIsLoggedIn() {
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("Should be logged in by here!");
    }
}

async function getCurrentUserProfile(): Promise<ProfileData | null> {
    const docRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
    const doc = await docRef.get();
    if (doc.exists && doc.data()) {
        return doc.data() as ProfileData;
    } else {
        return null;
    }
}

function createUserProfile(): ProfileData {
    const profileData = {
        isAdmin: false,
        isSnapper: true,
    };
    firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set(profileData);
    return profileData;
}

export async function getOrCreateUserProfile(): Promise<ProfileData> {
    assertUserIsLoggedIn();
    const currentProfile = await getCurrentUserProfile();
    return currentProfile ?? createUserProfile();
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
