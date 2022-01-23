import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    OAuthProvider,
    onIdTokenChanged,
    User,
} from "firebase/auth";
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    getFirestore,
    onSnapshot,
    QueryDocumentSnapshot,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { Entity, UserProfile } from "../../types";

async function getCurrentUserProfile(user: User): Promise<UserProfile | null> {
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists && docSnap.data()) {
        return docSnap.data() as UserProfile;
    } else {
        return null;
    }
}

function createUserProfile(user: User): UserProfile {
    const profileData = {
        isAdmin: false,
        email: user.email,
        displayName: user.displayName,
    };
    const db = getFirestore();
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, profileData);
    return profileData;
}

async function getOrCreateUserProfile(user: User): Promise<UserProfile> {
    const userProfile = await getCurrentUserProfile(user);
    if (userProfile) {
        return userProfile;
    } else {
        return createUserProfile(user);
    }
}

export async function signIn() {
    const auth = getAuth();
    if (process.env.REACT_APP_EMULATE_FIREBASE) {
        await signInWithEmailAndPassword(auth, "test@test.com", "testtest");
        return;
    }
    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({
        prompt: process.env.REACT_APP_PROMPT,
        // Only users from a particular Azure AD tenant to sign into the application
        tenant: process.env.REACT_APP_TENANT,
    });
    await signInWithPopup(auth, provider);
}

export async function signOut() {
    const auth = getAuth();
    auth.signOut();
}

export function getCurrentUserName(): string {
    const auth = getAuth();
    return auth.currentUser.displayName;
}

export function getCurrentEmail(): string {
    const auth = getAuth();
    return auth.currentUser.email;
}

export function getCurrentUserUid(): string {
    const auth = getAuth();
    return auth.currentUser.uid;
}

export function onAuthStateChanged(cb: (p: UserProfile) => void) {
    const auth = getAuth();
    onIdTokenChanged(auth, async (user) => {
        if (user) {
            const profile = await getOrCreateUserProfile(user);
            cb(profile);
        }
    });
}

function docToUserProfile(
    docSnapshot: QueryDocumentSnapshot<DocumentData>
): Entity<UserProfile> {
    const data = docSnapshot.data();
    const id = docSnapshot.id;
    return {
        email: data.email,
        displayName: data.displayName,
        isAdmin: data.isAdmin,
        id: id,
    };
}

export function streamAllUserProfiles(
    onSnapsReceived: (snaps: Entity<UserProfile>[]) => void,
    onError: (error: Error) => void
) {
    const db = getFirestore();
    const collectionRef = collection(db, "users");

    return onSnapshot(collectionRef, {
        next: (querySnapshot) => {
            const allCups = querySnapshot.docs.map(docToUserProfile);
            onSnapsReceived(allCups);
        },
        error: (error) => {
            onError(error);
        },
    });
}

export async function updateAdmin(userId: string, isAdmin: boolean) {
    const db = getFirestore();
    const docRef = doc(db, "users", userId);
    updateDoc(docRef, { isAdmin: isAdmin });
}
