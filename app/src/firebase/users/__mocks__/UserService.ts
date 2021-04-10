import { UserProfile } from "../../../types/UserProfile";

export async function signIn() {
    return;
}

export async function signOut() {
    return;
}

export function getCurrentUserName(): string {
    return "Henry";
}

export function getCurrentUserUid(): string {
    return "hHEvr6rQ8cXyyUU1beE7NdrLHf43";
}

export function onAuthStateChanged(cb: (p: UserProfile) => void) {
    const mockProfile = { isAdmin: true };
    cb(mockProfile);
}
