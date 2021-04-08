import { UserProfile } from "../UserProfile";

export async function signIn() {
    return;
}

export async function signOut() {
    return;
}

export function getCurrentUserName(): String {
    return "Henry";
}

export function onAuthStateChanged(cb: (p: UserProfile) => void) {
    const mockProfile = { isAdmin: true, isSnapper: true };
    cb(mockProfile);
}
