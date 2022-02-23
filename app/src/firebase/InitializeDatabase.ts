import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
    // exception is thrown if api key is undefined even if using emulator
    apiKey: process.env.REACT_APP_API_KEY || "dummy-api-key",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_MEASUREMENT_ID,
};

export function initializeDatabase() {
    const firebaseApp = initializeApp(firebaseConfig);
    if (process.env.REACT_APP_EMULATE_FIREBASE) {
        console.log("EMULATING FIREBASE");
        const db = getFirestore();
        connectFirestoreEmulator(db, "localhost", 8080);
        const auth = getAuth();
        connectAuthEmulator(auth, "http://localhost:9099");
        const functions = getFunctions(firebaseApp);
        connectFunctionsEmulator(functions, "localhost", 5001);
    }
}
