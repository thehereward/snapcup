import firebase from "firebase/app";
import "firebase/auth";

interface ProfileData {
    isAdmin: boolean;
    isSnapper: boolean;
}

export async function getOrCreateUserProfile(): Promise<any> {
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("Should be logged in by here!");
    }
    const uid = user.uid;
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);
    const doc = await docRef.get();
    let profileData: ProfileData;
    if (doc.exists && doc.data() != null) {
        profileData = doc.data() as ProfileData;
    } else {
        profileData = {
            isAdmin: false,
            isSnapper: true,
        };
        db.collection("users").doc(uid).set(profileData);
    }
    return profileData;
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
