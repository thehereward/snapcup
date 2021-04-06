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

    async signIn(successCb: () => void, errorCb: (err: string) => void) {
        try {
            await firebase.auth().signInWithPopup(this.provider);
            // If we get to here the sign up has been successful.
            successCb();
        } catch (e) {
            console.error("sign in error");
            console.error(e);
            errorCb("There was an error signing in!");
        }
    }
}

export default AuthService;
