import firebase from 'firebase/app';
import 'firebase/auth';

class AuthService {
    provider: firebase.auth.OAuthProvider;
    accessToken: string | undefined;
    idToken: string | undefined;

    constructor() {
        this.provider = new firebase.auth.OAuthProvider('microsoft.com');
        this.provider.setCustomParameters({
            prompt: 'select_account',
            // Only users from a particular Azure AD tenant to sign into the application
            tenant: 'Softwire.onmicrosoft.com'
        });
    }

    async signIn() {
        try {
            const result = await firebase.auth().signInWithPopup(this.provider);
            const credential: firebase.auth.OAuthCredential = result.credential;
            this.accessToken = credential.accessToken;
            this.idToken = credential.idToken;
        } catch(e) {
            // TODO: Handle error
            console.log('sign in error')
            console.error(e);
        }
    }
}

export default AuthService;