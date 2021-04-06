import firebase from "firebase/app";
import "firebase/auth";

class AuthService {
    provider: firebase.auth.OAuthProvider;
    accessToken: string | undefined;
    idToken: string | undefined;

    constructor() {
        this.provider = new firebase.auth.OAuthProvider("microsoft.com");
        this.provider.setCustomParameters({
            prompt: process.env.REACT_APP_PROMPT,
            // Only users from a particular Azure AD tenant to sign into the application
            tenant: process.env.REACT_APP_TENANT,
        });
    }

    private async createUserProfileIfRequired() {
        const user = firebase.auth().currentUser;
        if (user) {
            const id = user.uid;
            const db = firebase.firestore();
            const docRef = db.collection("users").doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                db.collection("users").doc(id).set({
                    isAdmin: false,
                    isSnappable: true
                })
            }
        }
    }

    async signIn(successCb: () => void, errorCb: (err: string) => void) {
        try {
            await firebase.auth().signInWithPopup(this.provider);
            this.createUserProfileIfRequired();
            // If we get to here the sign up has been successful
            successCb();
        } catch(e) {
            console.error(e);
            errorCb("There was an error signing in!");
        }
    }
}

export default AuthService;
