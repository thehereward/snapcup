import firebase from "firebase/app";
import "firebase/auth";

interface ProfileData {
    isAdmin: boolean,
    isSnappable: boolean,
    friendlyName: String
}

export async function getOrCreateUserProfile(): Promise<ProfileData> {
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error('Should be logged in by here!')
    }
    const email = user.email;
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(email);
    const doc = await docRef.get();
    let profileData: ProfileData;
    if (doc.exists && doc.data() != null) {
        profileData = doc.data() as ProfileData;
    } else {
        const defaultFriendlyName = email.split("@")[0];
        profileData = {
            isAdmin: false,
            isSnappable: true,
            friendlyName: defaultFriendlyName
        }
        db.collection("users").doc(email).set(profileData)
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
