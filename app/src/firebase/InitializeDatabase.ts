import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_MEASUREMENT_ID,
};

export function initializeDatabase() {
    firebase.initializeApp(firebaseConfig);
    if (process.env.REACT_APP_EMULATE_FIREBASE) {
        firebase.firestore().useEmulator("localhost", 8080);
        firebase.auth().useEmulator("http://localhost:9099");
        firebase.functions().useEmulator("localhost", 5001);
    }
}
